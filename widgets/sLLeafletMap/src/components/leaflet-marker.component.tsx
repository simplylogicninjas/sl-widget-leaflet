import { Icon, DivIcon, LatLngExpression, LatLng } from "leaflet";
import React, { createElement, useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { IdentifierAction, LatLngAction } from "../../../../shared/types/map.interface";

const createMarkerIcon = (markerContainerElement?: HTMLDivElement, contentElementId?: string): Icon | DivIcon => {
    if (markerContainerElement && contentElementId) {
        const htmlMarker = markerContainerElement.querySelector(`.${contentElementId}`) as HTMLElement;

        const clientRect = htmlMarker?.getBoundingClientRect();
        const width = clientRect?.width ?? 0;
        const height = clientRect?.height ?? 0;

        return new DivIcon({
            iconSize: [width, height],
            iconAnchor: [width / 2, height / 2],
            html: htmlMarker ?? undefined
        });
    } else {
        return new Icon({
            iconUrl: "/widgets/sl/slleafletmap/assets/images/marker-icon.png",
            iconRetinaUrl: "/widgets/sl/slleafletmap/assets/images/marker-icon-2x.png",
            shadowUrl: "/widgets/sl/slleafletmap/assets/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12.5, 41]
        });
    }
};

const LeafletMarker = ({
    widgetId,
    id,
    position,
    draggable,
    content,
    popupContent,
    clickAction,
    dragAction
}: {
    position: LatLngExpression;
    widgetId: string;
    id: string;
    draggable: boolean;
    content?: React.ReactNode;
    popupContent?: React.ReactNode;
    clickAction?: IdentifierAction;
    dragAction?: LatLngAction;
}) => {
    const [showMarker, setShowMarker] = useState(false);
    const [contentElementId, setContentElementId] = useState<string>();
    const markerContainerRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<any>(null);
    const markerIconRef = useRef<Icon | DivIcon>();
    const eventHandlers = useMemo(
        () => ({
            click() {
                if (clickAction) {
                    clickAction(id);
                }
            },
            dragend() {
                if (dragAction && markerRef.current) {
                    const position = markerRef.current.getLatLng() as LatLng;
                    dragAction(position.lat.toString(), position.lng.toString(), id);
                }
            }
        }),
        []
    );

    const getMarkerIcon = (contentElementId?: string) => {
        if (!markerIconRef.current) {
            markerIconRef.current = createMarkerIcon(markerContainerRef.current!, contentElementId);
        }

        return markerIconRef.current;
    };

    useEffect(() => {
        if (!content) {
            setShowMarker(true);
        }
    }, [content]);

    return (
        <div ref={markerContainerRef}>
            {markerContainerRef.current && (
                <div>
                    {content && (
                        <div className={`${widgetId}-${id}`} style={{ display: "inline-block" }}>
                            <LeafletMarkerContent
                                content={content}
                                onRender={() => {
                                    setContentElementId(`${widgetId}-${id}`);
                                    setShowMarker(true);
                                }}
                            />
                        </div>
                    )}
                    {showMarker && (
                        <Marker
                            ref={markerRef}
                            eventHandlers={eventHandlers}
                            position={position}
                            icon={getMarkerIcon(contentElementId)}
                            draggable={draggable}
                        >
                            {popupContent && <Popup>{popupContent}</Popup>}
                        </Marker>
                    )}
                </div>
            )}
        </div>
    );
};

const LeafletMarkerContent = ({ content, onRender }: { content: any; onRender: () => void }) => {
    useEffect(() => {
        onRender();
    }, []);

    return <div>{content}</div>;
};

export default LeafletMarker;

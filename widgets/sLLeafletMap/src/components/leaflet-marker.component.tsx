import { Icon, DivIcon, LatLngExpression, LatLng } from "leaflet"
import React, { createElement, useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet"
import { IdentifierAction, LatLngAction } from "../../../../shared/types/map.interface";

const findMarkerElement = (markerId: string) => {
    return document.getElementById(markerId);
}

const createMarkerIcon = (contentElementId?: string): Icon | DivIcon => {
    if (contentElementId && findMarkerElement(contentElementId)) {
        const htmlMarker = findMarkerElement(contentElementId) as HTMLElement;

        const clientRect = htmlMarker?.getBoundingClientRect();
        const width = clientRect?.width ?? 0;
        const height = clientRect?.height ?? 0;

        return new DivIcon({
            iconSize: [width, height],
            iconAnchor: [width / 2, height / 2],
            html: htmlMarker ?? undefined
        })

    } else {
        return new Icon({
            iconUrl: '/widgets/sl/slleafletmap/assets/images/marker-icon.png',
            iconRetinaUrl: '/widgets/sl/slleafletmap/assets/images/marker-icon-2x.png',
            shadowUrl: '/widgets/sl/slleafletmap/assets/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12.5, 41]
        });
    }
}

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
    const markerRef = useRef<any>(null);
    const eventHandlers = useMemo(() => ({
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
    }), []);

    useEffect(() => {
        if (!content) {
            setShowMarker(true);
        }
    }, [content]);

    return (
        <div>
            {content && (
                <div id={`${widgetId}-${id}`} style={{display: 'inline-block'}}>
                    <LeafletMarkerContent
                        content={content}
                        onRender={() => {
                            setContentElementId(`${widgetId}-${id}`)
                            setShowMarker(true)
                        }}
                    />
                </div>
            )}
            { showMarker && <Marker ref={markerRef} eventHandlers={eventHandlers} position={position} icon={createMarkerIcon(contentElementId)} draggable={draggable}>
                { popupContent && <Popup>{popupContent}</Popup>}
            </Marker> }
        </div>
    )
}

const LeafletMarkerContent = ({
    content,
    onRender
}: {
    content: any;
    onRender: () => void;
}) => {
    useEffect(() => {
        onRender()
    }, []);

    return (
        <div>{content}</div>
    )
}

export default LeafletMarker
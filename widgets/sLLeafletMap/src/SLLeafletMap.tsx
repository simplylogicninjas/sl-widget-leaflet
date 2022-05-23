import { ReactElement, createElement, useEffect, useState, useReducer, useRef } from "react";
import { ListValue, ListExpressionValue, ActionValue, EditableValue, ValueStatus } from "mendix";
import { PositionModeEnum, SLLeafletMapContainerProps } from "../typings/SLLeafletMapProps";
import LeafletMap from "./components/leaflet-map.component";

import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import "./ui/SLLeafletMap.css";
import { LeafletMapProps, LeafletTileLayer } from "./components/leaflet-map.interface";
import { appContextReducer } from "./context/global.reducer";
import { initGlobalContext, initialGlobalContextState } from "./context/global.context";
import { ActionType } from "../../../shared/types/reducer.interface";
import { LatLng, Map } from "leaflet";
import { convertToFloat } from "./utils/coordinate";

declare let mx: any;

initGlobalContext();

const getAdditionalTileLayers = (
    additionalLayerList: ListValue | undefined,
    mapUrl: ListExpressionValue<string> | undefined,
    mapAttribution: ListExpressionValue<string> | undefined
): LeafletTileLayer[] => {
    return additionalLayerList?.items?.map(item => {
        const url = mapUrl?.get(item);
        const attribution = mapAttribution?.get(item);

        return {
            url: url?.value ?? '',
            attribution: attribution?.value
        }
    }) ?? [];
}

export function SLLeafletMap(props: SLLeafletMapContainerProps): ReactElement {
    const [state, dispatch] = useReducer(appContextReducer, initialGlobalContextState);
    const createdMap = useRef<Map>();
    const observer = useRef<IntersectionObserver>();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const onMapClickActionRef = useRef<ActionValue>();
    const onMapClickLatitudeRef = useRef<EditableValue>();
    const onMapClickLongitudeRef = useRef<EditableValue>();
    const positionModeRef = useRef<PositionModeEnum>();
    const latitudeRef = useRef<number>();
    const longitudeRef = useRef<number>();
    const zoomRef = useRef<number>();
    const [leafletMapProps, setLeafletMapProps] = useState<LeafletMapProps>();

    const onMapClick = (latlng: LatLng) => {
        if (onMapClickLatitudeRef.current && onMapClickLongitudeRef.current) {
            if (!onMapClickLatitudeRef.current.readOnly && !onMapClickLongitudeRef.current.readOnly) {
                onMapClickLatitudeRef.current?.setValue(latlng.lat.toString());
                onMapClickLongitudeRef.current?.setValue(latlng.lng.toString());
            } else {
                console.warn('Latitude or Longitude attribute is readOnly');
            }
        }

        if (onMapClickActionRef.current && onMapClickActionRef.current.canExecute) {
            onMapClickActionRef.current.execute();
        } else {
            console.warn('onMapClick Action cannot be executed');
        }
    }

    const onMapShowPopup = (latlng: LatLng) => {
        if (onMapClickLatitudeRef.current && onMapClickLongitudeRef.current) {
            onMapClickLatitudeRef.current.setValue(latlng.lat.toString());
            onMapClickLongitudeRef.current.setValue(latlng.lng.toString());
        }
    }

    const initPositionRefs = () => {
        const hasDynamicPosition = props.positionLatitude && props.positionLongitude && props.positionZoom;

        if (hasDynamicPosition) {
            if (props.positionLatitude?.status === ValueStatus.Available) {
                latitudeRef.current = convertToFloat(props.positionLatitude.value!);
            } else {
                if (!latitudeRef.current) {
                    latitudeRef.current = convertToFloat(props.defaultLatitude);
                }
            }

            if (props.positionLongitude?.status === ValueStatus.Available) {
                longitudeRef.current = convertToFloat(props.positionLongitude.value!);
            } else {
                if (!longitudeRef.current) {
                    longitudeRef.current = convertToFloat(props.defaultLongitude);
                }
            }

            if (props.positionZoom?.status === ValueStatus.Available) {
                zoomRef.current = props.positionZoom.value.toNumber()!;
            } else {
                if (!zoomRef.current) {
                    zoomRef.current = convertToFloat(props.defaultLongitude);
                }
            }
        } else {
            // Use fallback latitude, longitude and zoom
            latitudeRef.current = convertToFloat(props.defaultLatitude);
            longitudeRef.current = convertToFloat(props.defaultLongitude);
            zoomRef.current = props.defaultZoom;
        }
    }

    const updateLeafletMapProps = (lastVisibleTimestamp?: string) => {
        if (!positionModeRef.current) { 
            positionModeRef.current = props.positionMode
        }

        initPositionRefs();

        const mapProps: LeafletMapProps = {
            style: props.style ?? {},
            baseTileLayer: {
                url: props.baseMapUrl.value ?? '',
                attribution: props.baseMapAttribution?.value,
            },
            additionalTileLayers: [
                ...getAdditionalTileLayers(props.additionalMaps, props.additionalMapUrl, props.additionalMapAttribution)
            ],
            position: {
                mode: positionModeRef.current,
                zoom: zoomRef.current ? zoomRef.current : props.defaultZoom,
                latitude: latitudeRef.current ? latitudeRef.current : convertToFloat(props.defaultLatitude),
                longitude: longitudeRef.current ? longitudeRef.current : convertToFloat(props.defaultLongitude)
            },
            onReady: () => dispatch({
                type: ActionType.SetMapReady,
                payload: {
                    mapReady: true
                }
            }),
            whenCreated: map => createdMap.current = map,
            onClick: latlng => onMapClick(latlng),
            onShowPopup: latlng => onMapShowPopup(latlng),
            showPopupOnClick: !!props.onMapClickContent,
            popupContent: props.onMapClickContent,
            lastVisibleTimestamp,
            id: props.name
        }

        dispatch({
            type: ActionType.SetMapName,
            payload: {
                mapName: props.name
            }
        })
        setLeafletMapProps({ ...mapProps });
    }

    const initObserver = (container: HTMLDivElement) => {
        if (!observer.current) {
            observer.current = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0 && createdMap.current) {
                        createdMap.current.invalidateSize();
                        updateLeafletMapProps(
                            new Date().toISOString()
                        );
                    }
                })
            })
    
            observer.current.observe(container);
        }
    }

    useEffect(() => {
        updateLeafletMapProps();
    }, [
        props.baseMapUrl.value,
        props.additionalMaps?.items,
        props.positionLatitude?.value,
        props.positionLongitude?.value,
        props.positionZoom?.value
    ])

    useEffect(() => {
        if (createdMap.current && containerRef.current) {
            initObserver(containerRef.current);
        }

        return (() => {
            if (observer.current && containerRef.current) {
                observer.current.unobserve(containerRef.current);
            }
        })
    }, [createdMap.current, containerRef.current]);

    useEffect(() => {
        if (props.onMapClickAction) {
            onMapClickActionRef.current = props.onMapClickAction
        }

        if (props.onMapClickLatitude) {
            onMapClickLatitudeRef.current = props.onMapClickLatitude
        }

        if (props.onMapClickLongitude) {
            onMapClickLongitudeRef.current = props.onMapClickLongitude
        }
    }, [
        props.onMapClickAction,
        props.onMapClickLatitude,
        props.onMapClickLongitude
    ])

    useEffect(() => {
        if (createdMap.current) {
            createdMap.current.stopLocate();
        }
    }, []);

    return (
        <mx.slmap.context.Provider value={{ state, dispatch }}>
            <div id={props.name} className={props.class} ref={containerRef}>
                { leafletMapProps && <LeafletMap {...leafletMapProps}>{ props.content }</LeafletMap> }
                { props.content }
            </div>
        </mx.slmap.context.Provider>
    );
}

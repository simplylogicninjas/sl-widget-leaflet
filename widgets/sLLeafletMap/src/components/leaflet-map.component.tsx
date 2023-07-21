import { LatLngExpression, Map } from "leaflet";
import React, { createElement, useContext, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { IGlobalContext } from "../../../../shared/types/context.interface";
import LeafletGeofence from "./leaflet-geofence.component";
import LeafletGeoJSON from "./leaflet-geojson.component";
import { LeafletMapProps, LeafletTileLayer } from "./leaflet-map.interface";
import LeafletMarker from "./leaflet-marker.component";
import LeafletMapEvents from "./map-events";
import MapLocation from "./map-location.component";

declare let mx: any;

const LeafletMap = ({
    style,
    baseTileLayer,
    additionalTileLayers,
    position,
    onReady,
    whenCreated,
    onClick,
    onShowPopup,
    showPopupOnClick,
    popupContent,
    lastVisibleTimestamp,
    id
}: LeafletMapProps) => {
    const { state } = useContext<IGlobalContext>(mx.slmap.context);
    const [layers, setLayers] = useState<LeafletTileLayer[]>([]);
    const mapRef = useRef<Map>();

    const onWhenCreated = (map: Map) => {
        mapRef.current = map;
        whenCreated(map);

        map.setMinZoom(baseTileLayer.minZoom ?? 0);
        map.setMaxZoom(baseTileLayer.maxZoom ?? 18);
    };

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setMinZoom(baseTileLayer.minZoom ?? 0);
            mapRef.current.setMaxZoom(baseTileLayer.maxZoom ?? 18);
        }

        setLayers([{ ...baseTileLayer }, ...additionalTileLayers]);
    }, [baseTileLayer.url]);

    return (
        <React.Fragment>
            {baseTileLayer.url && (
                <MapContainer style={style} whenReady={() => onReady()} whenCreated={map => onWhenCreated(map)}>
                    <LeafletMapEvents
                        onClick={latlng => onClick(latlng)}
                        onShowPopup={latlng => onShowPopup(latlng)}
                        showPopupOnClick={showPopupOnClick}
                        popupContent={popupContent}
                    />

                    <MapLocation
                        lastUpdateTimestamp={lastVisibleTimestamp}
                        position={position}
                        markers={[...state.markers]}
                        geoJSONData={[...state.geoJSON]}
                    />

                    {layers.map(tileLayer => {
                        return (
                            <TileLayer
                                key={tileLayer.url}
                                attribution={tileLayer.attribution}
                                url={tileLayer.url}
                                minZoom={tileLayer.minZoom}
                                maxZoom={tileLayer.maxZoom}
                                zoomOffset={tileLayer.zoomOffset}
                                tileSize={tileLayer.tileSize}
                            />
                        );
                    })}
                    {state.markers.map(marker => {
                        const markerId = marker.id ? marker.id : `marker-div-${new Date().getMilliseconds()}`;

                        return (
                            <LeafletMarker
                                widgetId={id}
                                key={markerId}
                                id={markerId}
                                clickAction={state.markerAction}
                                dragAction={state.markerDragAction}
                                position={marker.position as LatLngExpression}
                                draggable={marker.draggable}
                                content={marker.content}
                                popupContent={marker.popupContent}
                            />
                        );
                    })}
                    {state.geoJSON.map((geoJSONData, index) => {
                        return <LeafletGeoJSON key={index} data={{...geoJSONData}} geoJSONAction={state.geoJSONAction} />;
                    })}

                    {state.geofence.length && (
                        <LeafletGeofence
                            data={[...state.geofence]}
                            geofenceAction={state.geofenceAction}
                            geofenceOutAction={state.geofenceOutAction}
                            geofencePositionAction={state.geofencePositionAction}
                            geofenceOptions={{ ...state.geofenceOptions }}
                        />
                    )}
                </MapContainer>
            )}
        </React.Fragment>
    );
};

export default React.memo(LeafletMap);

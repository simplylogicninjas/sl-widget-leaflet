import { LatLngExpression } from "leaflet";
import React, { createElement, useContext, useEffect, useRef } from "react"
import { MapContainer, TileLayer } from "react-leaflet";
import { IGlobalContext } from "../../../../shared/types/context.interface";
import LeafletGeofence from "./leaflet-geofence.component";
import LeafletGeoJSON from "./leaflet-geojson.component";
import { LeafletMapProps } from "./leaflet-map.interface";
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
    const {state} = useContext<IGlobalContext>(mx.slmap.context);
    const baseTileLayerRef = useRef<any>(null);

    useEffect(() => {
        if (baseTileLayerRef.current) {
            baseTileLayerRef.current.setUrl(baseTileLayer.url)
        }
    }, [baseTileLayer.url])

    return (
        <React.Fragment>
            {baseTileLayer.url && 
                <MapContainer
                    style={style}
                    minZoom={3}
                    whenReady={() => onReady()}
                    whenCreated={map => whenCreated(map)}
                >
                    <LeafletMapEvents
                        onClick={latlng => onClick(latlng)}
                        onShowPopup={latlng => onShowPopup(latlng)}
                        showPopupOnClick={showPopupOnClick}
                        popupContent={popupContent}
                    />

                    <MapLocation lastUpdateTimestamp={lastVisibleTimestamp} position={position} markers={[...state.markers]} geoJSONData={[...state.geoJSON]} />

                    <TileLayer
                        attribution={baseTileLayer.attribution}
                        url={baseTileLayer.url}
                        ref={baseTileLayerRef}
                    />

                    {
                        additionalTileLayers.map(tileLayer => {
                            return (
                                <TileLayer attribution={tileLayer.attribution} url={tileLayer.url} />
                            )
                        })
                    }
                    {
                        state.markers.map((marker, index) => {
                            return <LeafletMarker widgetId={id} key={index} id={!!marker.id ? marker.id : `marker-div-${new Date().getMilliseconds()}`} clickAction={state.markerAction} dragAction={state.markerDragAction} position={marker.position as LatLngExpression} draggable={marker.draggable} content={marker.content} popupContent={marker.popupContent} />
                        })
                    }
                    {
                        state.geoJSON.map((geoJSONData, index) => {
                            return <LeafletGeoJSON key={index} data={geoJSONData} geoJSONAction={state.geoJSONAction} />
                        })
                    }

                { state.geofence.length && <LeafletGeofence data={[...state.geofence]} geofenceAction={state.geofenceAction} geofenceOutAction={state.geofenceOutAction} geofencePositionAction={state.geofencePositionAction} geofenceOptions={{...state.geofenceOptions}} /> }
                </MapContainer>
            }
            
        </React.Fragment>
    )
}

export default React.memo(LeafletMap);
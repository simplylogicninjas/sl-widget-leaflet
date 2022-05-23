import { latLngBounds, LatLngExpression, geoJSON, Map, LatLngBounds, LatLng } from "leaflet";
import { useEffect, useRef } from "react";
import { useMapEvents } from "react-leaflet"
import { IMarker } from "../../../../shared/types/map.interface";
import { Position } from "./leaflet-map.interface"

const MapLocation = ({
    lastUpdateTimestamp,
    position,
    markers,
    geoJSONData
}: {
    lastUpdateTimestamp?: string;
    position: Position;
    markers: IMarker[];
    geoJSONData: any[];
}) => {
    const currentPosition = useRef<LatLng>();
    const map = useMapEvents({
        locationerror: () => {
            position.mode === 'geoPosition' && setMapView(map)
        },
        locationfound: ({latlng}) => {
            if (position.mode === 'geoPosition' && !currentPosition.current) {
                currentPosition.current = latlng;
                map.setView([latlng.lat, latlng.lng], position.zoom);
            }
        }
    })

    const getMarkerBounds = (markers: IMarker[]) => {
        const markerBounds = latLngBounds([]);

        markers.forEach(marker => {
            markerBounds.extend(marker.position as LatLngExpression);
        })

        return markerBounds;
    }

    const getGeoJSONBounds = (geoJSONData: any[]) => {
        const bounds = latLngBounds([]);

        geoJSONData.forEach(data => {
            const item = geoJSON(data);

            bounds.extend(item.getBounds());
        })

        return bounds;
    }

    const setMapView = (map: Map) => {
        map.setView([position.latitude, position.longitude], position.zoom)
    }

    const setMapBounds = (map: Map, bounds: LatLngBounds) => {
        if (bounds && bounds.isValid()) {
            map.fitBounds(bounds);
        } else {
            setMapView(map);
        }
    }

    useEffect(() => {
        if (map) {
            if (position.mode === 'geoPosition') {
                if (!currentPosition.current) {
                    setMapView(map);
                }
                map.locate();
            }

            if (position.mode === 'manual') {
                setMapView(map);
            }

            if (position.mode === 'marker') {
                setMapBounds(
                    map,
                    getMarkerBounds(markers)
                );
            }

            if (position.mode === 'geojson') {
                setMapBounds(
                    map,
                    getGeoJSONBounds(geoJSONData)
                );
            }
        }
    }, [
        lastUpdateTimestamp,
        position.mode,
        position.latitude,
        position.longitude,
        markers.length,
        geoJSONData.length
    ])

    return null;
}

export default MapLocation;
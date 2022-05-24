import { LatLng, LatLngExpression } from "leaflet";
import React, { createElement, useCallback, useEffect, useRef, useState } from "react";
import { useMapEvents } from "react-leaflet";
import {
    IdentifierAction,
    IGeofence,
    IGeofenceLocateOptions,
    LatLngAction
} from "../../../../shared/types/map.interface";
import LeafletGeofenceCircleMarker from "./leaflet-geofence-circle-marker.component";
import LeafletGeofenceCircle from "./leaflet-geofence-circle.component";

interface Props {
    data: IGeofence[];
    geofenceOptions: IGeofenceLocateOptions;
    geofenceAction?: IdentifierAction;
    geofenceOutAction?: IdentifierAction;
    geofencePositionAction?: LatLngAction;
}

const LeafletGeofence = ({
    data,
    geofenceOptions,
    geofenceAction,
    geofenceOutAction,
    geofencePositionAction
}: Props) => {
    const latLngRef = useRef<LatLng>();
    const [currentLocation, setCurrentLocation] = useState<LatLng>();
    const [geofenced, setGeofenced] = useState<IGeofence[]>([]);
    const debounceRef = useRef<any>();
    const debounceAmount = 250;
    const locationEnabled = useRef(false);
    const setView = useRef(false);

    const map = useMapEvents({
        locationfound: ({ latlng }) => {
            if (data.length && locationEnabled.current) {
                if (!latLngRef.current) {
                    latLngRef.current = latlng;
                    onLocationFound(latlng);
                } else {
                    if (latlng.lat !== latLngRef.current.lat || latlng.lng !== latLngRef.current.lng) {
                        latLngRef.current = latlng;
                        onLocationFound(latlng);
                    }
                }

                if (setView.current) {
                    updateMapLocationView(latlng);
                }
            }
        }
    });

    const updateMapLocationView = (latlng: LatLngExpression) => {
        map.setView(latlng, map.getMaxZoom());
    };

    const onLocationFound = (latlng: LatLng) => {
        const locationGeofenced: IGeofence[] = [];
        data.forEach((geofenceCircle, index) => {
            const distance = map.distance(latlng, geofenceCircle.position as LatLngExpression);
            const geofenceInside = distance < geofenceCircle.radius;

            if (geofenceInside) {
                geofenceCircle.distance = distance;
                locationGeofenced.push(geofenceCircle);

                debounceRef.current = setTimeout(() => notifyGeofenceIn(geofenceCircle), index * debounceAmount);
            } else {
                const hasGeofenced = geofenced.find(it => it.id === geofenceCircle.id);

                if (hasGeofenced) {
                    debounceRef.current = setTimeout(() => notifyGeofenceOut(geofenceCircle), index * debounceAmount);
                }
            }
        });

        setGeofenced([...locationGeofenced]);
        setCurrentLocation(latlng);

        if (geofencePositionAction) {
            geofencePositionAction(latlng.lat.toString(), latlng.lng.toString());
        }
    };

    const notifyGeofenceIn = useCallback(
        (geofence: IGeofence) => {
            if (geofenceAction) {
                geofenceAction(geofence.id, geofence.distance);
            }
        },
        [geofenceAction]
    );

    const notifyGeofenceOut = useCallback(
        (geofence: IGeofence) => {
            if (geofenceOutAction) {
                geofenceOutAction(geofence.id);
            }
        },
        [geofenceOutAction]
    );

    useEffect(() => {
        locationEnabled.current = geofenceOptions.enabled;
        setView.current = geofenceOptions.setView;

        if (data.length && locationEnabled.current) {
            map.locate({
                watch: true,
                enableHighAccuracy: true,
                maximumAge: geofenceOptions.maximumAge
            });
        } else {
            setCurrentLocation(undefined);
            setGeofenced([]);
            latLngRef.current = undefined;
        }
    }, [data.length, geofenceOptions.enabled, geofenceOptions.setView]);

    const getCircleColor = (geofence: IGeofence) => {
        return geofenced.find(it => it.id === geofence.id) ? geofence.activeColor : geofence.defaultColor;
    };

    return (
        <React.Fragment>
            {currentLocation && <LeafletGeofenceCircleMarker latlng={currentLocation} />}
            {data.map(item => {
                return (
                    <LeafletGeofenceCircle
                        key={item.position.toString()}
                        latlng={item.position as LatLngExpression}
                        radius={item.radius}
                        color={getCircleColor(item)}
                        stroke={{
                            opacity: item.strokeOpacity,
                            weight: item.strokeWeight
                        }}
                        fill={{
                            opacity: item.fillOpacity
                        }}
                    />
                );
            })}
        </React.Fragment>
    );
};

export default LeafletGeofence;

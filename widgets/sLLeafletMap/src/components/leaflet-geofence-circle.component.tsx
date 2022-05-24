import { Circle } from "react-leaflet";
import { createElement, useEffect, useRef } from "react";
import { LatLngExpression } from "leaflet";

interface Props {
    latlng: LatLngExpression;
    radius: number;
    color: string;
    stroke: {
        opacity: number;
        weight: number;
    };
    fill: {
        opacity: number;
    };
}

const LeafletGeofenceCircle = ({ latlng, radius, color }: Props) => {
    const ref = useRef<any>(null);

    useEffect(() => {
        if (ref) {
            ref.current.setStyle({
                color
            });
        }
    }, [color]);

    return <Circle ref={ref} center={latlng} radius={radius} color={color} />;
};

export default LeafletGeofenceCircle;

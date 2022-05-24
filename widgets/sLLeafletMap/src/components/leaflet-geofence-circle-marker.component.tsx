import { LatLng } from "leaflet";
import { useRef, createElement, useEffect } from "react";
import { CircleMarker } from "react-leaflet";

interface Props {
    latlng: LatLng;
}

const LeafletGeofenceCircleMarker = ({ latlng }: Props) => {
    const ref = useRef<any>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.setLatLng(latlng);
        }
    }, [latlng]);

    return <CircleMarker ref={ref} center={latlng} />;
};

export default LeafletGeofenceCircleMarker;

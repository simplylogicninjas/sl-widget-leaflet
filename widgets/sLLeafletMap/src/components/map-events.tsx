import { LatLng, LatLngExpression, LeafletMouseEvent } from "leaflet";
import React, { createElement, useState } from "react";
import { Popup, useMapEvents } from "react-leaflet";

interface Props {
    onClick?: (latlng: LatLng) => void;
    onShowPopup?: (latlng: LatLng) => void;
    showPopupOnClick: boolean;
    popupContent: any;
}

const LeafletMapEvents = ({ onClick, onShowPopup, showPopupOnClick, popupContent }: Props) => {
    const [popupLatLng, setPopupLatLng] = useState<LatLngExpression>();

    const onMapClick = (event: LeafletMouseEvent) => {
        if (onClick) {
            onClick(event.latlng);
        }

        if (showPopupOnClick && onShowPopup) {
            onShowPopup(event.latlng);
            setPopupLatLng(event.latlng);
        }
    };

    useMapEvents({
        click: event => {
            onMapClick(event);
        }
    });

    return <React.Fragment>{popupLatLng && <Popup position={popupLatLng}>{popupContent}</Popup>}</React.Fragment>;
};

export default LeafletMapEvents;

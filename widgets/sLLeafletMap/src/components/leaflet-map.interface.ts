import { LatLng, Map } from "leaflet";
import { CSSProperties } from "react";

export interface LeafletTileLayer {
    url: string;
    attribution?: string;
}

export type PositionMode = 'geoPosition' | 'manual' | 'marker' | 'geojson';

export interface Position {
    mode: PositionMode;
    zoom: number;
    latitude: number;
    longitude: number;
}

export interface LeafletMapProps {
    onReady: () => void;
    whenCreated: (map: Map) => void;
    onClick: (latlng: LatLng) => void;
    onShowPopup: (latlng: LatLng) => void;
    lastVisibleTimestamp?: string;
    showPopupOnClick: boolean;
    popupContent: any;
    baseTileLayer: LeafletTileLayer
    additionalTileLayers: LeafletTileLayer[];
    position: Position;
    style: CSSProperties;
    id: string;
}
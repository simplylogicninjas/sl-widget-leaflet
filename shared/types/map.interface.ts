export interface IMarker {
    id?: string;
    position: number[];
    draggable: boolean;
    content?: any;
    popupContent?: any;
}

export interface IGeofence {
    id: string;
    position: number[];
    radius: number;
    defaultColor: string;
    activeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    fillOpacity: number;
    distance?: number;
    isActive?: boolean;
}

export interface IGeofenceLocateOptions {
    maximumAge: number;
    enabled: boolean;
    setView: boolean;
}

export type IdentifierAction = (id: string, metadata?: string|number) => void;
export type IntegerAction = (value: number) => void;
export type LatLngAction = (lat: string, long: string, id?: string) => void;
import { IdentifierAction, IGeofence, IGeofenceLocateOptions, IMarker, LatLngAction } from "./map.interface";
import { IGlobalStateActions } from "./reducer.interface";

export interface IGlobalState {
    mapReady: boolean;
    mapName: string;
    markers: IMarker[];
    geoJSON: any[];
    geoJSONAction?: IdentifierAction;
    geofence: IGeofence[];
    geofenceAction?: IdentifierAction;
    geofenceOutAction?: IdentifierAction;
    geofencePositionAction?: LatLngAction;
    geofenceOptions: IGeofenceLocateOptions;
    markerAction?: IdentifierAction;
    markerDragAction?: LatLngAction;
}

export interface IGlobalContext {
    state: IGlobalState,
    dispatch: (actions: IGlobalStateActions) => void;
}
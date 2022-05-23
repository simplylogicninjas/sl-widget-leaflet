import { IdentifierAction, IGeofence, IGeofenceLocateOptions, IMarker, LatLngAction } from "./map.interface";

export enum ActionType {
    SetMapReady,
    SetMapName,
    SetMarkers,
    SetGeoJSON,
    SetGeoJSONAction,
    SetGeofence,
    SetGeofenceAction,
    SetGeofenceOutAction,
    SetGeofencePositionAction,
    SetGeofenceOptions,
    SetMarkerAction,
    SetMarkerDragAction
}

export interface ISetMapReady {
    type: ActionType.SetMapReady,
    payload: {mapReady: boolean};
}

export interface ISetMapName {
    type: ActionType.SetMapName,
    payload: {mapName: string};
}

export interface ISetMarkers {
    type: ActionType.SetMarkers,
    payload: IMarker[];
}

export interface ISetGeoJSON {
    type: ActionType.SetGeoJSON,
    payload: any[];
}

export interface ISetGeoJSONAction {
    type: ActionType.SetGeoJSONAction,
    payload: IdentifierAction;
}

export interface ISetGeofence {
    type: ActionType.SetGeofence,
    payload: IGeofence[];
}

export interface ISetGeofenceAction {
    type: ActionType.SetGeofenceAction,
    payload: IdentifierAction;
}

export interface ISetGeofenceOutAction {
    type: ActionType.SetGeofenceOutAction,
    payload: IdentifierAction;
}

export interface ISetGeofencePositionAction {
    type: ActionType.SetGeofencePositionAction,
    payload: LatLngAction;
}

export interface ISetGeofenceOptions {
    type: ActionType.SetGeofenceOptions,
    payload: IGeofenceLocateOptions;
}

export interface ISetMarkerAction {
    type: ActionType.SetMarkerAction,
    payload: IdentifierAction;
}

export interface ISetMarkerDragAction {
    type: ActionType.SetMarkerDragAction,
    payload: LatLngAction;
}

export type IGlobalStateActions = ISetMapReady | ISetMapName | ISetMarkers | ISetGeoJSON | ISetGeoJSONAction | ISetGeofence | ISetGeofenceAction | ISetGeofenceOutAction | ISetGeofencePositionAction | ISetGeofenceOptions | ISetMarkerAction | ISetMarkerDragAction;

export function updateMapReady(mapReady: boolean): ISetMapReady {
    return {
        type: ActionType.SetMapReady,
        payload: {mapReady}
    }
}

export function updateMapName(mapName: string): ISetMapName {
    return {
        type: ActionType.SetMapName,
        payload: {mapName}
    }
}

export function updateMarkers(markers: IMarker[]): ISetMarkers {
    return {
        type: ActionType.SetMarkers,
        payload: [...markers]
    }
}

export function updateGeoJSON(data: any[]): ISetGeoJSON {
    return {
        type: ActionType.SetGeoJSON,
        payload: [...data]
    }
}

export function updateGeoJSONAction(data: IdentifierAction): ISetGeoJSONAction {
    return {
        type: ActionType.SetGeoJSONAction,
        payload: data
    }
}

export function updateGeofence(data: IGeofence[]): ISetGeofence {
    return {
        type: ActionType.SetGeofence,
        payload: [...data]
    }
}

export function updateGeofenceAction(data: IdentifierAction): ISetGeofenceAction {
    return {
        type: ActionType.SetGeofenceAction,
        payload: data
    }
}

export function updateGeofenceOutAction(data: IdentifierAction): ISetGeofenceOutAction {
    return {
        type: ActionType.SetGeofenceOutAction,
        payload: data
    }
}

export function updateGeofencePositionAction(data: LatLngAction): ISetGeofencePositionAction {
    return {
        type: ActionType.SetGeofencePositionAction,
        payload: data
    }
}

export function updateGeofenceOptions(data: IGeofenceLocateOptions): ISetGeofenceOptions {
    return {
        type: ActionType.SetGeofenceOptions,
        payload: data
    }
}

export function updateMarkerAction(data: IdentifierAction): ISetMarkerAction {
    return {
        type: ActionType.SetMarkerAction,
        payload: data
    }
}

export function updateMarkerDragAction(data: LatLngAction): ISetMarkerDragAction {
    return {
        type: ActionType.SetMarkerDragAction,
        payload: data
    }
}
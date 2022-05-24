import { IGlobalState } from "../../../../shared/types/context.interface";
import { ActionType, IGlobalStateActions } from "../../../../shared/types/reducer.interface";

export function appContextReducer(state: IGlobalState, action: IGlobalStateActions): IGlobalState {
    switch (action.type) {
        case ActionType.SetMapReady:
            return {
                ...state,
                mapReady: action.payload.mapReady
            };
        case ActionType.SetMapName:
            return {
                ...state,
                mapName: action.payload.mapName
            };
        case ActionType.SetMarkers:
            return {
                ...state,
                markers: action.payload
            };
        case ActionType.SetGeoJSON:
            return {
                ...state,
                geoJSON: action.payload
            };
        case ActionType.SetGeoJSONAction:
            return {
                ...state,
                geoJSONAction: action.payload
            };
        case ActionType.SetGeofence:
            return {
                ...state,
                geofence: action.payload
            };
        case ActionType.SetGeofenceAction:
            return {
                ...state,
                geofenceAction: action.payload
            };
        case ActionType.SetGeofenceOutAction:
            return {
                ...state,
                geofenceOutAction: action.payload
            };
        case ActionType.SetGeofencePositionAction:
            return {
                ...state,
                geofencePositionAction: action.payload
            };
        case ActionType.SetGeofenceOptions:
            return {
                ...state,
                geofenceOptions: action.payload
            };
        case ActionType.SetMarkerAction:
            return {
                ...state,
                markerAction: action.payload
            };
        case ActionType.SetMarkerDragAction:
            return {
                ...state,
                markerDragAction: action.payload
            };
    }
}

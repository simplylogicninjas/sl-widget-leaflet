import React, { useContext, useRef, useEffect, createElement } from 'react';
import Big from 'big.js';

var ActionType;
(function (ActionType) {
    ActionType[ActionType["SetMapReady"] = 0] = "SetMapReady";
    ActionType[ActionType["SetMapName"] = 1] = "SetMapName";
    ActionType[ActionType["SetMarkers"] = 2] = "SetMarkers";
    ActionType[ActionType["SetGeoJSON"] = 3] = "SetGeoJSON";
    ActionType[ActionType["SetGeoJSONAction"] = 4] = "SetGeoJSONAction";
    ActionType[ActionType["SetGeofence"] = 5] = "SetGeofence";
    ActionType[ActionType["SetGeofenceAction"] = 6] = "SetGeofenceAction";
    ActionType[ActionType["SetGeofenceOutAction"] = 7] = "SetGeofenceOutAction";
    ActionType[ActionType["SetGeofencePositionAction"] = 8] = "SetGeofencePositionAction";
    ActionType[ActionType["SetGeofenceOptions"] = 9] = "SetGeofenceOptions";
    ActionType[ActionType["SetMarkerAction"] = 10] = "SetMarkerAction";
    ActionType[ActionType["SetMarkerDragAction"] = 11] = "SetMarkerDragAction";
})(ActionType || (ActionType = {}));
function updateGeofence(data) {
    return {
        type: ActionType.SetGeofence,
        payload: [...data]
    };
}
function updateGeofenceAction(data) {
    return {
        type: ActionType.SetGeofenceAction,
        payload: data
    };
}
function updateGeofenceOutAction(data) {
    return {
        type: ActionType.SetGeofenceOutAction,
        payload: data
    };
}
function updateGeofencePositionAction(data) {
    return {
        type: ActionType.SetGeofencePositionAction,
        payload: data
    };
}
function updateGeofenceOptions(data) {
    return {
        type: ActionType.SetGeofenceOptions,
        payload: data
    };
}

const canSetAttributeValue = (attributeValue) => {
    return attributeValue && attributeValue.status === "available" /* Available */;
};
const isDifferentData = (currentData, newData) => {
    return JSON.stringify(currentData) !== JSON.stringify(newData);
};
function SLLeafletGeofence(props) {
    const { state, dispatch } = useContext(mx.slmap.context);
    const dataRef = useRef([]);
    const actionOut = useRef();
    const actionOutID = useRef();
    const actionIn = useRef();
    const actionInID = useRef();
    const actionInDistance = useRef();
    const getDefaultRadius = () => {
        var _a, _b;
        return (_b = (_a = props.defaultRadius.value) === null || _a === void 0 ? void 0 : _a.toNumber()) !== null && _b !== void 0 ? _b : 30;
    };
    const loadGeofence = (items) => {
        const data = items
            .map(item => {
            var _a, _b, _c, _d;
            if (props.id.get(item).value && props.latitude.get(item).value && props.longitude.get(item).value) {
                return {
                    id: props.id.get(item).value.toString(),
                    position: [
                        parseFloat(props.latitude.get(item).value),
                        parseFloat(props.longitude.get(item).value)
                    ],
                    radius: props.radius
                        ? (_b = (_a = props.radius.get(item).value) === null || _a === void 0 ? void 0 : _a.toNumber()) !== null && _b !== void 0 ? _b : getDefaultRadius()
                        : getDefaultRadius(),
                    defaultColor: props.defaultColor && props.defaultColor.get(item)
                        ? (_c = props.defaultColor.get(item).value) !== null && _c !== void 0 ? _c : "#264ae5"
                        : "#264ae5",
                    activeColor: props.activeColor && props.activeColor.get(item)
                        ? (_d = props.activeColor.get(item).value) !== null && _d !== void 0 ? _d : "#3cb33d"
                        : "#3cb33d",
                    strokeOpacity: props.strokeOpacity && props.strokeOpacity.get(item) ? props.strokeOpacity.get(item) : 1.0,
                    strokeWeight: props.strokeWeight && props.strokeWeight.get(item) ? props.strokeWeight.get(item) : 3,
                    fillOpacity: props.fillOpacity && props.fillOpacity.get(item) ? props.fillOpacity.get(item) : 1.0
                };
            }
            else {
                return undefined;
            }
        })
            .filter(it => !!it);
        if (isDifferentData(data, dataRef.current)) {
            dataRef.current = data;
            dispatch(updateGeofence([...data]));
        }
    };
    const onGeofence = (id, metadata) => {
        if (actionIn.current) {
            if (actionIn.current.canExecute) {
                if (canSetAttributeValue(actionInID.current) && canSetAttributeValue(actionInDistance.current)) {
                    actionInID.current.setValue(id);
                    actionInDistance.current.setValue(new Big(metadata.toFixed(2)));
                    actionIn.current.execute();
                }
                else {
                    console.warn("Cannot set Geofence ID and Geofence distance attribute");
                }
            }
            else {
                console.warn("Cannot execute Geofence IN event");
            }
        }
    };
    const onGeofenceOut = (id) => {
        if (actionOut.current) {
            if (actionOut.current.canExecute) {
                if (canSetAttributeValue(actionOutID.current)) {
                    actionOutID.current.setValue(id);
                    actionOut.current.execute();
                }
                else {
                    console.warn("Cannot set Geofence Out ID attribute");
                }
            }
            else {
                console.warn("Cannot execute Geofence OUT event");
            }
        }
    };
    const onGeofencePosition = (lat, long) => {
        if (props.onGeofenceCurrentPositionAction &&
            props.onGeofenceCurrentPositionLatitude &&
            props.onGeofenceCurrentPositionLongitude) {
            props.onGeofenceCurrentPositionLatitude.setValue(lat);
            props.onGeofenceCurrentPositionLongitude.setValue(long);
            props.onGeofenceCurrentPositionAction.execute();
        }
    };
    useEffect(() => {
        if (state.mapReady && props.data.items) {
            loadGeofence(props.data.items);
        }
    }, [props.data.items, state.mapReady]);
    useEffect(() => {
        var _a, _b, _c, _d;
        dispatch(updateGeofenceOptions({
            enabled: (_a = props.geofenceEnabled.value) !== null && _a !== void 0 ? _a : true,
            setView: (_b = props.geofenceSetViewEnabled.value) !== null && _b !== void 0 ? _b : true,
            maximumAge: (_d = (_c = props.maximumAge.value) === null || _c === void 0 ? void 0 : _c.toNumber()) !== null && _d !== void 0 ? _d : 0
        }));
    }, [props.maximumAge.value, props.geofenceEnabled.value, props.geofenceSetViewEnabled.value]);
    useEffect(() => {
        actionIn.current = props.onGeofenceAction;
        actionInID.current = props.onGeofenceId;
        actionInDistance.current = props.onGeofenceDistance;
        actionOut.current = props.onGeofenceOutAction;
        actionOutID.current = props.onGeofenceOutId;
        if (props.onGeofenceAction &&
            props.onGeofenceId &&
            props.onGeofenceAction.canExecute &&
            !state.geofenceAction) {
            dispatch(updateGeofenceAction(onGeofence));
        }
        if (props.onGeofenceOutAction &&
            props.onGeofenceOutId &&
            props.onGeofenceOutAction.canExecute &&
            !state.geofenceOutAction) {
            dispatch(updateGeofenceOutAction(onGeofenceOut));
        }
        if (props.onGeofenceCurrentPositionAction &&
            props.onGeofenceCurrentPositionLatitude &&
            props.onGeofenceCurrentPositionLongitude &&
            props.onGeofenceCurrentPositionAction.canExecute &&
            !state.geofencePositionAction) {
            dispatch(updateGeofencePositionAction(onGeofencePosition));
        }
    }, [
        props.onGeofenceAction,
        props.onGeofenceId,
        props.onGeofenceOutAction,
        props.onGeofenceOutId,
        props.onGeofenceCurrentPositionAction,
        props.onGeofenceCurrentPositionLatitude,
        props.onGeofenceCurrentPositionLongitude
    ]);
    return createElement(React.Fragment, null);
}

export { SLLeafletGeofence };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xMZWFmbGV0R2VvZmVuY2UubWpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvdHlwZXMvcmVkdWNlci5pbnRlcmZhY2UudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvU0xMZWFmbGV0R2VvZmVuY2UudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElkZW50aWZpZXJBY3Rpb24sIElHZW9mZW5jZSwgSUdlb2ZlbmNlTG9jYXRlT3B0aW9ucywgSU1hcmtlciwgTGF0TG5nQWN0aW9uIH0gZnJvbSBcIi4vbWFwLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQWN0aW9uVHlwZSB7XHJcbiAgICBTZXRNYXBSZWFkeSxcclxuICAgIFNldE1hcE5hbWUsXHJcbiAgICBTZXRNYXJrZXJzLFxyXG4gICAgU2V0R2VvSlNPTixcclxuICAgIFNldEdlb0pTT05BY3Rpb24sXHJcbiAgICBTZXRHZW9mZW5jZSxcclxuICAgIFNldEdlb2ZlbmNlQWN0aW9uLFxyXG4gICAgU2V0R2VvZmVuY2VPdXRBY3Rpb24sXHJcbiAgICBTZXRHZW9mZW5jZVBvc2l0aW9uQWN0aW9uLFxyXG4gICAgU2V0R2VvZmVuY2VPcHRpb25zLFxyXG4gICAgU2V0TWFya2VyQWN0aW9uLFxyXG4gICAgU2V0TWFya2VyRHJhZ0FjdGlvblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZXRNYXBSZWFkeSB7XHJcbiAgICB0eXBlOiBBY3Rpb25UeXBlLlNldE1hcFJlYWR5LFxyXG4gICAgcGF5bG9hZDoge21hcFJlYWR5OiBib29sZWFufTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2V0TWFwTmFtZSB7XHJcbiAgICB0eXBlOiBBY3Rpb25UeXBlLlNldE1hcE5hbWUsXHJcbiAgICBwYXlsb2FkOiB7bWFwTmFtZTogc3RyaW5nfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2V0TWFya2VycyB7XHJcbiAgICB0eXBlOiBBY3Rpb25UeXBlLlNldE1hcmtlcnMsXHJcbiAgICBwYXlsb2FkOiBJTWFya2VyW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNldEdlb0pTT04ge1xyXG4gICAgdHlwZTogQWN0aW9uVHlwZS5TZXRHZW9KU09OLFxyXG4gICAgcGF5bG9hZDogYW55W107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNldEdlb0pTT05BY3Rpb24ge1xyXG4gICAgdHlwZTogQWN0aW9uVHlwZS5TZXRHZW9KU09OQWN0aW9uLFxyXG4gICAgcGF5bG9hZDogSWRlbnRpZmllckFjdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2V0R2VvZmVuY2Uge1xyXG4gICAgdHlwZTogQWN0aW9uVHlwZS5TZXRHZW9mZW5jZSxcclxuICAgIHBheWxvYWQ6IElHZW9mZW5jZVtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZXRHZW9mZW5jZUFjdGlvbiB7XHJcbiAgICB0eXBlOiBBY3Rpb25UeXBlLlNldEdlb2ZlbmNlQWN0aW9uLFxyXG4gICAgcGF5bG9hZDogSWRlbnRpZmllckFjdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2V0R2VvZmVuY2VPdXRBY3Rpb24ge1xyXG4gICAgdHlwZTogQWN0aW9uVHlwZS5TZXRHZW9mZW5jZU91dEFjdGlvbixcclxuICAgIHBheWxvYWQ6IElkZW50aWZpZXJBY3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNldEdlb2ZlbmNlUG9zaXRpb25BY3Rpb24ge1xyXG4gICAgdHlwZTogQWN0aW9uVHlwZS5TZXRHZW9mZW5jZVBvc2l0aW9uQWN0aW9uLFxyXG4gICAgcGF5bG9hZDogTGF0TG5nQWN0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZXRHZW9mZW5jZU9wdGlvbnMge1xyXG4gICAgdHlwZTogQWN0aW9uVHlwZS5TZXRHZW9mZW5jZU9wdGlvbnMsXHJcbiAgICBwYXlsb2FkOiBJR2VvZmVuY2VMb2NhdGVPcHRpb25zO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZXRNYXJrZXJBY3Rpb24ge1xyXG4gICAgdHlwZTogQWN0aW9uVHlwZS5TZXRNYXJrZXJBY3Rpb24sXHJcbiAgICBwYXlsb2FkOiBJZGVudGlmaWVyQWN0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZXRNYXJrZXJEcmFnQWN0aW9uIHtcclxuICAgIHR5cGU6IEFjdGlvblR5cGUuU2V0TWFya2VyRHJhZ0FjdGlvbixcclxuICAgIHBheWxvYWQ6IExhdExuZ0FjdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgSUdsb2JhbFN0YXRlQWN0aW9ucyA9IElTZXRNYXBSZWFkeSB8IElTZXRNYXBOYW1lIHwgSVNldE1hcmtlcnMgfCBJU2V0R2VvSlNPTiB8IElTZXRHZW9KU09OQWN0aW9uIHwgSVNldEdlb2ZlbmNlIHwgSVNldEdlb2ZlbmNlQWN0aW9uIHwgSVNldEdlb2ZlbmNlT3V0QWN0aW9uIHwgSVNldEdlb2ZlbmNlUG9zaXRpb25BY3Rpb24gfCBJU2V0R2VvZmVuY2VPcHRpb25zIHwgSVNldE1hcmtlckFjdGlvbiB8IElTZXRNYXJrZXJEcmFnQWN0aW9uO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1hcFJlYWR5KG1hcFJlYWR5OiBib29sZWFuKTogSVNldE1hcFJlYWR5IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogQWN0aW9uVHlwZS5TZXRNYXBSZWFkeSxcclxuICAgICAgICBwYXlsb2FkOiB7bWFwUmVhZHl9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNYXBOYW1lKG1hcE5hbWU6IHN0cmluZyk6IElTZXRNYXBOYW1lIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogQWN0aW9uVHlwZS5TZXRNYXBOYW1lLFxyXG4gICAgICAgIHBheWxvYWQ6IHttYXBOYW1lfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWFya2VycyhtYXJrZXJzOiBJTWFya2VyW10pOiBJU2V0TWFya2VycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IEFjdGlvblR5cGUuU2V0TWFya2VycyxcclxuICAgICAgICBwYXlsb2FkOiBbLi4ubWFya2Vyc11cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdlb0pTT04oZGF0YTogYW55W10pOiBJU2V0R2VvSlNPTiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IEFjdGlvblR5cGUuU2V0R2VvSlNPTixcclxuICAgICAgICBwYXlsb2FkOiBbLi4uZGF0YV1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdlb0pTT05BY3Rpb24oZGF0YTogSWRlbnRpZmllckFjdGlvbik6IElTZXRHZW9KU09OQWN0aW9uIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogQWN0aW9uVHlwZS5TZXRHZW9KU09OQWN0aW9uLFxyXG4gICAgICAgIHBheWxvYWQ6IGRhdGFcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdlb2ZlbmNlKGRhdGE6IElHZW9mZW5jZVtdKTogSVNldEdlb2ZlbmNlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogQWN0aW9uVHlwZS5TZXRHZW9mZW5jZSxcclxuICAgICAgICBwYXlsb2FkOiBbLi4uZGF0YV1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdlb2ZlbmNlQWN0aW9uKGRhdGE6IElkZW50aWZpZXJBY3Rpb24pOiBJU2V0R2VvZmVuY2VBY3Rpb24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBBY3Rpb25UeXBlLlNldEdlb2ZlbmNlQWN0aW9uLFxyXG4gICAgICAgIHBheWxvYWQ6IGRhdGFcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdlb2ZlbmNlT3V0QWN0aW9uKGRhdGE6IElkZW50aWZpZXJBY3Rpb24pOiBJU2V0R2VvZmVuY2VPdXRBY3Rpb24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBBY3Rpb25UeXBlLlNldEdlb2ZlbmNlT3V0QWN0aW9uLFxyXG4gICAgICAgIHBheWxvYWQ6IGRhdGFcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUdlb2ZlbmNlUG9zaXRpb25BY3Rpb24oZGF0YTogTGF0TG5nQWN0aW9uKTogSVNldEdlb2ZlbmNlUG9zaXRpb25BY3Rpb24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBBY3Rpb25UeXBlLlNldEdlb2ZlbmNlUG9zaXRpb25BY3Rpb24sXHJcbiAgICAgICAgcGF5bG9hZDogZGF0YVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlR2VvZmVuY2VPcHRpb25zKGRhdGE6IElHZW9mZW5jZUxvY2F0ZU9wdGlvbnMpOiBJU2V0R2VvZmVuY2VPcHRpb25zIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogQWN0aW9uVHlwZS5TZXRHZW9mZW5jZU9wdGlvbnMsXHJcbiAgICAgICAgcGF5bG9hZDogZGF0YVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWFya2VyQWN0aW9uKGRhdGE6IElkZW50aWZpZXJBY3Rpb24pOiBJU2V0TWFya2VyQWN0aW9uIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogQWN0aW9uVHlwZS5TZXRNYXJrZXJBY3Rpb24sXHJcbiAgICAgICAgcGF5bG9hZDogZGF0YVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTWFya2VyRHJhZ0FjdGlvbihkYXRhOiBMYXRMbmdBY3Rpb24pOiBJU2V0TWFya2VyRHJhZ0FjdGlvbiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IEFjdGlvblR5cGUuU2V0TWFya2VyRHJhZ0FjdGlvbixcclxuICAgICAgICBwYXlsb2FkOiBkYXRhXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50LCBjcmVhdGVFbGVtZW50LCB1c2VFZmZlY3QsIHVzZUNvbnRleHQsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgT2JqZWN0SXRlbSwgQWN0aW9uVmFsdWUsIEVkaXRhYmxlVmFsdWUsIFZhbHVlU3RhdHVzIH0gZnJvbSBcIm1lbmRpeFwiO1xuXG5pbXBvcnQgeyBTTExlYWZsZXRHZW9mZW5jZUNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uL3R5cGluZ3MvU0xMZWFmbGV0R2VvZmVuY2VQcm9wc1wiO1xuXG5pbXBvcnQgXCIuL3VpL1NMTGVhZmxldEdlb2ZlbmNlLmNzc1wiO1xuaW1wb3J0IHsgSUdsb2JhbENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3R5cGVzL2NvbnRleHQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBJR2VvZmVuY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3R5cGVzL21hcC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7XG4gICAgdXBkYXRlR2VvZmVuY2UsXG4gICAgdXBkYXRlR2VvZmVuY2VBY3Rpb24sXG4gICAgdXBkYXRlR2VvZmVuY2VPcHRpb25zLFxuICAgIHVwZGF0ZUdlb2ZlbmNlT3V0QWN0aW9uLFxuICAgIHVwZGF0ZUdlb2ZlbmNlUG9zaXRpb25BY3Rpb25cbn0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC90eXBlcy9yZWR1Y2VyLmludGVyZmFjZVwiO1xuaW1wb3J0IEJpZyBmcm9tIFwiYmlnLmpzXCI7XG5cbmRlY2xhcmUgbGV0IG14OiBhbnk7XG5cbmNvbnN0IGNhblNldEF0dHJpYnV0ZVZhbHVlID0gKGF0dHJpYnV0ZVZhbHVlOiBFZGl0YWJsZVZhbHVlIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlICYmIGF0dHJpYnV0ZVZhbHVlLnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlO1xufTtcblxuY29uc3QgaXNEaWZmZXJlbnREYXRhID0gKGN1cnJlbnREYXRhOiBJR2VvZmVuY2VbXSwgbmV3RGF0YTogSUdlb2ZlbmNlW10pID0+IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY3VycmVudERhdGEpICE9PSBKU09OLnN0cmluZ2lmeShuZXdEYXRhKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBTTExlYWZsZXRHZW9mZW5jZShwcm9wczogU0xMZWFmbGV0R2VvZmVuY2VDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgeyBzdGF0ZSwgZGlzcGF0Y2ggfSA9IHVzZUNvbnRleHQ8SUdsb2JhbENvbnRleHQ+KG14LnNsbWFwLmNvbnRleHQpO1xuICAgIGNvbnN0IGRhdGFSZWYgPSB1c2VSZWY8SUdlb2ZlbmNlW10+KFtdKTtcbiAgICBjb25zdCBhY3Rpb25PdXQgPSB1c2VSZWY8QWN0aW9uVmFsdWU+KCk7XG4gICAgY29uc3QgYWN0aW9uT3V0SUQgPSB1c2VSZWY8RWRpdGFibGVWYWx1ZTxzdHJpbmcgfCBCaWc+PigpO1xuICAgIGNvbnN0IGFjdGlvbkluID0gdXNlUmVmPEFjdGlvblZhbHVlPigpO1xuICAgIGNvbnN0IGFjdGlvbkluSUQgPSB1c2VSZWY8RWRpdGFibGVWYWx1ZTxzdHJpbmcgfCBCaWc+PigpO1xuICAgIGNvbnN0IGFjdGlvbkluRGlzdGFuY2UgPSB1c2VSZWY8RWRpdGFibGVWYWx1ZTxCaWc+PigpO1xuXG4gICAgY29uc3QgZ2V0RGVmYXVsdFJhZGl1cyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb3BzLmRlZmF1bHRSYWRpdXMudmFsdWU/LnRvTnVtYmVyKCkgPz8gMzA7XG4gICAgfTtcblxuICAgIGNvbnN0IGxvYWRHZW9mZW5jZSA9IChpdGVtczogT2JqZWN0SXRlbVtdKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IEFycmF5PElHZW9mZW5jZSB8IHVuZGVmaW5lZD4gPSBpdGVtc1xuICAgICAgICAgICAgLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcHMuaWQuZ2V0KGl0ZW0pLnZhbHVlICYmIHByb3BzLmxhdGl0dWRlLmdldChpdGVtKS52YWx1ZSAmJiBwcm9wcy5sb25naXR1ZGUuZ2V0KGl0ZW0pLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogcHJvcHMuaWQuZ2V0KGl0ZW0pLnZhbHVlIS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHByb3BzLmxhdGl0dWRlLmdldChpdGVtKS52YWx1ZSEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQocHJvcHMubG9uZ2l0dWRlLmdldChpdGVtKS52YWx1ZSEpXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiBwcm9wcy5yYWRpdXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHByb3BzLnJhZGl1cy5nZXQoaXRlbSkudmFsdWU/LnRvTnVtYmVyKCkgPz8gZ2V0RGVmYXVsdFJhZGl1cygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBnZXREZWZhdWx0UmFkaXVzKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q29sb3I6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuZGVmYXVsdENvbG9yICYmIHByb3BzLmRlZmF1bHRDb2xvci5nZXQoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwcm9wcy5kZWZhdWx0Q29sb3IuZ2V0KGl0ZW0pLnZhbHVlID8/IFwiIzI2NGFlNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCIjMjY0YWU1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVDb2xvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5hY3RpdmVDb2xvciAmJiBwcm9wcy5hY3RpdmVDb2xvci5nZXQoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwcm9wcy5hY3RpdmVDb2xvci5nZXQoaXRlbSkudmFsdWUgPz8gXCIjM2NiMzNkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIiMzY2IzM2RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZU9wYWNpdHk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuc3Ryb2tlT3BhY2l0eSAmJiBwcm9wcy5zdHJva2VPcGFjaXR5LmdldChpdGVtKSA/IHByb3BzLnN0cm9rZU9wYWNpdHkuZ2V0KGl0ZW0pIDogMS4wLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLnN0cm9rZVdlaWdodCAmJiBwcm9wcy5zdHJva2VXZWlnaHQuZ2V0KGl0ZW0pID8gcHJvcHMuc3Ryb2tlV2VpZ2h0LmdldChpdGVtKSA6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsT3BhY2l0eTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5maWxsT3BhY2l0eSAmJiBwcm9wcy5maWxsT3BhY2l0eS5nZXQoaXRlbSkgPyBwcm9wcy5maWxsT3BhY2l0eS5nZXQoaXRlbSkgOiAxLjBcbiAgICAgICAgICAgICAgICAgICAgfSBhcyBJR2VvZmVuY2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcihpdCA9PiAhIWl0KTtcblxuICAgICAgICBpZiAoaXNEaWZmZXJlbnREYXRhKGRhdGEgYXMgSUdlb2ZlbmNlW10sIGRhdGFSZWYuY3VycmVudCkpIHtcbiAgICAgICAgICAgIGRhdGFSZWYuY3VycmVudCA9IGRhdGEgYXMgSUdlb2ZlbmNlW107XG4gICAgICAgICAgICBkaXNwYXRjaCh1cGRhdGVHZW9mZW5jZShbLi4uZGF0YV0gYXMgSUdlb2ZlbmNlW10pKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbkdlb2ZlbmNlID0gKGlkOiBzdHJpbmcsIG1ldGFkYXRhOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKGFjdGlvbkluLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmIChhY3Rpb25Jbi5jdXJyZW50LmNhbkV4ZWN1dGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FuU2V0QXR0cmlidXRlVmFsdWUoYWN0aW9uSW5JRC5jdXJyZW50KSAmJiBjYW5TZXRBdHRyaWJ1dGVWYWx1ZShhY3Rpb25JbkRpc3RhbmNlLmN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkluSUQuY3VycmVudCEuc2V0VmFsdWUoaWQpO1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb25JbkRpc3RhbmNlLmN1cnJlbnQhLnNldFZhbHVlKG5ldyBCaWcobWV0YWRhdGEudG9GaXhlZCgyKSkpO1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb25Jbi5jdXJyZW50LmV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDYW5ub3Qgc2V0IEdlb2ZlbmNlIElEIGFuZCBHZW9mZW5jZSBkaXN0YW5jZSBhdHRyaWJ1dGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDYW5ub3QgZXhlY3V0ZSBHZW9mZW5jZSBJTiBldmVudFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbkdlb2ZlbmNlT3V0ID0gKGlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKGFjdGlvbk91dC5jdXJyZW50KSB7XG4gICAgICAgICAgICBpZiAoYWN0aW9uT3V0LmN1cnJlbnQuY2FuRXhlY3V0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChjYW5TZXRBdHRyaWJ1dGVWYWx1ZShhY3Rpb25PdXRJRC5jdXJyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb25PdXRJRC5jdXJyZW50IS5zZXRWYWx1ZShpZCk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbk91dC5jdXJyZW50LmV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDYW5ub3Qgc2V0IEdlb2ZlbmNlIE91dCBJRCBhdHRyaWJ1dGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDYW5ub3QgZXhlY3V0ZSBHZW9mZW5jZSBPVVQgZXZlbnRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25HZW9mZW5jZVBvc2l0aW9uID0gKGxhdDogc3RyaW5nLCBsb25nOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgcHJvcHMub25HZW9mZW5jZUN1cnJlbnRQb3NpdGlvbkFjdGlvbiAmJlxuICAgICAgICAgICAgcHJvcHMub25HZW9mZW5jZUN1cnJlbnRQb3NpdGlvbkxhdGl0dWRlICYmXG4gICAgICAgICAgICBwcm9wcy5vbkdlb2ZlbmNlQ3VycmVudFBvc2l0aW9uTG9uZ2l0dWRlXG4gICAgICAgICkge1xuICAgICAgICAgICAgcHJvcHMub25HZW9mZW5jZUN1cnJlbnRQb3NpdGlvbkxhdGl0dWRlLnNldFZhbHVlKGxhdCk7XG4gICAgICAgICAgICBwcm9wcy5vbkdlb2ZlbmNlQ3VycmVudFBvc2l0aW9uTG9uZ2l0dWRlLnNldFZhbHVlKGxvbmcpO1xuICAgICAgICAgICAgcHJvcHMub25HZW9mZW5jZUN1cnJlbnRQb3NpdGlvbkFjdGlvbi5leGVjdXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHN0YXRlLm1hcFJlYWR5ICYmIHByb3BzLmRhdGEuaXRlbXMpIHtcbiAgICAgICAgICAgIGxvYWRHZW9mZW5jZShwcm9wcy5kYXRhLml0ZW1zKTtcbiAgICAgICAgfVxuICAgIH0sIFtwcm9wcy5kYXRhLml0ZW1zLCBzdGF0ZS5tYXBSZWFkeV0pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goXG4gICAgICAgICAgICB1cGRhdGVHZW9mZW5jZU9wdGlvbnMoe1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHByb3BzLmdlb2ZlbmNlRW5hYmxlZC52YWx1ZSA/PyB0cnVlLFxuICAgICAgICAgICAgICAgIHNldFZpZXc6IHByb3BzLmdlb2ZlbmNlU2V0Vmlld0VuYWJsZWQudmFsdWUgPz8gdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXhpbXVtQWdlOiBwcm9wcy5tYXhpbXVtQWdlLnZhbHVlPy50b051bWJlcigpID8/IDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSwgW3Byb3BzLm1heGltdW1BZ2UudmFsdWUsIHByb3BzLmdlb2ZlbmNlRW5hYmxlZC52YWx1ZSwgcHJvcHMuZ2VvZmVuY2VTZXRWaWV3RW5hYmxlZC52YWx1ZV0pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgYWN0aW9uSW4uY3VycmVudCA9IHByb3BzLm9uR2VvZmVuY2VBY3Rpb247XG4gICAgICAgIGFjdGlvbkluSUQuY3VycmVudCA9IHByb3BzLm9uR2VvZmVuY2VJZDtcbiAgICAgICAgYWN0aW9uSW5EaXN0YW5jZS5jdXJyZW50ID0gcHJvcHMub25HZW9mZW5jZURpc3RhbmNlO1xuICAgICAgICBhY3Rpb25PdXQuY3VycmVudCA9IHByb3BzLm9uR2VvZmVuY2VPdXRBY3Rpb247XG4gICAgICAgIGFjdGlvbk91dElELmN1cnJlbnQgPSBwcm9wcy5vbkdlb2ZlbmNlT3V0SWQ7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgcHJvcHMub25HZW9mZW5jZUFjdGlvbiAmJlxuICAgICAgICAgICAgcHJvcHMub25HZW9mZW5jZUlkICYmXG4gICAgICAgICAgICBwcm9wcy5vbkdlb2ZlbmNlQWN0aW9uLmNhbkV4ZWN1dGUgJiZcbiAgICAgICAgICAgICFzdGF0ZS5nZW9mZW5jZUFjdGlvblxuICAgICAgICApIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHVwZGF0ZUdlb2ZlbmNlQWN0aW9uKG9uR2VvZmVuY2UpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHByb3BzLm9uR2VvZmVuY2VPdXRBY3Rpb24gJiZcbiAgICAgICAgICAgIHByb3BzLm9uR2VvZmVuY2VPdXRJZCAmJlxuICAgICAgICAgICAgcHJvcHMub25HZW9mZW5jZU91dEFjdGlvbi5jYW5FeGVjdXRlICYmXG4gICAgICAgICAgICAhc3RhdGUuZ2VvZmVuY2VPdXRBY3Rpb25cbiAgICAgICAgKSB7XG4gICAgICAgICAgICBkaXNwYXRjaCh1cGRhdGVHZW9mZW5jZU91dEFjdGlvbihvbkdlb2ZlbmNlT3V0KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBwcm9wcy5vbkdlb2ZlbmNlQ3VycmVudFBvc2l0aW9uQWN0aW9uICYmXG4gICAgICAgICAgICBwcm9wcy5vbkdlb2ZlbmNlQ3VycmVudFBvc2l0aW9uTGF0aXR1ZGUgJiZcbiAgICAgICAgICAgIHByb3BzLm9uR2VvZmVuY2VDdXJyZW50UG9zaXRpb25Mb25naXR1ZGUgJiZcbiAgICAgICAgICAgIHByb3BzLm9uR2VvZmVuY2VDdXJyZW50UG9zaXRpb25BY3Rpb24uY2FuRXhlY3V0ZSAmJlxuICAgICAgICAgICAgIXN0YXRlLmdlb2ZlbmNlUG9zaXRpb25BY3Rpb25cbiAgICAgICAgKSB7XG4gICAgICAgICAgICBkaXNwYXRjaCh1cGRhdGVHZW9mZW5jZVBvc2l0aW9uQWN0aW9uKG9uR2VvZmVuY2VQb3NpdGlvbikpO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBwcm9wcy5vbkdlb2ZlbmNlQWN0aW9uLFxuICAgICAgICBwcm9wcy5vbkdlb2ZlbmNlSWQsXG4gICAgICAgIHByb3BzLm9uR2VvZmVuY2VPdXRBY3Rpb24sXG4gICAgICAgIHByb3BzLm9uR2VvZmVuY2VPdXRJZCxcbiAgICAgICAgcHJvcHMub25HZW9mZW5jZUN1cnJlbnRQb3NpdGlvbkFjdGlvbixcbiAgICAgICAgcHJvcHMub25HZW9mZW5jZUN1cnJlbnRQb3NpdGlvbkxhdGl0dWRlLFxuICAgICAgICBwcm9wcy5vbkdlb2ZlbmNlQ3VycmVudFBvc2l0aW9uTG9uZ2l0dWRlXG4gICAgXSk7XG5cbiAgICByZXR1cm4gPFJlYWN0LkZyYWdtZW50IC8+O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLElBQVksVUFhWDtBQWJELFdBQVksVUFBVTtJQUNsQix5REFBVyxDQUFBO0lBQ1gsdURBQVUsQ0FBQTtJQUNWLHVEQUFVLENBQUE7SUFDVix1REFBVSxDQUFBO0lBQ1YsbUVBQWdCLENBQUE7SUFDaEIseURBQVcsQ0FBQTtJQUNYLHFFQUFpQixDQUFBO0lBQ2pCLDJFQUFvQixDQUFBO0lBQ3BCLHFGQUF5QixDQUFBO0lBQ3pCLHVFQUFrQixDQUFBO0lBQ2xCLGtFQUFlLENBQUE7SUFDZiwwRUFBbUIsQ0FBQTtBQUN2QixDQUFDLEVBYlcsVUFBVSxLQUFWLFVBQVUsUUFhckI7U0FtR2UsY0FBYyxDQUFDLElBQWlCO0lBQzVDLE9BQU87UUFDSCxJQUFJLEVBQUUsVUFBVSxDQUFDLFdBQVc7UUFDNUIsT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDckIs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
import React, { ReactElement, createElement, useEffect, useContext, useRef } from "react";
import { ObjectItem, ActionValue, EditableValue, ValueStatus } from "mendix";

import { SLLeafletGeofenceContainerProps } from "../typings/SLLeafletGeofenceProps";

import "./ui/SLLeafletGeofence.css";
import { IGlobalContext } from "../../../shared/types/context.interface";
import { IGeofence } from "../../../shared/types/map.interface";
import {
    updateGeofence,
    updateGeofenceAction,
    updateGeofenceOptions,
    updateGeofenceOutAction,
    updateGeofencePositionAction
} from "../../../shared/types/reducer.interface";
import Big from "big.js";

declare let mx: any;

const canSetAttributeValue = (attributeValue: EditableValue | undefined) => {
    return attributeValue && attributeValue.status === ValueStatus.Available;
};

const isDifferentData = (currentData: IGeofence[], newData: IGeofence[]) => {
    return JSON.stringify(currentData) !== JSON.stringify(newData);
};

export function SLLeafletGeofence(props: SLLeafletGeofenceContainerProps): ReactElement {
    const { state, dispatch } = useContext<IGlobalContext>(mx.slmap.context);
    const dataRef = useRef<IGeofence[]>([]);
    const actionOut = useRef<ActionValue>();
    const actionOutID = useRef<EditableValue<string | Big>>();
    const actionIn = useRef<ActionValue>();
    const actionInID = useRef<EditableValue<string | Big>>();
    const actionInDistance = useRef<EditableValue<Big>>();

    const getDefaultRadius = () => {
        return props.defaultRadius.value?.toNumber() ?? 30;
    };

    const loadGeofence = (items: ObjectItem[]) => {
        const data: Array<IGeofence | undefined> = items
            .map(item => {
                if (props.id.get(item).value && props.latitude.get(item).value && props.longitude.get(item).value) {
                    return {
                        id: props.id.get(item).value!.toString(),
                        position: [
                            parseFloat(props.latitude.get(item).value!),
                            parseFloat(props.longitude.get(item).value!)
                        ],
                        radius: props.radius
                            ? props.radius.get(item).value?.toNumber() ?? getDefaultRadius()
                            : getDefaultRadius(),
                        defaultColor:
                            props.defaultColor && props.defaultColor.get(item)
                                ? props.defaultColor.get(item).value ?? "#264ae5"
                                : "#264ae5",
                        activeColor:
                            props.activeColor && props.activeColor.get(item)
                                ? props.activeColor.get(item).value ?? "#3cb33d"
                                : "#3cb33d",
                        strokeOpacity:
                            props.strokeOpacity && props.strokeOpacity.get(item) ? props.strokeOpacity.get(item) : 1.0,
                        strokeWeight:
                            props.strokeWeight && props.strokeWeight.get(item) ? props.strokeWeight.get(item) : 3,
                        fillOpacity:
                            props.fillOpacity && props.fillOpacity.get(item) ? props.fillOpacity.get(item) : 1.0
                    } as IGeofence;
                } else {
                    return undefined;
                }
            })
            .filter(it => !!it);

        if (isDifferentData(data as IGeofence[], dataRef.current)) {
            dataRef.current = data as IGeofence[];
            dispatch(updateGeofence([...data] as IGeofence[]));
        }
    };

    const onGeofence = (id: string, metadata: number) => {
        if (actionIn.current) {
            if (actionIn.current.canExecute) {
                if (canSetAttributeValue(actionInID.current) && canSetAttributeValue(actionInDistance.current)) {
                    actionInID.current!.setValue(id);
                    actionInDistance.current!.setValue(new Big(metadata.toFixed(2)));
                    actionIn.current.execute();
                } else {
                    console.warn("Cannot set Geofence ID and Geofence distance attribute");
                }
            } else {
                console.warn("Cannot execute Geofence IN event");
            }
        }
    };

    const onGeofenceOut = (id: string) => {
        if (actionOut.current) {
            if (actionOut.current.canExecute) {
                if (canSetAttributeValue(actionOutID.current)) {
                    actionOutID.current!.setValue(id);
                    actionOut.current.execute();
                } else {
                    console.warn("Cannot set Geofence Out ID attribute");
                }
            } else {
                console.warn("Cannot execute Geofence OUT event");
            }
        }
    };

    const onGeofencePosition = (lat: string, long: string) => {
        if (
            props.onGeofenceCurrentPositionAction &&
            props.onGeofenceCurrentPositionLatitude &&
            props.onGeofenceCurrentPositionLongitude
        ) {
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
        dispatch(
            updateGeofenceOptions({
                enabled: props.geofenceEnabled.value ?? true,
                setView: props.geofenceSetViewEnabled.value ?? true,
                maximumAge: props.maximumAge.value?.toNumber() ?? 0
            })
        );
    }, [props.maximumAge.value, props.geofenceEnabled.value, props.geofenceSetViewEnabled.value]);

    useEffect(() => {
        actionIn.current = props.onGeofenceAction;
        actionInID.current = props.onGeofenceId;
        actionInDistance.current = props.onGeofenceDistance;
        actionOut.current = props.onGeofenceOutAction;
        actionOutID.current = props.onGeofenceOutId;

        if (
            props.onGeofenceAction &&
            props.onGeofenceId &&
            props.onGeofenceAction.canExecute &&
            !state.geofenceAction
        ) {
            dispatch(updateGeofenceAction(onGeofence));
        }

        if (
            props.onGeofenceOutAction &&
            props.onGeofenceOutId &&
            props.onGeofenceOutAction.canExecute &&
            !state.geofenceOutAction
        ) {
            dispatch(updateGeofenceOutAction(onGeofenceOut));
        }

        if (
            props.onGeofenceCurrentPositionAction &&
            props.onGeofenceCurrentPositionLatitude &&
            props.onGeofenceCurrentPositionLongitude &&
            props.onGeofenceCurrentPositionAction.canExecute &&
            !state.geofencePositionAction
        ) {
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

    return <React.Fragment />;
}

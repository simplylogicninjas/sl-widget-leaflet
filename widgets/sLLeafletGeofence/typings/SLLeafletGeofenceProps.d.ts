/**
 * This file was generated from SLLeafletGeofence.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export interface SLLeafletGeofenceContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    geofenceEnabled: DynamicValue<boolean>;
    geofenceSetViewEnabled: DynamicValue<boolean>;
    defaultRadius: DynamicValue<Big>;
    maximumAge: DynamicValue<Big>;
    data: ListValue;
    id: ListAttributeValue<Big | string>;
    latitude: ListAttributeValue<string>;
    longitude: ListAttributeValue<string>;
    radius?: ListAttributeValue<Big>;
    defaultColor: ListExpressionValue<string>;
    activeColor: ListExpressionValue<string>;
    strokeOpacity: ListExpressionValue<Big>;
    strokeWeight: ListExpressionValue<Big>;
    fillOpacity: ListExpressionValue<Big>;
    onGeofenceAction?: ActionValue;
    onGeofenceId?: EditableValue<Big | string>;
    onGeofenceDistance?: EditableValue<Big>;
    onGeofenceOutAction?: ActionValue;
    onGeofenceOutId?: EditableValue<Big | string>;
    onGeofenceCurrentPositionAction?: ActionValue;
    onGeofenceCurrentPositionLatitude?: EditableValue<string>;
    onGeofenceCurrentPositionLongitude?: EditableValue<string>;
}

export interface SLLeafletGeofencePreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    geofenceEnabled: string;
    geofenceSetViewEnabled: string;
    defaultRadius: string;
    maximumAge: string;
    data: {} | { type: string } | null;
    id: string;
    latitude: string;
    longitude: string;
    radius: string;
    defaultColor: string;
    activeColor: string;
    strokeOpacity: string;
    strokeWeight: string;
    fillOpacity: string;
    onGeofenceAction: {} | null;
    onGeofenceId: string;
    onGeofenceDistance: string;
    onGeofenceOutAction: {} | null;
    onGeofenceOutId: string;
    onGeofenceCurrentPositionAction: {} | null;
    onGeofenceCurrentPositionLatitude: string;
    onGeofenceCurrentPositionLongitude: string;
}

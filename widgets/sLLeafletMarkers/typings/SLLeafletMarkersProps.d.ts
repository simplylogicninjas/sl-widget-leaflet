/**
 * This file was generated from SLLeafletMarkers.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue, ListExpressionValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export interface SLLeafletMarkersContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    data: ListValue;
    id: ListAttributeValue<Big | string>;
    latitude: ListAttributeValue<string>;
    longitude: ListAttributeValue<string>;
    draggable: ListExpressionValue<boolean>;
    content?: ListWidgetValue;
    popupContent?: ListWidgetValue;
    onMarkerClickAction?: ActionValue;
    onMarkerID?: EditableValue<string>;
    onMarkerDragAction?: ActionValue;
    onMarkerMoveID?: EditableValue<string>;
    onMarkerMoveLatitude?: EditableValue<string>;
    onMarkerMoveLongitude?: EditableValue<string>;
}

export interface SLLeafletMarkersPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    data: {} | { type: string } | null;
    id: string;
    latitude: string;
    longitude: string;
    draggable: string;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    popupContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    onMarkerClickAction: {} | null;
    onMarkerID: string;
    onMarkerDragAction: {} | null;
    onMarkerMoveID: string;
    onMarkerMoveLatitude: string;
    onMarkerMoveLongitude: string;
}

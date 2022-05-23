/**
 * This file was generated from SLLeafletMap.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export type PositionModeEnum = "geoPosition" | "manual" | "marker" | "geojson";

export interface SLLeafletMapContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    baseMapUrl: DynamicValue<string>;
    baseMapAttribution?: DynamicValue<string>;
    additionalMaps?: ListValue;
    additionalMapUrl?: ListExpressionValue<string>;
    additionalMapAttribution?: ListExpressionValue<string>;
    positionMode: PositionModeEnum;
    positionZoom?: DynamicValue<Big>;
    positionLatitude?: EditableValue<string>;
    positionLongitude?: EditableValue<string>;
    defaultLatitude: string;
    defaultLongitude: string;
    defaultZoom: number;
    onMapClickAction?: ActionValue;
    onMapClickContent?: ReactNode;
    onMapClickLatitude?: EditableValue<string>;
    onMapClickLongitude?: EditableValue<string>;
}

export interface SLLeafletMapPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    baseMapUrl: string;
    baseMapAttribution: string;
    additionalMaps: {} | { type: string } | null;
    additionalMapUrl: string;
    additionalMapAttribution: string;
    positionMode: PositionModeEnum;
    positionZoom: string;
    positionLatitude: string;
    positionLongitude: string;
    defaultLatitude: string;
    defaultLongitude: string;
    defaultZoom: number | null;
    onMapClickAction: {} | null;
    onMapClickContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    onMapClickLatitude: string;
    onMapClickLongitude: string;
}

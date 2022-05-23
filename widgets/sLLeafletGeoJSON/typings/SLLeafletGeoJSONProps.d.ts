/**
 * This file was generated from SLLeafletGeoJSON.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export interface SLLeafletGeoJSONContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    data: ListValue;
    geoJSON: ListAttributeValue<string>;
    onFeatureClickAction?: ActionValue;
    onFeatureId?: EditableValue<string>;
}

export interface SLLeafletGeoJSONPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    data: {} | { type: string } | null;
    geoJSON: string;
    onFeatureClickAction: {} | null;
    onFeatureId: string;
}

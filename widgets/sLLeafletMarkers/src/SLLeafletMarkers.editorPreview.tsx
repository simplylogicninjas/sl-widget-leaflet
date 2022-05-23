import { ReactElement, createElement } from "react";
import { SLLeafletMarkersPreviewProps } from "../typings/SLLeafletMarkersProps";

export function preview(_: SLLeafletMarkersPreviewProps): ReactElement {
    return <div />;
}

export function getPreviewCss(): string {
    return require("./ui/SLLeafletMarkers.css");
}

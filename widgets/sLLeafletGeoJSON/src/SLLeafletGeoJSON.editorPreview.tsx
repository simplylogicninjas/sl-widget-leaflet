import React, { ReactElement, createElement } from "react";

export function preview(): ReactElement {
    return <React.Fragment />;
}

export function getPreviewCss(): string {
    return require("./ui/SLLeafletGeoJSON.css");
}

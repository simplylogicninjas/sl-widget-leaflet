import { createElement } from "react";
import { GeoJSON } from "react-leaflet";
import * as geojson from "geojson";
import { Layer } from "leaflet";
import { IdentifierAction } from "../../../../shared/types/map.interface";

const LeafletGeoJSON = ({ data, geoJSONAction }: { data: any; geoJSONAction?: IdentifierAction }) => {
    const onLayerClick = (featureId: string | number) => {
        if (geoJSONAction) {
            geoJSONAction(featureId.toString());
        }
    };

    const onEachFeature = (feature: geojson.Feature, layer: Layer) => {
        layer.on({
            click: () => {
                if (feature.id) {
                    onLayerClick(feature.id);
                }
            }
        });
    };

    return <GeoJSON data={data} onEachFeature={onEachFeature} />;
};

export default LeafletGeoJSON;

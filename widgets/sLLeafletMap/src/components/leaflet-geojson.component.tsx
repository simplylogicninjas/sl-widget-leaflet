import { createElement } from "react";
import { GeoJSON } from "react-leaflet";
import * as geojson from "geojson";
import L, { Layer, LatLng } from "leaflet";
import { IdentifierAction } from "../../../../shared/types/map.interface";
import objectHash from "object-hash";

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

    const pointToLayer = (_: geojson.Feature<geojson.Point, any>, latlng: LatLng) => {
        return L.marker(
            latlng,
            {
                icon: L.icon({
                    iconUrl: "/widgets/sl/slleafletmap/assets/images/marker-icon.png",
                    iconRetinaUrl: "/widgets/sl/slleafletmap/assets/images/marker-icon-2x.png",
                    shadowUrl: "/widgets/sl/slleafletmap/assets/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12.5, 41]
                })
            }
        )
    }

    return <GeoJSON key={objectHash(data)} pointToLayer={pointToLayer} data={{...data}} onEachFeature={onEachFeature} />;
};

export default LeafletGeoJSON;

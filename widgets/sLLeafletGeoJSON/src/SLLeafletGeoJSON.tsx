import React, { ReactElement, createElement, useContext, useRef, useEffect } from "react";
import { ObjectItem } from "mendix";
import { IGlobalContext } from "../../../shared/types/context.interface";

import { SLLeafletGeoJSONContainerProps } from "../typings/SLLeafletGeoJSONProps";

import "./ui/SLLeafletGeoJSON.css";
import { updateGeoJSON, updateGeoJSONAction } from "../../../shared/types/reducer.interface";

declare let mx: any;

const isDifferentData = (currentData: ObjectItem[], newData: ObjectItem[]) => {
    return JSON.stringify(currentData) !== JSON.stringify(newData);
}

export function SLLeafletGeoJSON(props: SLLeafletGeoJSONContainerProps): ReactElement {
    const {state, dispatch} = useContext<IGlobalContext>(mx.slmap.context);
    const dataRef = useRef<ObjectItem[]>([]);

    const loadGeoJSON = (items: ObjectItem[]) => {
        dataRef.current = [...items];
        
        const data = items.map(item => {
            const geoJSON = props.geoJSON.get(item);

            if (!!geoJSON.value) {
                return JSON.parse(geoJSON.value);
            } else {
                return null
            }
        }).filter(it => !!it)

        dispatch(updateGeoJSON(data));
    }

    const onFeatureClick = (id: string) => {
        if (props.onFeatureClickAction && props.onFeatureId) {
            props.onFeatureId.setValue(id);
            props.onFeatureClickAction.execute();
        }
    }

    useEffect(() => {
        if (state.mapReady && props.data.items && isDifferentData(dataRef.current, props.data.items)) {
            loadGeoJSON(props.data.items);
        }
    }, [
        props.data.items
    ])

    useEffect(() => {
        if (props.onFeatureClickAction && props.onFeatureId) {
            dispatch(
                updateGeoJSONAction(onFeatureClick)
            )
        }
    }, [
        props.onFeatureClickAction,
        props.onFeatureId
    ]);
    
    return <React.Fragment />;
}

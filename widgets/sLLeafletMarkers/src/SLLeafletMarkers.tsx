import React, { ReactElement, createElement, useContext, useEffect, useRef } from "react";
import { ObjectItem } from "mendix";
import { IGlobalContext } from "../../../shared/types/context.interface";
import { IMarker } from "../../../shared/types/map.interface";
import { updateMarkerAction, updateMarkerDragAction, updateMarkers } from "../../../shared/types/reducer.interface";

import { SLLeafletMarkersContainerProps } from "../typings/SLLeafletMarkersProps";

import "./ui/SLLeafletMarkers.css";

declare let mx: any;

const isDifferentData = (currentData: IMarker[], newData: IMarker[]) => {
    return JSON.stringify(currentData) !== JSON.stringify(newData);
};

export function SLLeafletMarkers(props: SLLeafletMarkersContainerProps): ReactElement {
    const { state, dispatch } = useContext<IGlobalContext>(mx.slmap.context);
    const dataRef = useRef<IMarker[]>([]);

    const initMarkers = (items: ObjectItem[]) => {
        const data: Array<IMarker | undefined> = items
            .map(it => {
                if (props.id.get(it).value && props.latitude.get(it).value && props.longitude.get(it).value) {
                    const content = props.content?.get(it);
                    const popupContent = props.popupContent?.get(it);
                    const id = props.id.get(it).value!.toString();
                    const lat = props.latitude.get(it).value!;
                    const long = props.longitude.get(it).value!;
                    const draggable = props.draggable.get(it).value;

                    return {
                        content,
                        popupContent,
                        id,
                        draggable: !!draggable,
                        position: [parseFloat(lat), parseFloat(long)]
                    };
                } else {
                    return undefined;
                }
            })
            .filter(it => !!it);

        if (isDifferentData(data as IMarker[], dataRef.current)) {
            dataRef.current = data as IMarker[];
            dispatch(updateMarkers([...data] as IMarker[]));
        }
    };

    const onMarkerClick = (id: string) => {
        if (props.onMarkerClickAction && props.onMarkerID) {
            props.onMarkerID.setValue(id);
            props.onMarkerClickAction.execute();
        }
    };

    const onMarkerDrag = (lat: string, long: string, id: string) => {
        if (
            props.onMarkerDragAction &&
            props.onMarkerMoveID &&
            props.onMarkerMoveLatitude &&
            props.onMarkerMoveLongitude
        ) {
            props.onMarkerMoveID.setValue(id);
            props.onMarkerMoveLatitude.setValue(lat);
            props.onMarkerMoveLongitude.setValue(long);
            props.onMarkerDragAction.execute();
        }
    };

    useEffect(() => {
        if (state.mapReady && props.data.items) {
            initMarkers(props.data.items);
        }
    }, [props.data.items, state.mapReady]);

    useEffect(() => {
        if (props.onMarkerClickAction && props.onMarkerID) {
            dispatch(updateMarkerAction(onMarkerClick));
        }

        if (
            props.onMarkerDragAction &&
            props.onMarkerMoveID &&
            props.onMarkerMoveLatitude &&
            props.onMarkerMoveLongitude
        ) {
            dispatch(updateMarkerDragAction(onMarkerDrag));
        }
    }, [
        props.onMarkerClickAction,
        props.onMarkerID,
        props.onMarkerDragAction,
        props.onMarkerMoveID,
        props.onMarkerMoveLatitude,
        props.onMarkerMoveLongitude
    ]);

    return <React.Fragment />;
}

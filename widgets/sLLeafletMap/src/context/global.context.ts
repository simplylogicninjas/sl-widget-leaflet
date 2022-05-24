import { createContext } from "react";
import { IGlobalContext } from "../../../../shared/types/context.interface";

declare let mx: any;

export const initialGlobalContextState = {
    mapReady: false,
    mapName: "",
    markers: [],
    geoJSON: [],
    geofence: [],
    geofenceOptions: {
        enabled: false,
        setView: false,
        maximumAge: 0
    }
};

const GlobalContext = createContext<IGlobalContext>({
    state: initialGlobalContextState,
    dispatch: () => undefined
});

export const initGlobalContext = () => {
    mx.slmap = {};
    mx.slmap.context = GlobalContext;
};

export default GlobalContext;

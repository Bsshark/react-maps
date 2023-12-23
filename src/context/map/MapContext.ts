import MapLibreGlDirections from "@maplibre/maplibre-gl-directions";
import { Map } from "maplibre-gl";
import { createContext } from "react";

interface MapContextProps {
    isMapReady: boolean,
    map?: Map,
    directions?: [number, number],
    directionsObject?: MapLibreGlDirections,

    //Methods
    setMap: (map: Map) => void,
    setMapDirections: (directions: MapLibreGlDirections) => void,
    getRoutesBetweenPoints: (start: [number, number], end: [number, number]) => void
}

export const MapContext = createContext({} as MapContextProps);
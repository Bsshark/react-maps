import { Map, Marker } from "maplibre-gl";
import { MapState } from "./MapProvider";
import MapLibreGlDirections from "@maplibre/maplibre-gl-directions";

type MapAction =
	| { type: "setMap"; payload: Map }
	| { type: "setMarkers"; payload: Marker[] }
	| { type: "setMapGlDirections"; payload: MapLibreGlDirections};

export const mapReducer = (state: MapState, action: MapAction): MapState => {
	switch (action.type) {
		case "setMap":
			return {
				...state,
				isMapReady: true,
				map: action.payload,
			};
		case "setMarkers":
			return {
				...state,
				markers: action.payload,
			};
		case "setMapGlDirections":
			return {
				...state,
				directionsObject: action.payload,
			};
		default:
			return state;
	}
};

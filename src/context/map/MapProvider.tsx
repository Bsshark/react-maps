import { Map, Marker, Popup } from "maplibre-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { useContext, useEffect, useReducer } from "react";
import { PlacesContext } from "../places/PlacesContext";
import MapLibreGlDirections from "@maplibre/maplibre-gl-directions";

export interface MapState {
	isMapReady: boolean;
	map?: Map;
	markers: Marker[];
	directions?: [number, number];
	directionsObject?: MapLibreGlDirections;
}

interface Props {
	children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
	isMapReady: false,
	map: undefined,
	markers: [],
	directions: undefined,
};

export const MapProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
	const { places } = useContext(PlacesContext);

	useEffect(() => {
		state.markers.forEach((marker) => marker.remove());
		const newMarkers: Marker[] = [];

		for (const place of places) {
			const [lng, lat] = place.geometry.coordinates;
			const popup = new Popup()
				.setHTML(`<h6>${place.properties.display_name}</h6>
				<p>${place.properties.name}</p>`);
			const newMarker = new Marker()
				.setPopup(popup)
				.setLngLat([lng, lat])
				.addTo(state.map!);
			newMarkers.push(newMarker);
		}

		//TODO: Limpiar polyline
		dispatch({ type: "setMarkers", payload: newMarkers });
	}, [places]);

	const setMap = (map: Map) => {
		const myLocationPopup = new Popup().setHTML(
			`<h4>Aqui estoy</h4><p>En algun lugar del mundo</p>`
		);

		new Marker({
			color: "#61DAFB",
		})
			.setLngLat(map.getCenter())
			.setPopup(myLocationPopup)
			.addTo(map);

		dispatch({ type: "setMap", payload: map });
	};

	const setMapDirections = (directions: MapLibreGlDirections) => {
		dispatch({type: "setMapGlDirections", payload: directions});
	}

	const getRoutesBetweenPoints = (
		start: [number, number],
		end: [number, number]
	) => {
		console.log(start, end)
		//directions.removeWaypoint(0);
	};

	return (
		<MapContext.Provider
			value={{
				...state,
				

				//Methods
				setMap,
				setMapDirections,
				getRoutesBetweenPoints,
			}}
		>
			{children}
		</MapContext.Provider>
	);
};

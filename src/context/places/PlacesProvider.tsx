import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers";
import { Feature, PlacesResponse } from "../../interfaces/places";

export interface PlacesState {
	isLoading: boolean;
	userLocation?: [number, number];
	isLoadingPlaces: boolean;
	places: Feature[];
}

const INITIAL_STATE: PlacesState = {
	isLoading: true,
	userLocation: undefined,
	isLoadingPlaces: false,
	places: [],
};

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

	useEffect(() => {
		getUserLocation().then((lngLat) => {
			console.log(lngLat);
			dispatch({ type: "setUserLocation", payload: lngLat });
		});
	}, []);

	const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
		if (query.length === 0) {
			dispatch({ type: "setPlaces", payload: [] });
			return [];
		}
		if (!state.userLocation) throw new Error("No hay ubicacion disponible");

		dispatch({ type: "setLoadingPlaces" }); //Iniciamos la carga

		console.log(state.userLocation.reverse().join(","));
		const xLocation = state.userLocation[0];
		const yLocation = state.userLocation[1];

		/* const params = new URLSearchParams();
		params.append("x1", (xLocation - 1).toString());
		params.append("x2", (xLocation + 1).toString());
		params.append("y1", (yLocation - 1).toString());
		params.append("y2", (yLocation + 1).toString()); */
		console.log(
			"x1: " +
				(xLocation - 0.5).toString() +
				"," +
				"x2: " +
				(xLocation + 0.5).toString() +
				"," +
				"y1: " +
				(yLocation - 0.5).toString() +
				"," +
				"y2: " +
				(yLocation + 0.5).toString()
		);

		const resp = await searchApi.get<PlacesResponse>(`/search`, {
			params: {
				q: query,
				viewbox:
					(xLocation - 3).toString() +
					"," +
					(xLocation + 3).toString() +
					"," +
					(yLocation - 3).toString() +
					"," +
					(yLocation + 3).toString(),
				bounded: 1,
			},
		});
		console.log(resp);

		dispatch({ type: "setPlaces", payload: resp.data.features });

		return resp.data.features;
	};

	return (
		<PlacesContext.Provider
			value={{
				...state,
				//Methods
				searchPlacesByTerm,
			}}
		>
			{children}
		</PlacesContext.Provider>
	);
};

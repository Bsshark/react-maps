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
		getUserLocation().then((lngLat) =>
			dispatch({ type: "setUserLocation", payload: lngLat })
		);
	}, []);

	const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
		if (query.length === 0) return []; //Limpiar state
		if (!state.userLocation) throw new Error("No hay ubicacion disponible");

		dispatch({ type: "setLoadingPlaces" }); //Iniciamos la carga

		console.log(state.userLocation.reverse().join(","))
		
		const resp = await searchApi.get<PlacesResponse>(`/search`, {
			params: {
				q: query + ' ' + state.userLocation.reverse().join(","),
			},
		});
		console.log(resp)

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

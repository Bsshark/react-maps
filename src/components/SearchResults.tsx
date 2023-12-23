import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { LoadingPlaces } from "./";
import { Feature } from "../interfaces/places";
import MapLibreGlDirections from "@maplibre/maplibre-gl-directions";

export const SearchResults = () => {
	const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
	const { map, getRoutesBetweenPoints, directionsObject } =
		useContext(MapContext);

	const [activeId, setActiveId] = useState("");

	const onPlaceClicked = (place: Feature) => {
		const [lng, lat] = place.geometry.coordinates;
		setActiveId(place.properties.place_id + "");

		map?.flyTo({
			zoom: 14,
			center: [lng, lat],
		});
	};

	const getRoute = (place: Feature) => {
		if (!userLocation && map) return;

		directionsObject?.removeWaypoint(0);
		directionsObject?.clear();

		
		const [lng, lat] = place.geometry.coordinates;

		console.log(`userLocation: ${userLocation} - destino: ${[lat, lng]}`);
		directionsObject?.setWaypoints([[userLocation![1], userLocation![0]], [lng, lat]]);
	};

	if (isLoadingPlaces) {
		return <LoadingPlaces />;
	}

	if (places.length === 0) {
		return <></>;
	}

	return (
		<ul className="list-group mt-3">
			{places.map((place) => (
				<li
					key={place.properties.place_id}
					className={`list-group-item list-group-item-action pointer ${
						activeId === place.properties.place_id + "" ? "active" : ""
					}`}
					onClick={() => onPlaceClicked(place)}
				>
					<h6>{place.properties.name}</h6>
					<p
						style={{
							fontSize: "12px",
						}}
					>
						{place.properties.display_name}
					</p>
					<button
						className={`btn btn-sm ${
							activeId === place.properties.place_id + ""
								? "btn-outline-light"
								: "btn-outline-primary"
						}`}
						onClick={() => getRoute(place)}
					>
						Direcciones
					</button>
				</li>
			))}
		</ul>
	);
};

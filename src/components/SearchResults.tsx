import { useContext } from "react";
import { PlacesContext } from "../context";

export const SearchResults = () => {
	const { places, isLoadingPlaces } = useContext(PlacesContext);

	if (isLoadingPlaces) {
		return (
			<div className="alert alert-primary">
				<h6>Buscando</h6>
				<p>Espere porfavor</p>
			</div>
		);
	}

	return (
		<ul className="list-group mt-3">
			{places.map((place) => (
				<li
					key={place.properties.place_id}
					className="list-group-item list-group-item-action"
				>
					<h6>{place.properties.name}</h6>
					<p
						className="text-muted"
						style={{
							fontSize: "12px",
						}}
					>
						{place.properties.display_name}
					</p>
					<button className="btn btn-sm btn-outline-primary">
						Direcciones
					</button>
				</li>
			))}
		</ul>
	);
};

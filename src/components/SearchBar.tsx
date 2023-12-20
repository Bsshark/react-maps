import { ChangeEvent, useContext, useRef } from "react";
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
	const debounceRef = useRef<NodeJS.Timeout>();

	const { searchPlacesByTerm } = useContext(PlacesContext);

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			//todo: buscar
			console.log(e.target.value)
			searchPlacesByTerm(e.target.value);
		}, 1000);
	};

	return (
		<div className="search-container">
			<input
				type="text"
				className="form-control"
				placeholder="Buscar..."
				onChange={onSearchChange}
			/>
			<SearchResults />
		</div>
	);
};

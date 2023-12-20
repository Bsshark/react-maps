import { ChangeEvent, useRef } from "react";

export const SearchBar = () => {
	const debounceRef = useRef<NodeJS.Timeout>();

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            //todo: buscar
            console.log('debounce value:', e.target.value)
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
		</div>
	);
};

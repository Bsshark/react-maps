import { useContext, useLayoutEffect, useRef } from "react";
import { PlacesContext, MapContext } from "../context";
import { Loading } from "./";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import MapLibreGL from "maplibre-gl";



export const MapView = () => {
	const { userLocation, isLoading } = useContext(PlacesContext);
	const { setMap, isMapReady, map } = useContext(MapContext)
	const mapDiv = useRef<HTMLDivElement>(null);

	maptilersdk.config.apiKey = 'YAsqKYCi3MuCk0PDbU0Q';

	useLayoutEffect(() => {
		if (!isLoading) {
			let map = new MapLibreGL.Map({
				container: mapDiv.current!, // container id
				style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=YAsqKYCi3MuCk0PDbU0Q', // style URL
				center: userLocation, // starting position [lng, lat]
				zoom: 14 // starting zoom
			});
			setMap(map);
		}
	}, [isLoading]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div
			ref={mapDiv}
			style={{
				backgroundColor: "red",
				height: "100vh",
				width: "100vw",
				position: "fixed",
				top: 0,
				left: 0,
			}}
		>
		</div>
	);
};

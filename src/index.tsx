import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MapsApp } from './MapsApp';
import MapLibreGL from 'maplibre-gl';

if (!navigator.geolocation) {
	alert("Tu navegador no permite opción de Geolocalización");
	throw new Error("Tu navegador no permite opción de Geolocalización");
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp/>
  </React.StrictMode>
);
import React from "react";
import mapboxgl from "mapbox-gl";

async function changeLocationAndZoom(longitud, latitud, zoomLevel, map) {
  await new Promise(resolve => {
    map.panTo([longitud, latitud]);
    map.once('moveend', () => { // Espera a que el mapa termine de hacer el pan
      resolve();
    });
  });

  map.zoomTo(zoomLevel); // Zoom al nuevo nivel después del pan
}

export default function Button({ locales, map }) {
  return (
    <div>
      {locales && locales.map((local, index) => (
        <>
              
            <button key={index} style={{margin: '2px'}} onClick={() => changeLocationAndZoom(local.longitud, local.latitud, 17, map)}>
            {local.nombre_local}
            </button>
            <br/>
        </>
      ))}
    </div>
  );
}

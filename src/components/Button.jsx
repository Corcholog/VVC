import React from "react";
import mapboxgl from "mapbox-gl";
import {changeLocationAndZoom} from "./scripts";

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

import React from "react";
import {changeLocationAndZoom} from "./scripts";

export default function Button({ locales, map }) {
  console.log(locales);
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

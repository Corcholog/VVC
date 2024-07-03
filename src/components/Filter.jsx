import React from "react";
import { changeLocationAndZoom } from "./scripts";

export default function Filter({ filters, onFilterChange, map }) {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onFilterChange(name, checked);
  };

  const handleCiudadChange = (e) => {
    let necochea = {
      nombre: "necochea",
      latitud: -38.555791266997865,
      longitud: -58.73923929243851,
    };
    let mardel = {
      nombre: "mar del plata",
      latitud: -38.00676696438053,
      longitud: -57.54544582679459,
    };
    let tandil = {
      nombre: "tandil",
      latitud: -37.32100277545416,
      longitud: -59.1348577718957,
    };

    const ciudad = e.target.value;
    if (ciudad == "necochea") {
      changeLocationAndZoom(necochea.longitud, necochea.latitud, 13, map);
    } else if (ciudad == "mar del plata") {
      changeLocationAndZoom(mardel.longitud, mardel.latitud, 13, map);
    } else if (ciudad == "tandil") {
      changeLocationAndZoom(tandil.longitud, tandil.latitud, 13, map);
    }
    onFilterChange("ciudad", ciudad);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="vegetariano"
          checked={filters.vegetariano}
          onChange={handleCheckboxChange}
        />
        Vegetariano
      </label>
      <label>
        <input
          type="checkbox"
          name="vegano"
          checked={filters.vegano}
          onChange={handleCheckboxChange}
        />
        Vegano
      </label>
      <label>
        <input
          type="checkbox"
          name="celiaco"
          checked={filters.celiaco}
          onChange={handleCheckboxChange}
        />
        Celíaco
      </label>
      <label>
        <input
          type="checkbox"
          name="rating"
          checked={filters.rating}
          onChange={handleCheckboxChange}
        />
        Rating
      </label>
      <label>
        Ciudad:
        <select value={filters.ciudad} onChange={handleCiudadChange}>
          <option value="">Seleccione una ciudad...</option>
          <option value="tandil">Tandil</option>
          <option value="mar del plata">Mar del Plata</option>
          <option value="necochea">Necochea</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </label>
    </div>
  );
}

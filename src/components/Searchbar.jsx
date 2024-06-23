import React from "react";

export default function Searchbar() {
  return (
    <div>
      <h3 style={{ textAlign: "center", width: "70%" }}>Buscar producto</h3>
      <form id="searchForm" autoComplete="off">
        <input
          type="text"
          id="query"
          name="query"
          placeholder="Ingrese el nombre del producto"
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

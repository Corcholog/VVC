import React, { useState, useEffect } from "react";
import Button from "./Button";
import ProductItem from "./ProductItem";

function ProdList({ data, map }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  let localesMap = new Map();
  let uniqueProducts = {};

  // Crear un mapa de productos únicos
  data.forEach((prod) => {
    if (!uniqueProducts.hasOwnProperty(prod.id_p)) {
      uniqueProducts[prod.id_p] = {
        id: prod.id_p,
        nickname: prod.nickname,
        precio: prod.precio,
        foto: prod.foto,
        promedio: prod.promedio,
      };
    }
  });

  // Iterar sobre los productos para agregar locales al mapa
  data.forEach((prod) => {
    if (!localesMap.has(prod.id_p)) {
      localesMap.set(prod.id_p, []);
    }

    localesMap.get(prod.id_p).push({
      id: prod.id_local,
      nombre_local: prod.nombre_local,
      longitud: prod.longitud,
      latitud: prod.latitud,
      red_social: prod.red_social,
      promedio: prod.local_promedio,
      local_direccion: prod.local_direccion,
    });
    console.log(localesMap.get(prod.id_p));
  });

  // Convertir el objeto de productos únicos en un array para mapearlo
  const uniqueProductsArray = Object.values(uniqueProducts);
  console.log(uniqueProductsArray);

  return (
    <ul id="lista_prod">
      {uniqueProductsArray.map((producto, indice) => (
        <ProductItem
          key={indice}
          producto={producto}
          map={map}
          isAuthenticated={isAuthenticated}
          locales={localesMap.get(producto.id)} // Pasar localesMap al ProductItem
        />
      ))}
    </ul>
  );
}

export default ProdList;

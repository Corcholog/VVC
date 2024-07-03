import React, { useState } from "react";
import Products from "./Products"; // Importa el componente Products
import { getProducts } from "./scripts"; // Importa la función para obtener productos
import Filter from "./Filter";
import mapboxgl from 'mapbox-gl';

function createMarker(long, lat, map) {
  return new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
}

function add_markers(locales, map) {
  let markers = [];

  locales.forEach((l) => {
    let marker = createMarker(l.longitud, l.latitud, map);
    marker.setPopup(
      new mapboxgl.Popup().setHTML(
        "<h3>" +
        l.nombre_local +
        "!</h3>" +
        "<h4>" +
        l.local_direccion +
        "</h4>"
      )
    );
    markers.push(marker);
  });

  return markers;
}

export default function Searchbar({ map }) {
  const [query, setQuery] = useState(""); // Estado para el nombre del producto buscado
  const [productos, setProductos] = useState([]); // Estado para los productos encontrados
  const [showProducts, setShowProducts] = useState(false); // Estado para controlar si mostrar el componente Products
  const [filters, setFilters] = useState({  // Estado para los filtros
    vegetariano: false,
    vegano: false,
    celiaco: false,
    rating: false,
    ciudad: "", // Estado para la ciudad seleccionada
  });
  const markersRef = React.useRef([]); // Referencia a los marcadores actuales

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
        // Eliminar marcadores actuales
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];
      if (query !== "") {
        const data = await getProducts(query, filters.vegetariano, filters.vegano, filters.celiaco, filters.rating, filters.ciudad);
        console.log(data);
        setProductos(data); // Actualiza el estado con los productos obtenidos
        setShowProducts(true); // Muestra el componente Products después de enviar el formulario

        // Obtener productos y añadir marcadores
        let locales = [];
        data.forEach(prod => {
          const no_esta = !locales.some(local => local.latitud === prod.latitud && local.longitud === prod.longitud);
          if (no_esta) {
            locales.push({
              id: prod.id_local,
              nombre_local: prod.nombre_local,
              longitud: prod.longitud,
              latitud: prod.latitud,
              red_social: prod.red_social,
              promedio: prod.local_promedio,
              local_direccion: prod.local_direccion
            });
          }
        });

        markersRef.current = add_markers(locales, map);
      } else {
        setProductos([]);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setProductos([]); // Limpia el estado de productos en caso de error
      setShowProducts(false); // Oculta el componente Products en caso de error
    }
  };

  // Función para manejar cambios en los filtros desde Filter.jsx
  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div>
      
      <form id="searchForm" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          id="query"
          name="query"
          placeholder="Ingrese el nombre del producto"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <Filter filters={filters} onFilterChange={handleFilterChange} map={map}/> {/* Renderiza el componente Filter y pasa los filtros y la función de cambio de filtro */}
      {showProducts && <Products producto={productos} map={map}/>} {/* Renderiza el componente Products solo si showProducts es true */}
    </div>
  );
}

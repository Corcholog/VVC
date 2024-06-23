import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Nav from '../components/Nav';
import Searchbar from '../components/Searchbar';
import Products from '../components/Products';

function MapaComponent() {
  const [map, setMap] = useState(null); // Estado para almacenar el mapa

  useEffect(() => {
    // Configuración inicial del mapa
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29ya2xvZyIsImEiOiJjbHhxY2hrYTYwenRtMmtvZThlZXQ5anpiIn0.kHrU6lbo-ik_Tx7F4WAv-Q';
    const initializedMap = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-59.1348577718957, -37.32100277545416], // starting position [lng, lat], 
      zoom: 13, // starting zoom
    });

    setMap(initializedMap); // Guardar el mapa en el estado local

    // Limpieza al desmontar el componente
    return () => {
      initializedMap.remove(); // Remover el mapa al desmontar el componente
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div>
      <Nav />
      <br />
      {map && <Searchbar map={map} />} {/* Pasar el mapa como prop solo si está inicializado */}
      <div id='map' style={{ width: '70%', height: '720px' }}></div>
    </div>
  );
}

export default MapaComponent;

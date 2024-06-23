import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import Nav from '../components/Nav';
import Searchbar from '../components/Searchbar';
import Products from '../components/Products';

function MapaComponent() {
  useEffect(() => {

    function createMarker(long, lat) {
      return new mapboxgl.Marker()
        .setLngLat([long, lat]);
    }

    function add_markers(products) {
      let markers = [];
      let current_markets = [];
      products.forEach(p => {
        p.locales.forEach(local => {
          if (current_markets.length === 0) {
            let marker = createMarker(local.longitud, local.latitud);
            marker.addTo(map);
            marker.setPopup(new mapboxgl.Popup().setHTML("<h3>" + local.nombre + "!</h3>" + "<h4>" + local.direccion + "</h4>"));
            markers.push(marker);
            current_markets.push({
              lat : local.latitud,
              long : local.longitud,
            });
          } else {
            current_markets.forEach(cm => {
              if ((cm.long !== local.longitud || cm.lat !== local.latitud)) {
                let marker = createMarker(local.longitud, local.latitud);
                marker.addTo(map);
                marker.setPopup(new mapboxgl.Popup().setHTML("<h3>" + local.nombre + "!</h3>" + "<h4>" + local.direccion + "</h4>"));
                markers.push(marker);
              }
            });
          }
        });
      });
      return markers;
    }

    async function changeLocationAndZoom(longitude, latitude, zoomLevel) {
      await new Promise(resolve => {
        map.panTo([longitude, latitude]);
        map.once('moveend', () => { // Wait for the map to finish panning
          resolve();
        });
      });

      map.zoomTo(zoomLevel); // Zoom to new level after pan
    }

    // Configuración inicial del mapa
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29ya2xvZyIsImEiOiJjbHhxY2hrYTYwenRtMmtvZThlZXQ5anpiIn0.kHrU6lbo-ik_Tx7F4WAv-Q';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-59.1348577718957, -37.32100277545416], // starting position [lng, lat], 
      zoom: 13, // starting zoom
    });

    // Variables para gestionar productos y marcadores actuales
    let current_products = [];
    let current_markers = [];

    // Función para manejar el formulario de búsqueda
    document.getElementById('searchForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar el envío tradicional del formulario

      // Eliminar marcadores actuales
      current_markers.forEach(m => m.remove());
      current_markers = [];

      // Vaciar lista de productos
      let datos = document.getElementById('lista_prod');
      datos.innerHTML = '';

      // Obtener productos y añadir marcadores
      current_products = getProducts();
      current_markers = add_markers(current_products);

      // Mostrar productos en la lista
      current_products.forEach(p => {
        let lista_locales = '';
        if (p.locales.length === 1) {
          lista_locales = '<button class="localButton" id="' + p.locales[0].id_local + '">' + p.locales[0].nombre + '</button><br>';
        } else {
          lista_locales = '<ul>';
          p.locales.forEach(local => {
            lista_locales += '<li><button class="localButton" id="' + local.id_local + '">' + local.nombre + '</button></li>';
          });
          lista_locales += '</ul>';
        }
        datos.innerHTML += '<li>' +
          '<p>' + p.name + '</p>' +
          '<img src="/img/' + p.id + '.jpg" alt="' + p.name + '"/>' +
          lista_locales +
          '</li>';
      });
    /*
      // Agregar evento click a los botones de local
      document.querySelectorAll('.localButton').forEach(button => {
        button.addEventListener('click', async function() {
          try {
            // Realizar petición fetch para obtener datos del local (simulado aquí)

            // Construir la URL de la consulta
            const url = 'http://localhost:3000/getLocales?id=' + button.id;

            // Realizar la solicitud utilizando fetch
            const response = await fetch(url);
            const data = await response.json();
            changeLocationAndZoom(data.longitud, data.latitud, 17);
          } catch (error) {
            console.error('Error al obtener los locales:', error);
          }
        });
      });*/
    });

    // Limpieza al desmontar el componente
    return () => {
      map.remove(); // Remover el mapa al desmontar el componente
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div>
      <Nav/>
      <br />
      <Searchbar/>
      <Products/>

      <div id='map' style={{ width: '70%', height: '720px' }}></div>
    </div>
  );
}

export default MapaComponent;

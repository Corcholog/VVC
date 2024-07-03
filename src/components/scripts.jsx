// Ejemplo de implementación de la función getProducts para realizar la llamada al servidor y obtener productos
export async function changeLocationAndZoom(longitud, latitud, zoomLevel, map) {
  await new Promise(resolve => {
    map.panTo([longitud, latitud]);
    map.once('moveend', () => { // Espera a que el mapa termine de hacer el pan
      resolve();
    });
  });

  map.zoomTo(zoomLevel); // Zoom al nuevo nivel después del pan
}

export async function getProducts(producto, vegetariano, vegano, celiaco, rating, ciudad) {
  try {
      const response = await fetch('http://localhost:3000/getProducts', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ producto, vegetariano, vegano, celiaco, rating, ciudad }),
      });
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
  }
}
  
export async function getLocals(productos){
  const url = `http://localhost:3000/getLocals?lista_prod=${productos}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener los locales");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la llamada a getLocals:", error);
      return []; // Retorna un array vacío en caso de error
    }
}

  
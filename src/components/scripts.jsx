// Ejemplo de implementación de la función getProducts para realizar la llamada al servidor y obtener productos
export async function getProducts(producto) {
    const url = `http://localhost:3000/getProducts?name=${producto}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la llamada a getProducts:", error);
      return []; // Retorna un array vacío en caso de error
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

  
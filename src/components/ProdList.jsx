import React, { useState } from "react";
import Button from "./Button";
import Review from "./Review";

function ProdList({ data, map }) {
  let localesMap = new Map();
  let uniqueProducts = {};
  
  // Crear un mapa de productos únicos
  data.forEach(prod => {
    if (!uniqueProducts.hasOwnProperty(prod.id_p)){
      uniqueProducts[prod.id_p] = {
        id: prod.id_p,
        nickname: prod.nickname,
        precio: prod.precio,
        foto: prod.foto,
        promedio: prod.promedio
      };
    }
  });
  
  // Iterar sobre los productos para agregar locales al mapa
  data.forEach(prod => {
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
      local_direccion: prod.local_direccion
    });
  });

  // Convertir el objeto de productos únicos en un array para mapearlo
  const uniqueProductsArray = Object.values(uniqueProducts);

  // Estado para controlar la visibilidad del popup y los datos de la reseña
  const [showPopup, setShowPopup] = useState(false);
  const [reviewData, setReviewData] = useState([]);

  // Función para abrir el popup y mostrar los datos de la reseña
  const openPopup = (producto) => {
    // Simulación de obtener datos de reseña
    let review1 = {
      usuario : "John",
      comentario : "I travel the world tasting the sopa de macaco from all the world. This bar offers the best sopa de macaco from portugal. Would definitely recommend."
    };
    let review2 = {
      usuario : "Juana",
      comentario : "Estoy cansado jefe."
    };

    // Establecer los datos de la reseña en el estado
    setReviewData([review1, review2]);
    setShowPopup(true);
  };

  // Función para cerrar el popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <ul id="lista_prod">
      {uniqueProductsArray.map((producto, indice) => (
        <li key={indice} className="elem_prod_li">
          <strong>{producto.nickname}</strong> - ${producto.precio}
          <img className="imagen" src={"../public/img/" + producto.foto} alt={`Imagen de ${producto.nickname}`} />
          <strong> Puntacion: {producto.promedio} ★ </strong>
          <Button locales={localesMap.get(producto.id)} map={map} />
          <button onClick={() => openPopup(producto)}>Ver reseña</button>

          {/* Popup de reseña */}
          {showPopup && (
            <div className="popup">
              <h3>Reseñas de {producto.nickname}</h3>
              {reviewData.map((review, index) => (
                <div key={index}>
                  <p><strong>Usuario:</strong> {review.usuario}</p>
                  <p><strong>Comentario:</strong> {review.comentario}</p>
                </div>
              ))}
              <button onClick={closePopup}>Cerrar</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ProdList;

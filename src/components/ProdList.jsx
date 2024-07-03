import React, { useState, useEffect } from "react";
import Button from "./Button";
import Review from "./Review";
import FormReseña from "./FormReseña";

function ProdList({ data, map }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupReseña, setShowPopupReseña] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

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
  });

  // Convertir el objeto de productos únicos en un array para mapearlo
  const uniqueProductsArray = Object.values(uniqueProducts);

  const openPopupReseña = (producto) => {
    setShowPopupReseña(true);
  }

  const closePopupReseña = () => {
    setShowPopupReseña(false);
    setCurrentProduct(null);
  }

  // Función para abrir el popup y mostrar los datos de la reseña
  const openPopup = async (producto) => {
    try {
      const response = await fetch("http://localhost:3000/getReviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ producto }),
      });

      const data = await response.json();
      console.log(data);
      setReviewData(data);

      // Cerrar el popup al enviar la reseña correctamente
      closePopupReseña();

    } catch (error) {
      setError(true);
      console.error("Error obteniendo las reseñas:", error);
    }
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
          <img
            className="imagen"
            src={"../img/" + producto.foto}
            alt={`Imagen de ${producto.nickname}`}
          />
          <strong> Puntacion: {producto.promedio} ★ </strong>
          <Button locales={localesMap.get(producto.id)} map={map} />
          <button onClick={() => openPopup(producto)}>Ver reseñas</button>
          {isAuthenticated ? (
            <>
              <button onClick={() => openPopupReseña()}>Hacer reseña</button>
              {showPopupReseña && (
                <div className="popup">
                  <FormReseña producto={producto.id} closePopupReseña={closePopupReseña} />
                  <button onClick={closePopupReseña}>Cerrar</button>
                </div>
              )}
            </>
          ) : null}
          {// Meter un componente Reseña y estilarlo
          showPopup && (
            <div className="popup">
              <h3>Reseñas de {producto.nickname}</h3>
              {reviewData.map((review, index) => (
                <div key={index}> 
                  <p><strong>Usuario:</strong> {review.usuario}</p>
                  <p><strong>Comentario:</strong> {review.comentario}</p>
                  <p><strong>Valoracion:</strong> {review.valoracion}</p>
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

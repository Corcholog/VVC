import React, { useState } from "react";
import Button from "./Button";
import FormReseña from "./FormReseña";

function ProductItem({ producto, map, isAuthenticated, locales }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupReseña, setShowPopupReseña] = useState(false);
  const [reviewData, setReviewData] = useState([]);

  const openPopupReseña = () => {
    setShowPopupReseña(true);
  }

  const closePopupReseña = () => {
    setShowPopupReseña(false);
  }

  const openPopup = async () => {
    try {
      const response = await fetch("http://localhost:3000/getReviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ producto: producto.id }),
      });

      const data = await response.json();
      setReviewData(data);
      console.log(data);

    } catch (error) {
      console.error("Error obteniendo las reseñas:", error);
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <li className="elem_prod_li">
      <strong>{producto.nickname}</strong> - ${producto.precio}
      <img
        className="imagen"
        src={"../img/" + producto.foto}
        alt={`Imagen de ${producto.nickname}`}
      />
      <strong> Puntacion: {producto.promedio} ★ </strong>
      <Button locales={locales} map={map} />
      <button onClick={openPopup}>Ver reseñas</button>
      {isAuthenticated ? (
        <>
          <button onClick={openPopupReseña}>Hacer reseña</button>
          {showPopupReseña && (
            <div className="popup">
              <FormReseña producto={producto.id} closePopupReseña={closePopupReseña} />
              <button onClick={closePopupReseña}>Cerrar</button>
            </div>
          )}
        </>
      ) : null}
      {showPopup && (
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
  );
}

export default ProductItem;

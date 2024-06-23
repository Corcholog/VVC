import React from "react";

export default function Review({ data }) {
  return (
    <>
      {data.forEach((review) => {
        <>
          <h3>Reseña de {review.usuario}</h3>
          <p>Puntación: {review.comentario} ★</p>
        </>;
      })}
    </>
  );
}

import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export default function FormReseña({ producto, closePopupReseña }) {
  const [valoracion, setValoracion] = useState("");
  const [comentario, setComentario] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser.id);
    }
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (valoracion === "" || comentario === "") {
      setError(true);
      return;
    }

    setError(false);

    try {
      const response = await fetch("http://localhost:3000/insertReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, producto, valoracion, comentario }),
      });


      // Cerrar el popup al enviar la reseña correctamente
      closePopupReseña();

    } catch (error) {
      setError(true);
      console.error("Error enviando la reseña:", error);
    }
  };

  return (
    <section>
      <form className="Formulario" onSubmit={handleSubmit}>
        <div className={`form-group ${error && valoracion === "" ? "error" : ""}`}>
          <input
            type="text"
            value={valoracion}
            onChange={(ev) => setValoracion(ev.target.value)}
            placeholder="Valoración"
          />
          {error && valoracion === "" && (
            <span className="error-message">* Campo obligatorio</span>
          )}
        </div>
        <div className={`form-group ${error && comentario === "" ? "error" : ""}`}>
          <input
            type="text"
            value={comentario}
            onChange={(ev) => setComentario(ev.target.value)}
            placeholder="Comentario"
          />
          {error && comentario === "" && (
            <span className="error-message">* Campo obligatorio</span>
          )}
        </div>
        <button type="submit">Enviar reseña</button>
      </form>
      {error && <p className="Error">Error enviando la reseña</p>}
    </section>
  );
}

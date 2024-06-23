import React from "react";

function ProdList({ data }) {
  return (
    <ul className="list-group">
      {data.map((producto, indice) => (
        <li key={indice} className="list-group-item">
          <strong>{producto.nickname}</strong> - {producto.precio}
        </li>
      ))}
    </ul>
  );
}

export default ProdList;

import React, { useState, useEffect } from "react";
import ProdList from "./ProdList";

async function getProducts(producto) {
    const url = `http://localhost:3000/getProducts?name=${encodeURIComponent(producto)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export default function Products( {producto, map}) {
    if (producto != ""){
        return (
            <section id="seccion_productos">
                <h3 style={{ backgroundColor: "#ffe599", textAlign: "center" }}>
                    Productos
                </h3>
                <ProdList data={producto} map={map} />
            </section>
        );
    }else {
        return (
            <section id="seccion_productos">
                <h3 style={{ backgroundColor: "#ffe599", textAlign: "center" }}>
                    Productos
                </h3>
            </section>
        );
    }
   
}

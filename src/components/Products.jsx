import React, { useState, useEffect } from "react";
import ProdList from "./ProdList";

async function getProducts(producto) {
    const url = `http://localhost:3000/getProducts?name=${encodeURIComponent(producto)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export default function Products() {
    const [prod, setProd] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getProducts("Empanada");
            setProd(data);
        }
        fetchData();
    }, []); // El array vacío como segundo argumento asegura que useEffect se ejecute solo una vez

    console.log(prod); // Aquí podrás ver los datos una vez que se resuelva la promesa

    return (
        <section id="seccion_productos">
            <h3 style={{ backgroundColor: "#ffe599", textAlign: "center" }}>
                Productos
            </h3>
            <ProdList data={prod} />
        </section>
    );
}

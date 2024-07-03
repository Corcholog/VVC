import React from "react";
import ProdList from "./ProdList";


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

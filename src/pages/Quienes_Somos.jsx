import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import AboutNosotros from "../components/About";
import Navbar from '../components/Nav';

function Quienes_Somos() {
  return (
    <>
      <Navbar/>
      <AboutNosotros />
      <h1 id="encabezadito" >Nuestras redes</h1>
      <div className="redes-sociales">
        <FaFacebook className="icono-red-social" />
        <FaInstagram className="icono-red-social" />
        <FaTwitter className="icono-red-social" />
      </div>
    </>
  );
}

export default Quienes_Somos;

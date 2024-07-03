import React from 'react';
import { Link } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

export default function Navbar() {
  const isAuthenticated = useIsAuthenticated(); // Usamos useIsAuthenticated en lugar de useAuth

  return (
    <nav id="nav_g">
      <Link to="/Mapa" id="Mapa" className="nav_item_l"> VVC </Link>
      {isAuthenticated ? (
        <>
          {/* Mostrar opciones cuando el usuario está autenticado */}
          <Link to="/perfil" className="nav_item_l"> Perfil </Link>
          <button onClick={handleLogout} className="nav_item_l"> Cerrar sesión </button>
        </>
      ) : (
        <>
          {/* Mostrar opciones cuando el usuario no está autenticado */}
          <Link to="/login" className="nav_item_l"> Log in </Link>
          <Link to="/signup" className="nav_item_l"> Sign up </Link>
        </>
      )}
      <Link to="/about" className="nav_item_l"> ¿Quiénes somos? </Link>
      {/* Otras opciones de navegación */}
      <Link to="/" className="nav_item_r"> 🔎 </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
    </nav>
  );
}

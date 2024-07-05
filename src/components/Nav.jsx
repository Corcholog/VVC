import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav id="nav_g">
      <Link to="/Mapa" id="Mapa" className="nav_item_l"> VVC </Link>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout} className="nav_item_l"> Log out </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav_item_l"> Log in </Link>
          <Link to="/signup" className="nav_item_l"> Sign up </Link>
        </>
      )}
      <Link to="/about" className="nav_item_l"> ¿Quiénes somos? </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
    </nav>
  );
}

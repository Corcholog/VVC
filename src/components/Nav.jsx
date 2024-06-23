import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav id="nav_g">
      <Link to="/" id="logo" className="nav_item_l"> VVC </Link>
      <Link to="/login" className="nav_item_l"> Log in </Link>
      <Link to="/signup" className="nav_item_l"> Sign up </Link>
      <Link to="/about" className="nav_item_l"> ¿Quiénes somos? </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
      <Link to="/" className="nav_item_r"> 🔎 </Link>
    </nav>
  );
}
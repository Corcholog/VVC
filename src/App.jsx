import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mapa from './pages/Mapa';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Quienes_Somos from './pages/Quienes_Somos';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

// Crear el store para la autenticación
const store = createStore({
  authName: '_auth', // Nombre del token de autenticación
  authType: 'cookie', // Tipo de almacenamiento (en este caso, cookie)
  cookieDomain: window.location.hostname, // Dominio de la cookie
  cookieSecure: window.location.protocol === 'https:', // Seguridad de la cookie
});

function App() {
  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<Quienes_Somos />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

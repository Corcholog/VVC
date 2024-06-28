import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/mapa.css'
import "./styles/Formulario.css"
import "./styles/FormularioSignUp.css"
import 'mapbox-gl/dist/mapbox-gl.css'; // Importa la hoja de estilos de mapbox-gl
import './styles/About.css';  


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)

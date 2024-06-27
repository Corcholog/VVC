import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import './styles/mapa.css'
import "./styles/Formulario.css"
import "./styles/FormularioSignUp.css"
import 'mapbox-gl/dist/mapbox-gl.css'; // Importa la hoja de estilos de mapbox-gl

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)

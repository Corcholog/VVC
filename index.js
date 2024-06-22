const express = require('express');
const path = require('path');
const app = express();

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '/public')));

// Rutas
app.get('/', (req, res) => {
    res.send("Welcome");
});

app.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/Mapa', (req, res) => {
    res.sendFile(path.join(__dirname, 'mapa.html'));
});

// Servidor escuchando en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Ruge, puta!");
});

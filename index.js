const express = require('express');
const path = require('path');
const app = express();

const { Pool } = require('pg');
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "2108" // cada uno pone su password
});

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

// Queries
app.get('/getLocales', async (req, res) => {
    const { id } = req.query; // Obtiene el parámetro ID de la consulta
    try {
        const queryString = 'SELECT longitud, latitud FROM "Local" WHERE id_local = $1';
        const result = await pool.query(queryString, [id]);
        res.json(result.rows[0]); // Devuelve el resultado como JSON (primer resultado encontrado)
    } catch (error) {
        console.error('Error al obtener los locales:', error);
        res.status(500).json({ error: 'Error al obtener los locales' });
    }
});

// Servidor escuchando en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Ruge, puta!");
});

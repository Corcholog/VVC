import express from 'express';
import pg from 'pg';
import cors from 'cors'; // Importar el middleware cors

const app = express();

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "2108"
});

const PORT = process.env.PORT || 3000;

// Usar el middleware cors
app.use(cors());

app.get('/', (req, res) => {
  res.send(`El servidor Express está corriendo correctamente en el puerto ${PORT}`);
});

// Endpoint para obtener productos por nombre
app.get('/getProducts', async (req, res) => {
  const { name } = req.query; // Obtener el parámetro 'name' de la consulta

  try {
    // Conectar al cliente PostgreSQL
    const client = await pool.connect();

    // Llamar a la función y obtener el resultado
    const query = 'SELECT * FROM public.get_productos_por_nombre($1)';
    const result = await client.query(query, [name]);

    // Liberar la conexión
    client.release();

    // Enviar los resultados como respuesta JSON
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

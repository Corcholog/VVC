import express from 'express';
import pg from 'pg';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

// Usar el middleware cors y body-parser
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`El servidor Express está corriendo correctamente en el puerto ${PORT}`);
});

// Endpoint para obtener productos por nombre
app.post('/getProducts', async (req, res) => {
  const { producto, vegetariano, vegano, celiaco, rating, ciudad } = req.body;
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM public.get_productos_por_nombre($1, $2, $3, $4, $5, $6)';
    const result = await client.query(query, [producto, vegetariano, vegano, celiaco, rating, ciudad]);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.post('/insertReview', async (req, res) => {
  const { user, producto, valoracion, comentario } = req.body;
  
  try {
    const client = await pool.connect();
    
    // Obtener el id del usuario basado en el nombre
    const query_user_id = 'SELECT u.id FROM public."Usuario" u WHERE u.name = $1';
    const result_id = await client.query(query_user_id, [user]);

    // Asegúrate de que obtuviste un resultado
    if (result_id.rows.length === 0) {
      client.release();
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const user_id = result_id.rows[0].id;

    // Insertar la reseña usando el id del usuario
    const query = 'INSERT INTO public."Reseña_Producto" (id_user, id_producto, valoracion, comentario) VALUES ($1, $2, $3, $4)';
    await client.query(query, [user_id, producto, valoracion, comentario]);

    client.release();
    res.status(201).json({ message: 'Reseña enviada correctamente' });
  } catch (error) {
    console.error('Error enviando la reseña:', error);
    res.status(500).json({ error: 'Error enviando la reseña' });
  }
});

// Endpoint para login
app.post('/login', async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM public."Usuario" WHERE email = $1 AND password = $2';
    const result = await client.query(query, [nombre, contraseña]);

    client.release();

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const nombreUsuario = user.name;
      const jwtToken = jwt.sign({ id: nombreUsuario }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ success: true, token: jwtToken });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error en el login' });
  }
});

// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

    req.user = decoded;
    next();
  });
};

// Endpoint protegido de ejemplo
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.id}` });
});

app.post('/getReviews', async (req, res) => {
  const {producto} = req.body;
  console.log(producto);
  try {
    const client = await pool.connect();
    const getReviewsQuery = 'SELECT u.name as usuario, rp.comentario as comentario, rp.valoracion as valoracion FROM public."Reseña_Producto" rp JOIN public."Usuario" u on rp.id_user = u.id WHERE rp.id_producto = $1';
    const reviews = await client.query(getReviewsQuery, [producto]);
    res.json(reviews.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo reseñas' });
  }
});


// Endpoint para registrar usuario
app.post('/SignUp', async (req, res) => {
  const { nombre, contraseña, email, fecha, telefono, direccion } = req.body;

  try {
    const client = await pool.connect();
    const checkUserQuery = 'SELECT * FROM public."Usuario" WHERE email = $1';
    const checkUserResult = await client.query(checkUserQuery, [email]);

    if (checkUserResult.rows.length > 0) {
      client.release();
      return res.json({ success: false, message: 'Usuario ya existe con este email' });
    }

    const fechaNacimiento = fecha ? fecha : null;
    const tel = telefono ? telefono : null;
    const dir = direccion ? direccion : null;
    const insertUserQuery = 'INSERT INTO public."Usuario" (name, password, email, fecha_nacimiento, nmro_telefono, direccion) VALUES ($1, $2, $3, $4, $5, $6)';

    await client.query(insertUserQuery, [nombre, contraseña, email, fechaNacimiento, tel, dir]);

    const query_user_id = 'SELECT u.id FROM public."Usuario" u WHERE u.name = $1';
    const result_id = await client.query(query_user_id, [nombre]);
    
    const user_id = result_id.rows[0].id;


    const insertConsumerQuery = 'INSERT INTO public."Usuario_Consumidor" VALUES ($1, true, false, false)';
    await client.query(insertConsumerQuery, [user_id]);

    client.release();
    res.json({ success: true, message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error en el registro' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

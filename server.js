import express from 'express';
import pg from 'pg';
import cors from 'cors'; // Importar el middleware cors
import bodyParser from 'body-parser'; // Importar el middleware body-parser

const app = express();

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",  //CUANDO LO VAYAN A USAR HAY QUE CAMBIAR ESTO
  user: "postgres",
  password: "Roca2851"    //CUANDO LO VAYAN A USAR HAY QUE CAMBIAR ESTO
}); 

const PORT = process.env.PORT || 3000;

// Usar el middleware cors y body-parser
app.use(cors());
app.use(bodyParser.json());

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

// Endpoint para login
app.post('/login', async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    // Conectar al cliente PostgreSQL
    const client = await pool.connect();

    // Consulta para verificar las credenciales del usuario
    const query = 'SELECT * FROM public."Usuario" WHERE email = $1 AND password = $2';
    const result = await client.query(query, [nombre, contraseña]);  //Recordar que el nombre es el email

    // Liberar la conexión
    client.release();

    if (result.rows.length > 0) {
      // Si se encuentra el usuario, responder con éxito
      const user = result.rows[0];
      const NombreUsuario= user.name;
      res.json({ success: true, nombreUsuario: NombreUsuario });
    } else {
      // Si no se encuentra el usuario, responder con error
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error en el login' });
  }
});

// Endpoint para registrar usuario
app.post('/SignUp', async (req, res) => {
  const { nombre, contraseña, email, fecha, telefono, direccion } = req.body;

  try {
    // Conectar al cliente PostgreSQL
    const client = await pool.connect();

    // Verificar si el usuario ya existe
    const checkUserQuery = 'SELECT * FROM public."Usuario" WHERE email = $1';
    const checkUserResult = await client.query(checkUserQuery, [email]);

    if (checkUserResult.rows.length > 0) {
      // Si el usuario ya existe, responder con error
      client.release();
      return res.json({ success: false, message: 'Usuario ya existe con este email' });
    }
     // Asegurar que fecha_nacimiento sea null si es una cadena vacía
     const fechaNacimiento = fecha ? fecha : null;
     const tel = telefono ? telefono : null;
     const dir = direccion ? direccion : null;
    // Insertar nuevo usuario
    const insertUserQuery = 'INSERT INTO public."Usuario" (name, password, email, fecha_nacimiento, nmro_telefono, direccion) VALUES ($1, $2, $3, $4, $5, $6)';
    await client.query(insertUserQuery, [nombre, contraseña, email, fechaNacimiento, tel, dir]);

    // Liberar la conexión
    client.release();

    // Responder con éxito
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

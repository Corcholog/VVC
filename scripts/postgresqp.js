const { Pool } = require('pg');
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "2108"
});

const getProducts = async () => {
  try {
    const result = await pool.query('SELECT * FROM "Usuario" ORDER BY id ASC');
    console.log(result.rows);
  } catch (error) {
    console.error(error);
  }
};

const getLocales = async (id) => {
  try {
    const queryString = 'SELECT longitud, latitud FROM "Local" WHERE id_local = $1';
    const result = await pool.query(queryString, [id]);
    console.log(result.rows);
  } catch (error) {
    console.error(error);
  }
};

console.log(getLocales(1));

module.exports = { getLocales };
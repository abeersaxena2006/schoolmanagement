const pool = require('../config/db');

async function createSchool({ name, address, latitude, longitude }) {
  const result = await pool.query(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, address, latitude, longitude]
  );
  return result.rows[0];
}

async function getAllSchools() {
  const result = await pool.query(
    'SELECT id, name, address, latitude, longitude FROM schools'
  );
  return result.rows;
}

module.exports = { createSchool, getAllSchools };

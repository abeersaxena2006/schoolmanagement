const pool = require('../config/db');

/**
 * Insert a new school into the database.
 * @param {{ name: string, address: string, latitude: number, longitude: number }} data
 * @returns {Promise<{ id: number, name: string, address: string, latitude: number, longitude: number }>}
 */
async function createSchool({ name, address, latitude, longitude }) {
  const [result] = await pool.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude]
  );
  return { id: result.insertId, name, address, latitude, longitude };
}

/**
 * Fetch every school from the database.
 * @returns {Promise<Array>}
 */
async function getAllSchools() {
  const [rows] = await pool.execute(
    'SELECT id, name, address, latitude, longitude FROM schools'
  );
  return rows;
}

module.exports = { createSchool, getAllSchools };

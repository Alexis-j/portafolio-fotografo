import pool from '../config/db.js';

export const findAdminByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
  return result.rows[0];
};

import db from '../config/db.js';

export const getAllGaleria = async () => {
  const result = await db.query('SELECT * FROM galeria ORDER BY id');
  return result.rows;
};

export const createGaleria = async (categoria, imagen) => {
  const result = await db.query(
    'INSERT INTO galeria (categoria, imagen) VALUES ($1, $2) RETURNING *',
    [categoria, imagen]
  );
  return result.rows[0];
};

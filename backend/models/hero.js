import pool from "../config/db.js";

// Obtener todos los heroes
export const getAllHeroDB = async () => {
  const result = await pool.query("SELECT * FROM hero");
  return result.rows;
};

// Obtener hero por id
export const getHeroByIdDB = async (id) => {
  const result = await pool.query("SELECT * FROM hero WHERE id = $1", [id]);
  return result.rows[0];
};

// Crear nuevo hero
export const createHeroDB = async (
  titulo,
  subtitulo,
  imagen_light,
  imagen_dark,
  logo_light,
  logo_dark,
  mostrar_texto
) => {
  const result = await pool.query(
    `INSERT INTO hero
      (titulo, subtitulo, imagen_light, imagen_dark, logo_light, logo_dark, mostrar_texto)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [titulo, subtitulo, imagen_light, imagen_dark, logo_light, logo_dark, mostrar_texto]
  );
  return result.rows[0];
};

// Actualizar hero
export const updateHeroDB = async (
  id,
  titulo,
  subtitulo,
  imagen_light,
  imagen_dark,
  logo_light,
  logo_dark,
  mostrar_texto
) => {
  const result = await pool.query(
    `UPDATE hero
     SET titulo=$1, subtitulo=$2,
         imagen_light=$3, imagen_dark=$4,
         logo_light=$5, logo_dark=$6,
         mostrar_texto=$7
     WHERE id=$8
     RETURNING *`,
    [titulo, subtitulo, imagen_light, imagen_dark, logo_light, logo_dark, mostrar_texto, id]
  );
  return result.rows[0];
};

// Eliminar hero
export const deleteHeroDB = async (id) => {
  await pool.query("DELETE FROM hero WHERE id=$1", [id]);
};

// Alternar mostrar_texto
export const toggleHeroTextoDB = async (id) => {
  const result = await pool.query(
    `UPDATE hero
     SET mostrar_texto = NOT mostrar_texto
     WHERE id=$1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};

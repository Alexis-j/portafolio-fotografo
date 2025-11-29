import pool from "../config/db.js";

// Get all heroes
export const getAllHeroDB = async () => {
  const result = await pool.query("SELECT * FROM hero");
  return result.rows;
};

// Get hero by id
export const getHeroByIdDB = async (id) => {
  const result = await pool.query("SELECT * FROM hero WHERE id = $1", [id]);
  return result.rows[0];
};

// Create new hero
export const createHeroDB = async (
  title,
  subtitle,
  image_light,
  image_dark,
  logo_light,
  logo_dark,
  show_text
) => {
  const result = await pool.query(
    `INSERT INTO hero
      (title, subtitle, image_light, image_dark, logo_light, logo_dark, show_text)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [title, subtitle, image_light, image_dark, logo_light, logo_dark, show_text]
  );
  return result.rows[0];
};

// Update hero
export const updateHeroDB = async (
  id,
  title,
  subtitle,
  image_light,
  image_dark,
  logo_light,
  logo_dark,
  show_text
) => {
  const result = await pool.query(
    `UPDATE hero
     SET title=$1, subtitle=$2,
         image_light=$3, image_dark=$4,
         logo_light=$5, logo_dark=$6,
         show_text=$7
     WHERE id=$8
     RETURNING *`,
    [title, subtitle, image_light, image_dark, logo_light, logo_dark, show_text, id]
  );
  return result.rows[0];
};

// Delete hero
export const deleteHeroDB = async (id) => {
  await pool.query("DELETE FROM hero WHERE id=$1", [id]);
};

// Toggle show_text
export const toggleHeroTextDB = async (id) => {
  const result = await pool.query(
    `UPDATE hero
     SET show_text = NOT show_text
     WHERE id=$1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};

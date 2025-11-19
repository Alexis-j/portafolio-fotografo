import fs from "fs";
import pool from "../config/db.js";

// GET about
export const getAbout = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM about_me LIMIT 1");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error en getAbout:", err.message);
    res.status(500).send("Error del servidor");
  }
};

// 📌 Crear About Me
export const createAbout = async (req, res) => {
  const { titulo, texto, foto_light, foto_dark } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO about_me (titulo, texto, foto_light, foto_dark)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [titulo, texto, foto_light, foto_dark]
    );
    res.json({ message: "Sección 'Sobre mí' creada ✅", about: result.rows[0] });
  } catch (err) {
    console.error("Error al crear about_me:", err.message);
    res.status(500).json({ error: "Error al crear sección" });
  }
};

export const updateAbout = async (req, res) => {
  try {
    // 🔹 Primero obtener los datos del body (FormData los guarda como strings)
    const { titulo, descripcion } = req.body;

    // 🔹 Obtener imágenes si existen
    const imagenLight = req.files?.imagen_light?.[0]?.filename || null;
    const imagenDark = req.files?.imagen_dark?.[0]?.filename || null;

    // 🔹 Obtener el registro actual (asumimos que solo hay uno)
    const existing = await pool.query("SELECT * FROM about_me LIMIT 1");

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "No existe sección 'Sobre mí'" });
    }

    const current = existing.rows[0];
    const id = current.id;

    // 🔹 Si hay nuevas imágenes, borrar las anteriores
    if (imagenLight && current.imagen_light) {
      fs.unlink(`./uploads/${current.imagen_light}`, () => {});
    }
    if (imagenDark && current.imagen_dark) {
      fs.unlink(`./uploads/${current.imagen_dark}`, () => {});
    }

    // 🔹 Actualizar base de datos
    await pool.query(
      `UPDATE about_me
       SET titulo=$1, descripcion=$2,
           imagen_light=COALESCE($3, imagen_light),
           imagen_dark=COALESCE($4, imagen_dark)
       WHERE id=$5`,
      [titulo, descripcion, imagenLight, imagenDark, id]
    );

    res.json({ message: "Sección 'Sobre mí' actualizada ✅" });
  } catch (err) {
    console.error("Error al actualizar about_me:", err);
    res.status(500).json({ error: "Error al actualizar información" });
  }
};

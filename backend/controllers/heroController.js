import { deleteFile } from "../utils/deleteFiles.js";
import pool from "../config/db.js";
import { toggleHeroTexto as toggleHeroTextoHelper } from "./helpers/heroControllerHelper.js";

export const toggleHeroTexto = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedHero = await toggleHeroTextoHelper(id);
    res.json(updatedHero);
  } catch (err) {
    console.error("Error en toggleHeroTexto:", err.message);
    res.status(500).send("Error del servidor");
  }
};

// 📌 GET: obtener hero
export const getHero = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM hero");
    res.json(result.rows);
  } catch (err) {
    console.error("Error en getHero:", err.message);
    res.status(500).send("Error del servidor");
  }
};

// 📌 POST: crear hero
export const postHero = async (req, res) => {
  try {
    const { titulo, subtitulo } = req.body;

    const imagen_light = req.files?.["imagen_light"]?.[0]?.filename || null;
    const imagen_dark = req.files?.["imagen_dark"]?.[0]?.filename || null;
    const logo_light = req.files?.["logo_light"]?.[0]?.filename || null;
    const logo_dark = req.files?.["logo_dark"]?.[0]?.filename || null;

    let mostrar_texto = true;
    if (req.body?.mostrar_texto !== undefined) {
      mostrar_texto =
        req.body.mostrar_texto === "true" || req.body.mostrar_texto === true;
    }

    const result = await pool.query(
      `INSERT INTO hero
        (titulo, subtitulo, imagen_light, imagen_dark, logo_light, logo_dark, mostrar_texto)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [titulo, subtitulo, imagen_light, imagen_dark, logo_light, logo_dark, mostrar_texto]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error en postHero:", err.message);
    res.status(500).send("Error del servidor");
  }
};

// 📌 PUT: actualizar hero (con borrado de imágenes)
export const updateHero = async (req, res) => {
  const { id } = req.params;

  try {
    const existingHeroRes = await pool.query(
      "SELECT * FROM hero WHERE id = $1",
      [id]
    );
    if (existingHeroRes.rows.length === 0) {
      return res.status(404).json({ error: "Hero no encontrado" });
    }

    const existingHero = existingHeroRes.rows[0];

    // Texto
    const titulo = req.body?.titulo || existingHero.titulo;
    const subtitulo = req.body?.subtitulo || existingHero.subtitulo;

    let mostrar_texto =
      req.body?.mostrar_texto !== undefined
        ? req.body.mostrar_texto === "true" || req.body.mostrar_texto === true
        : existingHero.mostrar_texto;

    // Imágenes
    let imagen_light = existingHero.imagen_light;
    let imagen_dark = existingHero.imagen_dark;
    let logo_light = existingHero.logo_light;
    let logo_dark = existingHero.logo_dark;

    if (req.files?.["imagen_light"]) {
      deleteFile(existingHero.imagen_light);
      imagen_light = req.files["imagen_light"][0].filename;
    }

    if (req.files?.["imagen_dark"]) {
      deleteFile(existingHero.imagen_dark);
      imagen_dark = req.files["imagen_dark"][0].filename;
    }

    if (req.files?.["logo_light"]) {
      deleteFile(existingHero.logo_light);
      logo_light = req.files["logo_light"][0].filename;
    }

    if (req.files?.["logo_dark"]) {
      deleteFile(existingHero.logo_dark);
      logo_dark = req.files["logo_dark"][0].filename;
    }

    const updated = await pool.query(
      `UPDATE hero
       SET titulo = $1, subtitulo = $2,
           imagen_light = $3, imagen_dark = $4,
           logo_light = $5, logo_dark = $6,
           mostrar_texto = $7
       WHERE id = $8
       RETURNING *`,
      [
        titulo,
        subtitulo,
        imagen_light,
        imagen_dark,
        logo_light,
        logo_dark,
        mostrar_texto,
        id,
      ]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Error en updateHero:", err.message);
    res.status(500).json({ error: "Error al actualizar hero" });
  }
};

// 📌 DELETE: eliminar hero
export const deleteHero = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await pool.query("SELECT * FROM hero WHERE id = $1", [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Hero no encontrado" });
    }

    const { imagen_light, imagen_dark, logo_light, logo_dark } = existing.rows[0];

    deleteFile(imagen_light);
    deleteFile(imagen_dark);
    deleteFile(logo_light);
    deleteFile(logo_dark);

    await pool.query("DELETE FROM hero WHERE id = $1", [id]);

    res.json({ message: "Hero eliminado correctamente" });
  } catch (err) {
    console.error("Error en deleteHero:", err.message);
    res.status(500).send("Error del servidor");
  }
};

import fs from "fs";
import path from "path";
import pool from "../config/db.js";

// Obtener todas las reseñas
export const getReview = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM resenas ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener reseñas:", err);
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
};

// Crear nueva reseña
export const createReview  = async (req, res) => {
  const { nombre_cliente, texto, link } = req.body;
  const foto_cliente = req.file ? req.file.filename : null; // multer

  try {
    const result = await pool.query(
      "INSERT INTO resenas (nombre_cliente, texto, foto_cliente, link) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre_cliente, texto, foto_cliente, link]
    );
    res.json({ message: "Reseña agregada ✅", resena: result.rows[0] });
  } catch (err) {
    console.error("Error al crear reseña:", err);
    res.status(500).json({ error: "Error al crear reseña" });
  }
};
// PUT actualizar reseña
export const updateReview = async (req, res) => {
  const { id } = req.params;

  try {
    const existingRes = await pool.query("SELECT * FROM resenas WHERE id = $1", [id]);
    if (existingRes.rows.length === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    const existing = existingRes.rows[0];

    const nombre = req.body?.nombre || existing.nombre;
    const texto = req.body?.texto || existing.texto;
    const puntuacion = req.body?.puntuacion || existing.puntuacion;

    let imagen = existing.imagen;

    if (req.file) {
      deleteFile(existing.imagen);
      imagen = req.file.filename;
    }

    const updated = await pool.query(
      `UPDATE resenas
       SET nombre = $1, texto = $2, puntuacion = $3, imagen = $4
       WHERE id = $5
       RETURNING *`,
      [nombre, texto, puntuacion, imagen, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Error en updateResena:", err.message);
    res.status(500).send("Error del servidor");
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Verificar que exista
    const result = await pool.query(
      "SELECT foto_cliente FROM resenas WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    const foto = result.rows[0].foto_cliente;

    // 2️⃣ Borrar la imagen física (si existe)
    deleteFile(foto);

    // 3️⃣ Borrar de la BD
    await pool.query("DELETE FROM resenas WHERE id = $1", [id]);

    res.json({ message: "Reseña eliminada correctamente 🗑️" });

  } catch (err) {
    console.error("❌ Error al eliminar reseña:", err);
    res.status(500).json({ error: "Error al eliminar reseña" });
  }
};

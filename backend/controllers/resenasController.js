// Eliminar reseña
import fs from "fs";
import path from "path";
import pool from "../config/db.js";

// Obtener todas las reseñas
export const getResenas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM resenas ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener reseñas:", err);
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
};

// Crear nueva reseña
export const createResena = async (req, res) => {
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



export const deleteResena = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT foto_cliente FROM resenas WHERE id = $1", [id]);
    const foto = result.rows[0]?.foto_cliente;

    if (foto) {
      fs.unlinkSync(path.join("uploads", foto));
    }

    await pool.query("DELETE FROM resenas WHERE id = $1", [id]);
    res.json({ message: "Reseña eliminada ✅" });
  } catch (err) {
    console.error("Error al eliminar reseña:", err);
    res.status(500).json({ error: "Error al eliminar reseña" });
  }
};


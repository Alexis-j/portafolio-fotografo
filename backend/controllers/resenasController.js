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
  const { nombre_cliente, texto, foto_cliente } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO resenas (nombre_cliente, texto, foto_cliente) VALUES ($1, $2, $3) RETURNING *",
      [nombre_cliente, texto, foto_cliente]
    );
    res.json({ message: "Reseña agregada ✅", resena: result.rows[0] });
  } catch (err) {
    console.error("Error al crear reseña:", err);
    res.status(500).json({ error: "Error al crear reseña" });
  }
};

// Eliminar reseña
export const deleteResena = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM resenas WHERE id = $1", [id]);
    res.json({ message: "Reseña eliminada ✅" });
  } catch (err) {
    console.error("Error al eliminar reseña:", err);
    res.status(500).json({ error: "Error al eliminar reseña" });
  }
};

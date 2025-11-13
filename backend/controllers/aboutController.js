import pool from "../config/db.js";

// Obtener info "Sobre mí"
export const getAbout = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM about_me LIMIT 1");
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("Error al obtener about_me:", err);
    res.status(500).json({ error: "Error al obtener información" });
  }
};

// Actualizar o crear info "Sobre mí"
export const updateAbout = async (req, res) => {
  const { titulo, descripcion, foto_clara, foto_oscura } = req.body;

  try {
    const existing = await pool.query("SELECT id FROM about_me LIMIT 1");

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE about_me
         SET titulo=$1, descripcion=$2, foto_clara=$3, foto_oscura=$4, updated_at=NOW()
         WHERE id=$5`,
        [titulo, descripcion, foto_clara, foto_oscura, existing.rows[0].id]
      );
      res.json({ message: "Sección 'Sobre mí' actualizada ✅" });
    } else {
      await pool.query(
        `INSERT INTO about_me (titulo, descripcion, foto_clara, foto_oscura)
         VALUES ($1, $2, $3, $4)`,
        [titulo, descripcion, foto_clara, foto_oscura]
      );
      res.json({ message: "Sección 'Sobre mí' creada ✅" });
    }
  } catch (err) {
    console.error("Error al actualizar about_me:", err);
    res.status(500).json({ error: "Error al actualizar información" });
  }
};

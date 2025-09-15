import fs from 'fs';
import path from 'path';
// controllers/heroController.js
import pool from '../config/db.js';

const uploadDir = path.join(path.resolve(), 'uploads');

// 📌 GET: obtener todos los heroes
export const getHero = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hero');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en getHero:', err.message);
    res.status(500).send('Error del servidor');
  }
};

// 📌 POST: crear un nuevo hero
export const postHero = async (req, res) => {
  try {
    const { titulo, subtitulo } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const result = await pool.query(
      'INSERT INTO hero (titulo, subtitulo, imagen) VALUES ($1, $2, $3) RETURNING *',
      [titulo, subtitulo, imagen]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en postHero:', err.message);
    res.status(500).send('Error del servidor');
  }
};

// 📌 PUT: actualizar hero (texto e imagen)
export const updateHero = async (req, res) => {
  const { id } = req.params;

  try {
    // Traer hero existente
    const result = await pool.query('SELECT * FROM hero WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Hero no encontrado' });

    const existingHero = result.rows[0];

    // Valores a actualizar: si no vienen, usamos los actuales
    const titulo = req.body?.titulo || existingHero.titulo;
    const subtitulo = req.body?.subtitulo || existingHero.subtitulo;

    // Imagen: si hay nueva, borramos la anterior
    let imagen = existingHero.imagen;
    if (req.file) {
      const oldPath = path.join(path.resolve(), 'uploads', existingHero.imagen);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      imagen = req.file.filename;
    }

    // Actualizar DB
    const updated = await pool.query(
      'UPDATE hero SET titulo = $1, subtitulo = $2, imagen = $3 WHERE id = $4 RETURNING *',
      [titulo, subtitulo, imagen, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar hero' });
  }
};

// 📌 DELETE: eliminar hero e imagen
export const deleteHero = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM hero WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Hero no encontrado' });

    const imagen = result.rows[0].imagen;
    if (imagen) {
      const filePath = path.join(uploadDir, imagen);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑 Imagen eliminada: ${imagen}`);
      }
    }

    await pool.query('DELETE FROM hero WHERE id = $1', [id]);
    res.json({ message: 'Hero eliminado correctamente' });
  } catch (err) {
    console.error('Error en deleteHero:', err.message);
    res.status(500).send('Error del servidor');
  }
};

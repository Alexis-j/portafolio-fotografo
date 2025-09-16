import fs from 'fs';
import path from 'path';
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

// 📌 POST: crear un nuevo hero con imágenes y logos (opcional)
export const postHero = async (req, res) => {
  try {
    const { titulo, subtitulo } = req.body;

    const imagen_light = req.files['imagen_light']
      ? req.files['imagen_light'][0].filename
      : null;
    const imagen_dark = req.files['imagen_dark']
      ? req.files['imagen_dark'][0].filename
      : null;

    const logo_light = req.files['logo_light']
      ? req.files['logo_light'][0].filename
      : null;
    const logo_dark = req.files['logo_dark']
      ? req.files['logo_dark'][0].filename
      : null;

    const result = await pool.query(
      `INSERT INTO hero
        (titulo, subtitulo, imagen_light, imagen_dark, logo_light, logo_dark)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [titulo, subtitulo, imagen_light, imagen_dark, logo_light, logo_dark]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en postHero:', err.message);
    res.status(500).send('Error del servidor');
  }
};

// 📌 PUT: actualizar hero (texto, imágenes y logos)
export const updateHero = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM hero WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Hero no encontrado' });

    const existingHero = result.rows[0];

    // Texto
    const titulo = req.body?.titulo || existingHero.titulo;
    const subtitulo = req.body?.subtitulo || existingHero.subtitulo;

    // Imágenes
    let imagen_light = existingHero.imagen_light;
    let imagen_dark = existingHero.imagen_dark;

    if (req.files['imagen_light']) {
      const oldPath = path.join(uploadDir, existingHero.imagen_light);
      if (existingHero.imagen_light && fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      imagen_light = req.files['imagen_light'][0].filename;
    }

    if (req.files['imagen_dark']) {
      const oldPath = path.join(uploadDir, existingHero.imagen_dark);
      if (existingHero.imagen_dark && fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      imagen_dark = req.files['imagen_dark'][0].filename;
    }

    // Logos
    let logo_light = existingHero.logo_light;
    let logo_dark = existingHero.logo_dark;

    if (req.files['logo_light']) {
      const oldPath = path.join(uploadDir, existingHero.logo_light);
      if (existingHero.logo_light && fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      logo_light = req.files['logo_light'][0].filename;
    }

    if (req.files['logo_dark']) {
      const oldPath = path.join(uploadDir, existingHero.logo_dark);
      if (existingHero.logo_dark && fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      logo_dark = req.files['logo_dark'][0].filename;
    }

    // Actualizar DB
    const updated = await pool.query(
      `UPDATE hero
       SET titulo = $1, subtitulo = $2, imagen_light = $3, imagen_dark = $4,
           logo_light = $5, logo_dark = $6
       WHERE id = $7 RETURNING *`,
      [titulo, subtitulo, imagen_light, imagen_dark, logo_light, logo_dark, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error('Error en updateHero:', err.message);
    res.status(500).json({ error: 'Error al actualizar hero' });
  }
};

// 📌 DELETE: eliminar hero e imágenes/logos
export const deleteHero = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM hero WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Hero no encontrado' });

    const { imagen_light, imagen_dark, logo_light, logo_dark } = result.rows[0];

    [imagen_light, imagen_dark, logo_light, logo_dark].forEach(img => {
      if (img) {
        const filePath = path.join(uploadDir, img);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`🗑 Imagen eliminada: ${img}`);
        }
      }
    });

    await pool.query('DELETE FROM hero WHERE id = $1', [id]);
    res.json({ message: 'Hero eliminado correctamente' });
  } catch (err) {
    console.error('Error en deleteHero:', err.message);
    res.status(500).send('Error del servidor');
  }
};

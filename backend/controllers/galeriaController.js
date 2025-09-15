import pool from '../config/db.js';

export const getGaleria = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM galeria');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la galería' });
  }
};

export const postGaleria = async (req, res) => {
  try {
    const { categoria } = req.body;
    const imagen = req.file ? req.file.filename : null;


    if (!categoria || !imagen) {
      return res.status(400).json({ error: 'Categoria e imagen son requeridas' });
    }

    const result = await pool.query(
      'INSERT INTO galeria (categoria, imagen) VALUES ($1, $2) RETURNING *',
      [categoria, imagen]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error en postGaleria:', err);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
};


export const deleteGaleria = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM galeria WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Galería no encontrada' });

    // Borrar archivo de imagen
    const imagen = result.rows[0].imagen;
    const filePath = path.join(path.resolve(), 'uploads', imagen);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    // Borrar registro en DB
    await pool.query('DELETE FROM galeria WHERE id = $1', [id]);

    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar imagen' });
  }
};


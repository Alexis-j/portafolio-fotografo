import pool from "../config/db.js";

export const GalleryModel = {

  /* =========================
     PÚBLICO
  ========================= */

  // ✅ AHORA SOLO LEE cover_image
  getCategories: async () => {
    const result = await pool.query(`
      SELECT id, name, slug, cover_image
      FROM gallery_categories
      WHERE is_active = true
      ORDER BY display_order;
    `);
    return result.rows;
  },

  // Público por slug
  getPhotosByCategory: async (slug) => {
    const result = await pool.query(`
      SELECT p.id, p.image_url
      FROM gallery_photos p
      JOIN gallery_category_photos gcp ON p.id = gcp.photo_id
      JOIN gallery_categories c ON c.id = gcp.category_id
      WHERE c.slug = $1
        AND p.is_active = true
      ORDER BY gcp.display_order;
    `, [slug]);

    return result.rows;
  },

  /* =========================
     ADMIN
  ========================= */

  // ADMIN – fotos de una categoría
getCategoryPhotosAdmin: async (categoryId) => {
  const categoryRes = await pool.query(
    `SELECT id, name, cover_photo_id
     FROM gallery_categories
     WHERE id = $1`,
    [categoryId]
  );

  const photosRes = await pool.query(
    `SELECT p.id, p.image_url,
            (p.id = c.cover_photo_id) AS is_cover
     FROM gallery_photos p
     JOIN gallery_category_photos gcp ON p.id = gcp.photo_id
     JOIN gallery_categories c ON c.id = gcp.category_id
     WHERE c.id = $1`,
    [categoryId]
  );

  return {
    category: categoryRes.rows[0],
    photos: photosRes.rows
  };
},

// ADMIN – definir portada
setCategoryCover: async (categoryId, photoId) => {
  const result = await pool.query(
    `UPDATE gallery_categories
     SET cover_photo_id = $1
     WHERE id = $2
     RETURNING *`,
    [photoId, categoryId]
  );
  return result.rows[0];
},


  // Admin: fotos por ID de categoría
  getPhotosByCategoryId: async (categoryId) => {
    const result = await pool.query(`
      SELECT p.id, p.image_url, p.is_active
      FROM gallery_photos p
      JOIN gallery_category_photos gcp ON p.id = gcp.photo_id
      WHERE gcp.category_id = $1
      ORDER BY gcp.display_order;
    `, [categoryId]);

    return result.rows;
  },

  // ✅ SETEAR PORTADA MANUALMENTE
  setCategoryCover: async (categoryId, imageUrl) => {
    const result = await pool.query(`
      UPDATE gallery_categories
      SET cover_image = $1
      WHERE id = $2
      RETURNING *;
    `, [imageUrl, categoryId]);

    return result.rows[0];
  },

  createPhoto: async (imageUrl) => {
    const result = await pool.query(
      `INSERT INTO gallery_photos (image_url)
       VALUES ($1)
       RETURNING *`,
      [imageUrl]
    );
    return result.rows[0];
  },

  assignPhotoToCategory: async (photoId, categoryId, order = 0) => {
    const result = await pool.query(
      `INSERT INTO gallery_category_photos (photo_id, category_id, display_order)
       VALUES ($1, $2, $3)
       ON CONFLICT (photo_id, category_id) DO NOTHING
       RETURNING *`,
      [photoId, categoryId, order]
    );
    return result.rows[0];
  },

  getPhotoById: async (id) => {
    const result = await pool.query(
      `SELECT * FROM gallery_photos WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  deletePhotoRelations: async (photoId) => {
    await pool.query(
      `DELETE FROM gallery_category_photos WHERE photo_id = $1`,
      [photoId]
    );
  },

  deletePhoto: async (photoId) => {
    const result = await pool.query(
      `DELETE FROM gallery_photos WHERE id = $1 RETURNING *`,
      [photoId]
    );
    return result.rows[0];
  },

  togglePhotoActive: async (photoId) => {
    const result = await pool.query(
      `UPDATE gallery_photos
       SET is_active = NOT is_active
       WHERE id = $1
       RETURNING *`,
      [photoId]
    );
    return result.rows[0];
  }
};

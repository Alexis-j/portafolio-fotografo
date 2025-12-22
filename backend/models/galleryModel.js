import pool from "../config/db.js";

export const GalleryModel = {
  /* =========================
     PÚBLICO
  ========================= */
  getCategories: async () => {
    const result = await pool.query(`
      SELECT id, name, slug, cover_image
      FROM gallery_categories
      WHERE is_active = true
      ORDER BY display_order;
    `);
    return result.rows;
  },

  getPhotosByCategory: async (slug) => {
    const result = await pool.query(`
      SELECT p.id, p.title, p.image_url
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
     ADMIN / DASHBOARD
  ========================= */
  createPhoto: async (title, imageUrl) => {
    const result = await pool.query(
      `INSERT INTO gallery_photos (title, image_url)
       VALUES ($1, $2)
       RETURNING *`,
      [title, imageUrl]
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

  getAllPhotosForDashboard: async () => {
    const result = await pool.query(`
      SELECT
        p.id, p.title, p.image_url, p.is_active,
        json_agg(json_build_object('id', c.id, 'name', c.name, 'slug', c.slug, 'display_order', gcp.display_order)) AS categories
      FROM gallery_photos p
      LEFT JOIN gallery_category_photos gcp ON p.id = gcp.photo_id
      LEFT JOIN gallery_categories c ON c.id = gcp.category_id
      GROUP BY p.id
      ORDER BY p.id;
    `);
    return result.rows;
  }
};

import pool from '../config/db.js';

export const GalleryModel = {
  // Traer todas las categorías activas
  getCategories: async () => {
    const result = await pool.query(`
      SELECT id, name, slug, cover_image
      FROM gallery_categories
      WHERE is_active = true
      ORDER BY display_order;
    `);
    return result.rows;
  },

  // Traer fotos por categoría (slug)
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
  }
};

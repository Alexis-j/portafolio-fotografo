import { GalleryModel } from '../models/galleryModel.js';

export const GalleryController = {
  // Obtener categorías
  getCategories: async (req, res) => {
    try {
      const categories = await GalleryModel.getCategories();
      res.json(categories);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Error fetching categories' });
    }
  },

  // Obtener fotos de una categoría
  getPhotosByCategory: async (req, res) => {
    const { slug } = req.params;
    try {
      const photos = await GalleryModel.getPhotosByCategory(slug);
      res.json(photos);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Error fetching photos' });
    }
  }
};

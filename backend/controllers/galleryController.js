import { GalleryModel } from "../models/galleryModel.js";
import { deleteFile } from "../utils/deleteFiles.js";

export const GalleryController = {

  // Obtener categorías
  getCategories: async (req, res) => {
    try {
      const categories = await GalleryModel.getCategories();
      res.json(categories);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Error fetching categories" });
    }
  },

  // Obtener fotos por categoría
  getPhotosByCategory: async (req, res) => {
    const { slug } = req.params;
    try {
      const photos = await GalleryModel.getPhotosByCategory(slug);
      res.json(photos);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Error fetching photos" });
    }
  },

  // Subir foto
  uploadPhoto: async (req, res) => {
    try {
      const { title } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
      }

      const imageUrl = `/uploads/${req.file.filename}`;

      const photo = await GalleryModel.createPhoto(title, imageUrl);
      res.status(201).json(photo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error uploading photo" });
    }
  },

  // Asignar foto a categoría
  assignPhoto: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { photoId, display_order } = req.body;

      if (!photoId) {
        return res.status(400).json({ error: "photoId is required" });
      }

      const relation = await GalleryModel.assignPhotoToCategory(
        photoId,
        categoryId,
        display_order
      );

      res.status(201).json(relation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error assigning photo" });
    }
  },

  // Eliminar foto (DB + archivo físico)
  deletePhoto: async (req, res) => {
    try {
      const { id } = req.params;

      const photo = await GalleryModel.getPhotoById(id);
      if (!photo) {
        return res.status(404).json({ error: "Photo not found" });
      }

      await GalleryModel.deletePhotoRelations(id);
      await GalleryModel.deletePhoto(id);

      const filename = photo.image_url.replace("/uploads/", "");
      deleteFile(filename);

      res.json({ message: "Photo deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting photo" });
    }
  },

  // Listar todas las fotos para el dashboard
  getAllPhotosForDashboard: async (req, res) => {
    try {
      const photos = await GalleryModel.getAllPhotosForDashboard();
      res.json(photos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching dashboard photos" });
    }
  },
  // Toggle activo/inactivo de una foto
togglePhotoActive: async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPhoto = await GalleryModel.togglePhotoActive(id);
    if (!updatedPhoto) return res.status(404).json({ error: "Photo not found" });
    res.json(updatedPhoto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error toggling photo active status" });
  }
},

// Actualizar display_order de varias fotos
updatePhotoOrder: async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { orders } = req.body; // [{ photoId: 1, display_order: 2 }, ...]
    if (!Array.isArray(orders)) return res.status(400).json({ error: "Orders array required" });

    await GalleryModel.updateDisplayOrder(categoryId, orders);
    res.json({ message: "Display order updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating display order" });
  }
}


};

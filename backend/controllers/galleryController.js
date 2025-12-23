import { GalleryModel } from "../models/galleryModel.js";
import { deleteFile } from "../utils/deleteFiles.js";
import pool from "../config/db.js";

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
    const client = await pool.connect();

    try {
      const { categoryIds } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Image required" });
      }

      const categories = JSON.parse(categoryIds || "[]");

      if (categories.length === 0) {
        return res.status(400).json({ error: "At least one category required" });
      }

      await client.query("BEGIN");

      // Crear foto (solo image_url)
      const imageUrl = `/uploads/${req.file.filename}`;
      const photoRes = await client.query(
        `INSERT INTO gallery_photos (image_url)
        VALUES ($1)
        RETURNING *`,
        [imageUrl]
      );

      const photoId = photoRes.rows[0].id;

      // Asignar categorías
      for (const categoryId of categories) {
        await client.query(
          `INSERT INTO gallery_category_photos (photo_id, category_id)
          VALUES ($1, $2)`,
          [photoId, categoryId]
        );
      }

      await client.query("COMMIT");

      res.status(201).json({ message: "Photo uploaded successfully" });

    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);
      res.status(500).json({ error: "Error uploading photo" });
    } finally {
      client.release();
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

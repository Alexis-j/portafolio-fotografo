import { GalleryController } from "../controllers/galleryController.js";
import express from "express";
import { uploadDisk } from "../utils/upload.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// GET /api/gallery/categories
router.get('/categories', GalleryController.getCategories);

// GET /api/gallery/categories/:slug/photos
router.get('/categories/:slug/photos', GalleryController.getPhotosByCategory);

// POST /api/gallery/photos
router.post(
  "/photos",
  verifyToken,
  uploadDisk.single("image"),
  GalleryController.uploadPhoto
);

// POST /api/gallery/categories/:categoryId/photos
router.post(
  "/categories/:categoryId/photos",
  verifyToken,
  GalleryController.assignPhoto
);

// DELETE /api/gallery/photos/:id
router.delete(
  "/photos/:id",
  verifyToken,
  GalleryController.deletePhoto
);

// GET /api/gallery/dashboard/photos → solo admin
router.get(
  "/dashboard/photos",
  verifyToken,
  GalleryController.getAllPhotosForDashboard
);


export default router;

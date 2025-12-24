import { GalleryController } from "../controllers/galleryController.js";
import express from "express";
import { uploadDisk } from "../utils/upload.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

/* =========================
   PÚBLICO
========================= */

// GET /api/gallery/categories
router.get("/categories", GalleryController.getCategories);

// GET /api/gallery/categories/:slug/photos
router.get("/categories/:slug/photos", GalleryController.getPhotosByCategory);

/* =========================
   ADMIN
========================= */

// ver fotos de una categoría (admin)
router.get(
  "/categories/:id/photos",
  verifyToken,
  GalleryController.getCategoryPhotosAdmin
);

// elegir portada
router.patch(
  "/categories/:id/cover",
  verifyToken,
  GalleryController.setCategoryCover
);


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

// GET /api/gallery/dashboard/photos
router.get(
  "/dashboard/photos",
  verifyToken,
  GalleryController.getAllPhotosForDashboard
);

// PATCH /api/gallery/photos/:id/toggle
router.patch(
  "/photos/:id/toggle",
  verifyToken,
  GalleryController.togglePhotoActive
);

// PATCH /api/gallery/categories/:categoryId/photos/order
router.patch(
  "/categories/:categoryId/photos/order",
  verifyToken,
  GalleryController.updatePhotoOrder
);

// ✅ NUEVAS (PORTADA MANUAL)

// GET /api/gallery/categories/:id/photos (admin)
router.get(
  "/categories/:id/photos",
  verifyToken,
  GalleryController.getCategoryPhotosAdmin
);

// PATCH /api/gallery/categories/:id/cover
router.patch(
  "/categories/:id/cover",
  verifyToken,
  GalleryController.setCategoryCover
);

export default router;

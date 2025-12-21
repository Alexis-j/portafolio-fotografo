import { GalleryController } from '../controllers/galleryController.js';
import express from 'express';

const router = express.Router();

// GET /api/gallery/categories
router.get('/categories', GalleryController.getCategories);

// GET /api/gallery/categories/:slug/photos
router.get('/categories/:slug/photos', GalleryController.getPhotosByCategory);

export default router;

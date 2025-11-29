import {
  deleteHero,
  getHero,
  postHero,
  toggleHeroText,
  updateHero,
} from '../controllers/heroController.js';

import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// 1️⃣ Create uploads folder if it doesn't exist
const uploadDir = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// 2️⃣ Multer: memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 3️⃣ Middleware to resize images
const resizeImages = async (req, res, next) => {
  try {
    if (!req.files) return next();

    const resizeField = async (field, width, height, fit = 'cover') => {
      if (!req.files[field]) return;
      const file = req.files[field][0];
      const filename = `${field}-${Date.now()}${path.extname(file.originalname)}`;
      const filepath = path.join(uploadDir, filename);
      await sharp(file.buffer).resize(width, height, { fit }).toFile(filepath);
      req.files[field][0].filename = filename;
    };

    // Logos 400x400
    await Promise.all(['logo_light', 'logo_dark'].map(f => resizeField(f, 400, 400, 'contain')));
    // Hero images 1920x1080
    await Promise.all(['image_light', 'image_dark'].map(f => resizeField(f, 1920, 1080, 'cover')));

    next();
  } catch (err) {
    console.error('Error resizing images:', err);
    res.status(500).json({ error: 'Error processing images' });
  }
};

// 4️⃣ Routes
router.get('/', getHero); // public

const uploadFields = upload.fields([
  { name: 'image_light', maxCount: 1 },
  { name: 'image_dark', maxCount: 1 },
  { name: 'logo_light', maxCount: 1 },
  { name: 'logo_dark', maxCount: 1 },
]);

router.post('/', verifyToken, uploadFields, resizeImages, postHero);
router.put('/:id', verifyToken, uploadFields, resizeImages, updateHero);
router.delete('/:id', verifyToken, deleteHero);
router.patch('/:id/toggle-text', verifyToken, toggleHeroText); // endpoint renamed to English

export default router;

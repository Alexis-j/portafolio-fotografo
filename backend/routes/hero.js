import {
  deleteHero,
  getHero,
  postHero,
  toggleHeroTexto,
  updateHero,
} from '../controllers/heroController.js';

import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// 1️⃣ Crear carpeta uploads si no existe
const uploadDir = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// 2️⃣ Multer: almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 3️⃣ Middleware para redimensionar imágenes
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
    await Promise.all(['imagen_light', 'imagen_dark'].map(f => resizeField(f, 1920, 1080, 'cover')));

    next();
  } catch (err) {
    console.error('Error al redimensionar imágenes:', err);
    res.status(500).json({ error: 'Error al procesar imágenes' });
  }
};

// 4️⃣ Rutas
router.get('/', getHero); // público

const uploadFields = upload.fields([
  { name: 'imagen_light', maxCount: 1 },
  { name: 'imagen_dark', maxCount: 1 },
  { name: 'logo_light', maxCount: 1 },
  { name: 'logo_dark', maxCount: 1 },
]);

router.post('/', verifyToken, uploadFields, resizeImages, postHero);
router.put('/:id', verifyToken, uploadFields, resizeImages, updateHero);
router.delete('/:id', verifyToken, deleteHero);
router.patch('/:id/toggle-texto', verifyToken, toggleHeroTexto);

export default router;

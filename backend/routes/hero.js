import { deleteHero, getHero, postHero, toggleHeroTexto, updateHero } from '../controllers/heroController.js';

import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// 1️⃣ Crear carpeta uploads si no existe
const uploadDir = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('✅ Carpeta uploads creada');
}

// 2️⃣ Configuración Multer: guardamos en memoria primero
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 3️⃣ Middleware para redimensionar imágenes
const resizeImages = async (req, res, next) => {
  try {
    if (req.files) {
      // Logos: 300x300
      const logoFields = ['logo_light', 'logo_dark'];
      for (let field of logoFields) {
        if (req.files[field]) {
          const file = req.files[field][0];
          const filename = `${field}-${Date.now()}${path.extname(file.originalname)}`;
          const filepath = path.join(uploadDir, filename);

          await sharp(file.buffer)
            .resize(300, 300, {
              fit: 'contain',
              background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toFile(filepath);

          req.files[field][0].filename = filename;
        }
      }

      // Hero images: 1920x1080 (puedes ajustar según tu layout)
      const heroFields = ['imagen_light', 'imagen_dark'];
      for (let field of heroFields) {
        if (req.files[field]) {
          const file = req.files[field][0];
          const filename = `${field}-${Date.now()}${path.extname(file.originalname)}`;
          const filepath = path.join(uploadDir, filename);

          await sharp(file.buffer)
            .resize(1920, 1080, {
              fit: 'cover' // recorta para llenar el área
            })
            .toFile(filepath);

          req.files[field][0].filename = filename;
        }
      }
    }
    next();
  } catch (err) {
    console.error('Error al redimensionar imágenes:', err);
    res.status(500).send('Error al procesar imágenes');
  }
};

// 4️⃣ Endpoints

router.get('/', getHero); // público

router.post(
  '/',
  verifyToken,
  upload.fields([
    { name: 'imagen_light', maxCount: 1 },
    { name: 'imagen_dark', maxCount: 1 },
    { name: 'logo_light', maxCount: 1 },
    { name: 'logo_dark', maxCount: 1 }
  ]),
  resizeImages,
  postHero
);

router.put(
  '/:id',
  verifyToken,
  upload.fields([
    { name: 'imagen_light', maxCount: 1 },
    { name: 'imagen_dark', maxCount: 1 },
    { name: 'logo_light', maxCount: 1 },
    { name: 'logo_dark', maxCount: 1 }
  ]),
  resizeImages,
  updateHero
);

router.delete('/:id', verifyToken, deleteHero);

// Alternar visibilidad del texto
router.patch('/:id/toggle-texto', verifyToken, toggleHeroTexto);

export default router;

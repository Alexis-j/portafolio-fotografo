import { deleteHero, getHero, postHero, updateHero } from '../controllers/heroController.js';

// routes/hero.js
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// 1️⃣ Crear carpeta uploads si no existe
const uploadDir = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('✅ Carpeta uploads creada');
}

// 2️⃣ Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// 3️⃣ Endpoints
router.get('/', getHero); // público

// 👇 ahora aceptamos dos imágenes (light y dark) en form-data
router.post(
  '/:id',
  verifyToken,
  upload.fields([
    { name: 'imagen_light', maxCount: 1 },
    { name: 'imagen_dark', maxCount: 1 },
    { name: 'logo_light', maxCount: 1 },
    { name: 'logo_dark', maxCount: 1 }
  ]),
  postHero
);


router.delete('/:id', verifyToken, deleteHero); // admin

export default router;

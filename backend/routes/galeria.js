import { deleteGaleria, getGaleria, postGaleria } from '../controllers/galeriaController.js';

import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// público
router.get('/', getGaleria);

// solo admin
router.post('/', verifyToken, upload.single('imagen'), postGaleria);
router.delete('/:id', verifyToken, deleteGaleria);

export default router;

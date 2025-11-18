import { createAbout, getAbout, updateAbout } from "../controllers/aboutController.js";

import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// GET /api/about → obtener info
router.get("/", getAbout);

// POST /api/about → crear
router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "imagen_light", maxCount: 1 },
    { name: "imagen_dark", maxCount: 1 },
  ]),
  createAbout
);

// PUT /api/about → actualizar
router.put(
  "/",
  verifyToken,
  upload.fields([
    { name: "imagen_light", maxCount: 1 },
    { name: "imagen_dark", maxCount: 1 },
  ]),
  updateAbout
);

export default router;

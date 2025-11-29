import {
  createReview,
  deleteReview,
  getReview,
  updateReview
} from "../controllers/resenasController.js";

// src/routes/resenasRoutes.js
import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Configuración de multer para subir fotos de clientes
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// 📌 Rutas públicas
router.get("/", getReview); // todas
router.get("/:id", getReview); // 1 por id

// 📌 Rutas protegidas (solo admin)
router.post("/", verifyToken, upload.single("foto_cliente"), createReview);
router.delete("/:id", verifyToken, deleteReview);

// Opcional: actualizar reseña
router.put("/:id", verifyToken, upload.single("foto_cliente"), updateReview);

export default router;

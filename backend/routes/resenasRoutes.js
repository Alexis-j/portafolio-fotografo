import {
  createResena,
  deleteResena,
  getResenas
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
router.get("/", getResenas); // Obtener todas las reseñas

// 📌 Rutas protegidas (solo admin)
router.post("/", verifyToken, upload.single("foto_cliente"), createResena);
router.delete("/:id", verifyToken, deleteResena);

// Opcional: actualizar reseña
// router.put("/:id", verifyToken, upload.single("foto_cliente"), updateResena);

export default router;

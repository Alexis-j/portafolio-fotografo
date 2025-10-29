import bcrypt from "bcrypt";
import { createAdmin } from "../controllers/adminController.js";
import express from "express";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// POST /admin/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
    if (result.rows.length === 0)
      return res.status(400).json({ error: "Usuario no encontrado" });

    const admin = result.rows[0];
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword)
      return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Error en login:", err.message);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// ✅ NUEVA RUTA: Crear Admin
router.post("/create", verifyToken, createAdmin);

// Validar token
router.get("/validate", verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;

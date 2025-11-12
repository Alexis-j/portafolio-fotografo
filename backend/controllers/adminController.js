import bcrypt from 'bcrypt';
import crypto from "crypto";
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import pool from "../config/db.js";
// POST /admin/login
export const login =  async (req, res) => {
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
};

// Crear nuevo admin (protegido)
export const createAdmin = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password)
    return res.status(400).json({ error: 'Todos los campos son requeridos' });

  try {
    // Verificar si ya existe
    const exist = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (exist.rows.length > 0)
      return res.status(400).json({ error: 'Email ya registrado' });

    // Hashear password
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO admins (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email',
      [nombre, email, hashed]
    );

    res.json({ message: 'Admin creado ✅', admin: result.rows[0] });
  } catch (err) {
    console.error('Error en createAdmin:', err);
res.status(500).json({ error: 'Error del servidor', details: err.message });

  }
};

// 📌 Solicitar reseteo de contraseña
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Admin no encontrado" });

    const admin = result.rows[0];

    // Generar token y fecha de expiración (1 hora)
    const token = crypto.randomBytes(32).toString("hex");
    const expiration = new Date(Date.now() + 60 * 60 * 1000);

    await pool.query(
      "UPDATE admins SET reset_token = $1, reset_token_expiration = $2 WHERE id = $3",
      [token, expiration, admin.id]
    );

    // Configurar transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/admin/reset-password/${token}`;
  console.log("🔑 Token generado para reset:", token);

    await transporter.sendMail({
      from: `"Portafolio Fotógrafo" <${process.env.EMAIL_USER}>`,
      to: admin.email,
      subject: "Recuperación de contraseña",
      html: `
        <p>Hola ${admin.nombre},</p>
        <p>Para cambiar tu contraseña, haz clic en el siguiente enlace:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Este enlace expirará en 1 hora.</p>
      `,
    });

    res.json({ message: "Correo de recuperación enviado ✅" });
  } catch (err) {
    console.error("Error en requestPasswordReset:", err.message);
    res.status(500).json({ error: "Error al enviar correo" });
  }
};

// 📌 Resetear contraseña
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;


  try {
    const result = await pool.query(
      "SELECT * FROM admins WHERE reset_token = $1 AND reset_token_expiration > NOW()",
      [token]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ error: "Token inválido o expirado" });

    const admin = result.rows[0];
    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE admins SET password = $1, reset_token = NULL, reset_token_expiration = NULL WHERE id = $2",
      [hashed, admin.id]
    );

    res.json({ message: "Contraseña actualizada correctamente ✅" });
  } catch (err) {
    console.error("Error en resetPassword:", err.message);
    res.status(500).json({ error: "Error al actualizar contraseña" });
  }
};

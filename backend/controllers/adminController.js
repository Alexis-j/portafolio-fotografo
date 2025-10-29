import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' });

  try {
    const result = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
    const admin = result.rows[0];

    if (!admin) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, admin: { id: admin.id, nombre: admin.nombre, email: admin.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
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

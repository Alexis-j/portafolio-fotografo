import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // formato "Bearer token"

  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // guardar info del admin en la request
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

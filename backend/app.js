import adminRoutes from './routes/admin.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import galeriaRoutes from './routes/galeria.js';
import heroRoutes from './routes/hero.js';
import paquetesRoutes from './routes/paquete.js';
import path from 'path';
import pool from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware para logs de uploads
app.use('/uploads', (req, res, next) => {
  const filePath = path.join(path.resolve(), 'uploads', req.path);
  console.log('Intentando acceder a:', filePath);

  if (fs.existsSync(filePath)) {
    console.log('✅ Archivo existe');
  } else {
    console.log('❌ Archivo NO encontrado');
  }

  next();
});

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Rutas
app.use('/api/hero', heroRoutes);
app.use('/api/galeria', galeriaRoutes);
app.use('/api/paquetes', paquetesRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Backend funcionando 🚀');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

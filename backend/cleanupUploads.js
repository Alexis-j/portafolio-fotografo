import fs from "fs";
import path from "path";
import pool from "./config/db.js";

const uploadsPath = path.join(process.cwd(), "uploads");

const cleanUploads = async () => {
  try {
    console.log("⏳ Obteniendo fotos de la DB...");
    const res = await pool.query("SELECT image_url FROM gallery_photos");
    const dbFiles = res.rows.map(r => path.basename(r.image_url));

    console.log("⏳ Leyendo carpeta uploads...");
    fs.readdirSync(uploadsPath).forEach(file => {
      if (!dbFiles.includes(file)) {
        fs.unlinkSync(path.join(uploadsPath, file));
        console.log("🗑️  Borrado:", file);
      }
    });

    console.log("✅ Carpeta uploads limpia. Solo quedan archivos registrados en la DB.");

    // Opcional: si quieres limpiar la DB completamente
    // console.log("🗑️ Limpiando DB...");
    // await pool.query("DELETE FROM gallery_category_photos;");
    // await pool.query("DELETE FROM gallery_photos;");
    // console.log("✅ DB limpia");

    process.exit(0);
  } catch (err) {
    console.error("Error durante limpieza:", err);
    process.exit(1);
  }
};

cleanUploads();

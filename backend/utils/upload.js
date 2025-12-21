import fs from "fs";
import multer from "multer";
import path from "path";
import sharp from "sharp";

const UPLOAD_DIR = path.join(path.resolve(), "uploads");

// Crear carpeta si no existe
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Storage disk simple
export const storageDisk = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadDisk = multer({ storage: storageDisk });

// Storage en memoria (para procesar con Sharp)
export const storageMemory = multer.memoryStorage();
export const uploadMemory = multer({ storage: storageMemory });

// Función util para resize con Sharp
export const resizeImages = (fieldsConfig) => async (req, res, next) => {
  try {
    if (!req.files) return next();

    const resizeField = async (field, width, height, fit = "cover") => {
      if (!req.files[field]) return;
      const file = req.files[field][0];
      const filename = `${field}-${Date.now()}${path.extname(file.originalname)}`;
      const filepath = path.join(UPLOAD_DIR, filename);
      await sharp(file.buffer)
        .resize(width, height, { fit })
        .toFile(filepath);
      req.files[field][0].filename = filename;
    };

    const tasks = fieldsConfig.map((f) =>
      resizeField(f.name, f.width, f.height, f.fit)
    );
    await Promise.all(tasks);

    next();
  } catch (err) {
    console.error("Error resizing images:", err);
    res.status(500).json({ error: "Error processing images" });
  }
};

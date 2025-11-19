import fs from "fs";
import path from "path";

export const deleteFile = (fileName) => {
  if (!fileName) return;

  const filePath = path.join(path.resolve(), "uploads", fileName);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("🗑️ Imagen eliminada:", filePath);
    } else {
      console.log("⚠️ Imagen no encontrada:", filePath);
    }
  } catch (err) {
    console.error("❌ Error al eliminar archivo:", err);
  }
};

import fs from "fs";
import path from "path";

export const deleteFile = (imageUrl) => {
  if (!imageUrl) return;

  // imageUrl = "/uploads/archivo.jpg"
  const filename = path.basename(imageUrl); // 👈 saca SOLO el nombre
  const filePath = path.join(process.cwd(), "uploads", filename);

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

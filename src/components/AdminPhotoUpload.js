import { uploadPhoto } from "../services/photoService";
import { useState } from "react";

export default function AdminPhotoUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo");
    setUploading(true);
    try {
      await uploadPhoto(file);
      alert("Foto subida correctamente!");
      setFile(null);
    } catch (err) {
      alert("Error al subir foto: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Subiendo..." : "Subir Foto"}
      </button>
    </div>
  );
}

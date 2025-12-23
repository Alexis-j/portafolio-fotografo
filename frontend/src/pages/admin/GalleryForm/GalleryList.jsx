import {
  FormWrapper,
  PreviewImage,
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from "react";

import Button from "../../../components/ui/Button";
import api from "../../../services/api";

function GalleryList() {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const res = await api.get("/gallery/dashboard/photos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPhotos(res.data);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const toggleActive = async (id) => {
    try {
      await api.patch(`/gallery/photos/${id}/toggle`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchPhotos();
    } catch (err) {
      console.error("Error toggling active:", err);
    }
  };

  const deletePhoto = async (id) => {
    if (!window.confirm("¿Eliminar esta foto?")) return;
    try {
      await api.delete(`/gallery/photos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchPhotos();
    } catch (err) {
      console.error("Error deleting photo:", err);
    }
  };

  return (
    <FormWrapper>
      <h2>Galería de fotos</h2>
      {photos.map((photo) => (
        <div key={photo.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          <PreviewImage src={`http://localhost:5000${photo.image_url}`} />
          <p>Categorías: {photo.categories.map(c => c.name).join(", ")}</p>
          <p>Activo: {photo.is_active ? "Sí" : "No"}</p>
          <Button onClick={() => toggleActive(photo.id)}>{photo.is_active ? "Desactivar" : "Activar"}</Button>
          <Button variant="cancel" onClick={() => deletePhoto(photo.id)}>Eliminar</Button>
        </div>
      ))}
    </FormWrapper>
  );
}

export default GalleryList;

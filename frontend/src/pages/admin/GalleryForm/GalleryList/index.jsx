// src/components/Admin/GalleryList/index.jsx
import { Button, PhotoCard, PhotosGrid, Wrapper } from "./styles";
import React, { useEffect, useState } from "react";

import api from "../../../../services/api";
<<<<<<< HEAD
import { getImageUrl } from '../../../../utils/getImageUrl'; // 🔹 Importar la función
=======
import { getImageUrl } from "../../../../utils/getImageUrl"; // IMPORTAR LA FUNCIÓN
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327

function GalleryList() {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [localAssignments, setLocalAssignments] = useState({}); // para cambios locales

  // ---------- FETCH DATA ----------
  const fetchPhotos = async () => {
    try {
      const res = await api.get("/gallery/dashboard/photos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPhotos(res.data);

      // inicializar localAssignments
      const assignments = {};
      res.data.forEach((p) => {
        assignments[p.id] = p.categories?.map((c) => c.id) || [];
      });
      setLocalAssignments(assignments);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/gallery/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchPhotos();
    fetchCategories();
  }, []);

  // ---------- ACTIONS ----------
  const toggleActive = async (photoId) => {
    try {
      await api.patch(
        `/gallery/photos/${photoId}/toggle`,
        null,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchPhotos();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePhoto = async (photoId) => {
    if (!window.confirm("¿Eliminar esta foto?")) return;
    try {
      await api.delete(`/gallery/photos/${photoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchPhotos();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- CAMBIOS LOCALES ----------
  const toggleLocalCategory = (photoId, catId) => {
    setLocalAssignments((prev) => {
      const current = prev[photoId] || [];
      const updated = current.includes(catId)
        ? current.filter((id) => id !== catId)
        : [...current, catId];
      return { ...prev, [photoId]: updated };
    });
  };

  const saveAssignments = async (photoId) => {
    const assignedIds = localAssignments[photoId] || [];
    try {
<<<<<<< HEAD
      const currentPhoto = photos.find(p => p.id === photoId);
=======
      // Primero eliminamos relaciones existentes
      const currentPhoto = photos.find((p) => p.id === photoId);
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
      const toRemove = currentPhoto.categories
        .map((c) => c.id)
        .filter((id) => !assignedIds.includes(id));

      for (let catId of toRemove) {
        await api.delete(
          `/gallery/categories/${catId}/photos/${photoId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      }

      for (let catId of assignedIds) {
        if (!currentPhoto.categories.some((c) => c.id === catId)) {
          await api.post(
            `/gallery/categories/${catId}/photos`,
            { photoId, display_order: 0 },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
        }
      }

      alert("Cambios guardados ✅");
      fetchPhotos();
    } catch (err) {
      console.error(err);
      alert("Error guardando cambios ❌");
    }
  };

  return (
    <Wrapper>
      <h2>Galería – Todas las fotos</h2>

      <PhotosGrid>
        {photos.map((photo) => (
          <PhotoCard key={photo.id}>
<<<<<<< HEAD
            {/* 🔹 Usar getImageUrl */}
=======
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
            <img src={getImageUrl(photo.image_url)} alt="" />
            <p>Activo: {photo.is_active ? "Sí" : "No"}</p>

            <Button onClick={() => toggleActive(photo.id)}>
              {photo.is_active ? "Desactivar" : "Activar"}
            </Button>

            <Button onClick={() => deletePhoto(photo.id)}>Eliminar</Button>

            {categories.map((cat) => {
              const assigned = localAssignments[photo.id]?.includes(cat.id);
              return (
                <label key={cat.id}>
                  <input
                    type="checkbox"
                    checked={assigned}
                    onChange={() => toggleLocalCategory(photo.id, cat.id)}
                  />
                  {cat.name}
                </label>
              );
            })}

            <Button onClick={() => saveAssignments(photo.id)}>Guardar Cambios</Button>
          </PhotoCard>
        ))}
      </PhotosGrid>
    </Wrapper>
  );
}

export default GalleryList;

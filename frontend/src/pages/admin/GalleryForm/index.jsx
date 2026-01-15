import {
  FormWrapper,
  Input,
  Label,
  PreviewImage
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from "react";

import Button from '../../../components/ui/Button';
import api from "../../../services/api";

function GalleryForm() {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 🔹 Traer todas las categorías al cargar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/gallery/categories");
        // Asegurarse de que siempre sea array
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error cargando categorías:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Manejar cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Seleccionar/deseleccionar categorías
  const handleCategoryChange = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // 🔹 Subir foto
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) return alert("Selecciona una foto");
    if (selectedCategories.length === 0) return alert("Selecciona al menos una categoría");

    const formData = new FormData();
    formData.append("image", photo);
    formData.append("categoryIds", JSON.stringify(selectedCategories));

    try {
      await api.post("/gallery/photos", formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });

      alert("Foto subida correctamente ✅");
      setPhoto(null);
      setPhotoPreview(null);
      setSelectedCategories([]);
    } catch (err) {
      console.error("Error subiendo foto:", err.response || err);
      alert("Error al subir la foto. Revisa la consola.");
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h2>Subir nueva foto</h2>

      <Label>Foto</Label>
      {photoPreview && <PreviewImage src={photoPreview} />}
      <Input type="file" onChange={handleFileChange} required />

      <Label>Categorías</Label>
      {categories.length === 0 ? (
        <p>No hay categorías disponibles. Crea primero una categoría.</p>
      ) : (
        categories.map(cat => (
          <div key={cat.id}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.id)}
              onChange={() => handleCategoryChange(cat.id)}
              id={`cat-${cat.id}`}
            />
            <label htmlFor={`cat-${cat.id}`}>{cat.name}</label>
          </div>
        ))
      )}

      <Button type="submit" disabled={categories.length === 0}>
        Subir Foto
      </Button>
    </FormWrapper>
  );
}

export default GalleryForm;

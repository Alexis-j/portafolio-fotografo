import {
  FormWrapper,
  Input,
  Label,
  PreviewImage
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from "react";

import Button from '../../../components/ui/Button'
import api from "../../../services/api";

function GalleryForm() {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Traer categorías al cargar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/gallery/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Manejar cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Seleccionar/deseleccionar categorías
  const handleCategoryChange = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // Subir foto
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
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        },
      });

      alert("Foto subida correctamente ✅");
      setPhoto(null);
      setPhotoPreview(null);
      setSelectedCategories([]);
    } catch (err) {
      console.error("Error uploading photo:", err.response || err);
      alert("Error al subir la foto. Revisa la consola.");
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h2>Subir nueva foto</h2>

      <Label>Foto</Label>
      {photoPreview && <PreviewImage src={photoPreview} />}
      <Input type="file" onChange={handleFileChange} />

      <Label>Categorías</Label>
      {categories.map(cat => (
        <div key={cat.id}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat.id)}
            onChange={() => handleCategoryChange(cat.id)}
          />{" "}
          {cat.name}
        </div>
      ))}

      <Button type="submit">Subir Foto</Button>
    </FormWrapper>
  );
}

export default GalleryForm;

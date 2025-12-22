import {
  FormWrapper,
  Input,
  Label,
  PreviewImage,
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from "react";

import Button from "../../../components/ui/Button";
import api from "../../../services/api";

function GalleryForm() {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (id) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) return alert("Selecciona una foto");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", photo);

    try {
      // 1️⃣ Subir foto
      const res = await api.post("/gallery/photos", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const photoId = res.data.id;

      // 2️⃣ Asignar a categorías
      await Promise.all(
        selectedCategories.map(catId =>
          api.post(`/gallery/categories/${catId}/photos`, { photoId }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
        )
      );

      alert("Foto subida y asignada correctamente ✅");
      setTitle("");
      setPhoto(null);
      setPhotoPreview(null);
      setSelectedCategories([]);
    } catch (err) {
      console.error("Error uploading photo:", err);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h2>Subir nueva foto</h2>

      <Label>Título</Label>
      <Input value={title} onChange={e => setTitle(e.target.value)} required />

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

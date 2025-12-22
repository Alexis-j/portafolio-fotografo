import React, { useEffect, useState } from "react";

import api from "../services/api"; // tu instancia de axios

function PublicGallery() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.get("/gallery/categories");
      setCategories(res.data);
      if (res.data.length) setSelectedCategory(res.data[0].slug);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    const fetchPhotos = async () => {
      const res = await api.get(`/gallery/categories/${selectedCategory}/photos`);
      setPhotos(res.data);
    };
    fetchPhotos();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Galería Pública</h1>
      <div>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.slug)}>
            {cat.name}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {photos.map(photo => (
          <div key={photo.id} style={{ margin: "10px" }}>
            <img
              src={`http://localhost:5000${photo.image_url}`}
              alt={photo.title}
              style={{ width: "200px", height: "150px", objectFit: "cover" }}
            />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicGallery;

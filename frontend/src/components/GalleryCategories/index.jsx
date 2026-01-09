// src/components/GalleryPage/index.jsx
import { CategoryCard, GalleryWrapper } from "./styles";
import React, { useEffect, useState } from "react";

import Button from "../ui/Button";
import api from "../../services/api";
import { getImageUrl } from "../../utils/getImageUrl";

function GalleryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/gallery/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <GalleryWrapper>
      <h1>Galería</h1>
      {categories.map((cat) => {
        const imageUrl = cat.cover_image
          ? getImageUrl(cat.cover_image)
          : "/default-placeholder.jpg";

        return (
          <CategoryCard key={cat.id} $image={imageUrl}>
            <Button to={`/gallery/${cat.slug}`} variant="portfolio">
              {cat.name}
            </Button>
          </CategoryCard>
        );
      })}
    </GalleryWrapper>
  );
}

export default GalleryPage;

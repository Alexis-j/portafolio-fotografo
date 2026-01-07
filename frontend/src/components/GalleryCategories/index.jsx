import { CategoryCard, GalleryWrapper } from "./styles";
import React, { useEffect, useState } from "react";

import Button from "../ui/Button";
import api from "../../services/api";

function GalleryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  const fetchCategories = async () => {
    const res = await api.get("/gallery/categories");
    // console.log("CATEGORIES FROM API:", res.data);
    setCategories(res.data);
  };
  fetchCategories();
}, []);


  return (
    <GalleryWrapper>
      <h1>Galería</h1>
        {categories.map(cat => {

  return (
    <CategoryCard
      key={cat.id}
      $image={cat.cover_image ? `http://localhost:5000${cat.cover_image}` : "/default-placeholder.jpg"}
    >
      <Button
        to={`/gallery/${cat.slug}`}
        variant="portfolio"
      >
        {cat.name}
      </Button>
    </CategoryCard>

  );
})}
    </GalleryWrapper>
  );
}

export default GalleryPage;

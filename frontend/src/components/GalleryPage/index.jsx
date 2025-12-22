import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import api from "../../services/api";
import styled from "styled-components";

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CategoryImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
`;

const CategoryButton = styled(Link)`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

function GalleryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/gallery/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <GalleryWrapper>
      <h1>Galería</h1>
      {categories.map(cat => (
        <CategoryCard key={cat.id}>
          {cat.cover_image && <CategoryImage src={`http://localhost:5000${cat.cover_image}`} alt={cat.name} />}
          <CategoryButton to={`/gallery/${cat.slug}`}>{cat.name}</CategoryButton>
        </CategoryCard>
      ))}
    </GalleryWrapper>
  );
}

export default GalleryPage;

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import api from "../../services/api";
import styled from "styled-components";

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  h1 {
  display: flex;
  justify-content: center;
  text-align: center;

  }
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  height: 667px;
  width: 100%;
  background-color: #ccc;
  background-image: url(${props => props.$image || '/default-placeholder.jpg'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 1;
  }

  a {
    z-index: 2;
  }
`;


const CategoryButton = styled(Link)`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  text-decoration: none;
  border: 2px solid;
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
  }, [])

  return (
    <GalleryWrapper>
      <h1>Galería</h1>
      {categories.map(cat => (
        <CategoryCard
          key={cat.id}
          $image={cat.cover_image ? `http://localhost:5000${cat.cover_image}` : '/default-placeholder.jpg'}
        >
          <CategoryButton to={`/gallery/${cat.slug}`}>{cat.name}</CategoryButton>
        </CategoryCard>
      ))}
    </GalleryWrapper>
  );
}

export default GalleryPage;

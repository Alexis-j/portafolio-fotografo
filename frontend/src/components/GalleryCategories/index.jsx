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
  min-height: 650px;
  width: 100%;
  background-image: ${({ $image }) => `url(${$image})`};
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.35);
  }

  a {
    position: relative;
    z-index: 1;
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
  // console.log("CATEGORY:", cat.name, cat.cover_image);

  return (
    <CategoryCard
      key={cat.id}
      $image={
        cat.cover_image
          ? `http://localhost:5000${cat.cover_image}`
          : "/default-placeholder.jpg"
      }
    >
      <CategoryButton to={`/gallery/${cat.slug}`}>
        {cat.name}
      </CategoryButton>
    </CategoryCard>
  );
})}

    </GalleryWrapper>
  );
}

export default GalleryPage;

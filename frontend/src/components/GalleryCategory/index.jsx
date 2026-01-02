import React, { useEffect, useState } from "react";

import api from "../../services/api";
import styled from "styled-components";
import { useParams } from "react-router-dom";

/* ================= STYLES ================= */

const Title = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;



const PhotosWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1.25rem;
  padding: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PhotoItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  cursor: pointer;
  background: #111;

  /* FADE IN */
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  /* SMALL IMAGES */
  &:nth-child(6n + 1),
  &:nth-child(6n + 3),
  &:nth-child(6n + 4),
  &:nth-child(6n + 6) {
    aspect-ratio: 3 / 4;
  }

  /* BIG CENTER IMAGE */
  &:nth-child(6n + 2),
  &:nth-child(6n + 5) {
    grid-column: 2;
    grid-row: span 2;
    aspect-ratio: 2 / 3;
  }

  @media (max-width: 900px) {
    grid-column: auto;
    grid-row: auto;
    aspect-ratio: 4 / 5;
  }
`;


const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.6s ease, filter 0.6s ease;
  filter: blur(18px);
  transform: scale(1.05);

  &.loaded {
    filter: blur(0);
    transform: scale(1);
  }

  ${PhotoItem}:hover & {
    transform: scale(1.08);
  }
`;



/* ===== LIGHTBOX ===== */

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  user-select: none;

  ${({ left }) => left && `left: 20px;`}
  ${({ right }) => right && `right: 20px;`}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

/* ================= COMPONENT ================= */

function CategoryPage() {
  const { slug } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await api.get(`/gallery/categories/${slug}/photos`);
      setPhotos(res.data);
    };
    fetchPhotos();
  }, [slug]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{slug}</h1>

      <PhotosWrapper>
        {photos.map((photo) => (
          <PhotoItem key={photo.id}>
            <PhotoImage
              src={`http://localhost:5000${photo.image_url}`}
              loading="lazy"
              className={loaded[photo.id] ? "loaded" : ""}
              onLoad={() =>
                setLoaded((prev) => ({ ...prev, [photo.id]: true }))
              }
              alt=""
            />
          </PhotoItem>
        ))}
      </PhotosWrapper>
    </>
  );
}


export default CategoryPage;

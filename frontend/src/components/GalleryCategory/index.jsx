import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { EffectFade, Navigation, Pagination } from "swiper/modules";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import api from "../../services/api";
import styled from "styled-components";
import { useParams } from "react-router-dom";

/* ================= GRID STYLES ================= */

const PageTitle = styled.h1`
  text-align: center;
  margin: 3rem 0 2rem;
`;


const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
const EditorialBlock = styled.div`
  display: grid;
  grid-template-columns: 3fr 6fr 3fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 1.25rem;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: none;
  }
`;
const BlockItem = styled.div`
  position: relative;
  overflow: hidden;
  background: #111;
  cursor: pointer;
  max-height: 303px;

  ${({ pos }) =>
    pos === 0 &&
    `
      grid-column: 1;
      grid-row: 1;
    `}

  ${({ pos }) =>
    pos === 1 &&
    `
      grid-column: 2;
      grid-row: 1 / span 2;
      max-height: 630px;
    `}

  ${({ pos }) =>
    pos === 2 &&
    `
      grid-column: 3;
      grid-row: 1;
    `}

  ${({ pos }) =>
    pos === 3 &&
    `
      grid-column: 1;
      grid-row: 2;
    `}

  ${({ pos }) =>
    pos === 4 &&
    `
      grid-column: 3;
      grid-row: 2;
    `}

  @media (max-width: 900px) {
    grid-column: auto;
    grid-row: auto;
    aspect-ratio: 3 / 4;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;
const BlockImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transition: transform 0.4s ease, filter 0.4s ease;

  filter: blur(10px);
  opacity: 0;

  &[data-loaded="true"] {
    filter: blur(0);
    opacity: 1;
  }
`;


/* ================= LIGHTBOX ================= */

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.accent || "#fff"};
    width: 2.5rem;
    height: 2.5rem;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 1.8rem;
  }

  .swiper-pagination-bullet {
    background: white !important;
    opacity: 0.6;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const LightboxImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Controls = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  gap: 16px;
  z-index: 10;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent || "#fff"};
  font-size: 1.8rem;
  cursor: pointer;
`;

/* ================= COMPONENT ================= */

function CategoryPage() {
  const { slug } = useParams();
  const [photos, setPhotos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    api.get(`/gallery/categories/${slug}/photos`).then((res) => {
      setPhotos(res.data);
    });
  }, [slug]);

  const blocks = [];
  for (let i = 0; i < photos.length; i += 5) {
    blocks.push(photos.slice(i, i + 5));
  }
    const closeLightbox = () => setActiveIndex(null);

  return (
    <>
    <PageTitle>{slug}</PageTitle>
      <GalleryWrapper>
        {blocks.map((block, blockIndex) => (
          <EditorialBlock key={blockIndex}>
            {block.map((photo, index) => (
              <BlockItem
                key={photo.id}
                pos={index}
                onClick={() => setActiveIndex(blockIndex * 5 + index)}
              >
                <BlockImage
                  src={`http://localhost:5000${photo.image_url}`}
                  loading="lazy"
                  onLoad={(e) =>
                    (e.currentTarget.dataset.loaded = "true")
                  }
                />
              </BlockItem>
            ))}
          </EditorialBlock>
        ))}
      </GalleryWrapper>
          {activeIndex !== null && (
        <Lightbox onClick={closeLightbox}>
          <Controls>
            <ControlButton onClick={closeLightbox} title="Cerrar">
              ×
            </ControlButton>
          </Controls>

          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            navigation
            pagination={{ clickable: true }}
            effect="fade"
            initialSlide={activeIndex}
            loop
            style={{ width: "90%", maxWidth: "1200px", height: "85%" }}
            onClick={(e) => e.stopPropagation()}
          >
            {photos.map((photo) => (
              <SwiperSlide key={photo.id}>
                <LightboxImage
                  src={`http://localhost:5000${photo.image_url}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Lightbox>
      )}
    </>
  );
}


export default CategoryPage;

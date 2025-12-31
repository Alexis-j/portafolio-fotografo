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

/* ================= STYLES ================= */

const PhotosWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const PhotoImage = styled.img`
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  object-fit: cover;
  height: 200px;
`;

const Title = styled.h1`
  text-align: center;
`;

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
    opacity: 1 !important;
  }

  .swiper-pagination-bullet-active {
    transform: scale(1.2);
  }
`;

const LightboxImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TopRightControls = styled.div`
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await api.get(`/gallery/categories/${slug}/photos`);
      setPhotos(res.data);
    };
    fetchPhotos();
  }, [slug]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const closeLightbox = () => {
    setActiveIndex(null);
    if (document.fullscreenElement) document.exitFullscreen();
    setIsFullscreen(false);
  };

  return (
    <>
      <Title>{slug}</Title>

      <PhotosWrapper>
        {photos.map((photo, index) => (
          <PhotoImage
            key={photo.id}
            src={`http://localhost:5000${photo.image_url}`}
            onClick={() => setActiveIndex(index)}
            loading="lazy"
          />
        ))}
      </PhotosWrapper>

      {activeIndex !== null && (
        <Lightbox onClick={closeLightbox}>
          <TopRightControls>
            <ControlButton
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              title="Pantalla completa"
            >
              {isFullscreen ? "⤡" : "⤢"}
            </ControlButton>

            <ControlButton
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              title="Cerrar"
            >
              ×
            </ControlButton>
          </TopRightControls>

          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            navigation
            pagination={{ clickable: true }}
            effect="fade"
            initialSlide={activeIndex}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            loop
            style={{ width: "90%", maxWidth: "1200px", height: "80%" }}
            onClick={(e) => e.stopPropagation()} // evitar cierre al click en imagen
          >
            {photos.map((photo) => (
              <SwiperSlide key={photo.id}>
                <LightboxImage
                  src={`http://localhost:5000${photo.image_url}`}
                  loading="lazy"
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

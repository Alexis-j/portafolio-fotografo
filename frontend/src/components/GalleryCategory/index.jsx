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

/* ================= GRID ================= */

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
  }
`;

const BlockItem = styled.div`
  position: relative;
  overflow: hidden;
  background: #111;
  cursor: pointer;
  max-height: 303px;

  ${({ pos }) => pos === 0 && `grid-column: 1; grid-row: 1;`}
  ${({ pos }) => pos === 1 && `grid-column: 2; grid-row: 1 / span 2; max-height: 630px;`}
  ${({ pos }) => pos === 2 && `grid-column: 3; grid-row: 1;`}
  ${({ pos }) => pos === 3 && `grid-column: 1; grid-row: 2;`}
  ${({ pos }) => pos === 4 && `grid-column: 3; grid-row: 2;`}

  &:hover img {
    transform: scale(1.05);
  }
`;

const BlockImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  gap: 18px;
  z-index: 10;
`;
const IconBox = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
`;
const IconArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ transform }) => transform};
`;
const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent || "#fff"};
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;

  &:hover svg {
    opacity: 0.85;
  }
`;

/* ================= ICONS (SVG – OPCIÓN 2) ================= */
const Arrow = ({ size = 28.8, rotate = 0 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path
      d="
        M 12,4
        L 4,12
        M 6,4
        L 12,4
        L 12,10
      "
    />
  </svg>
);

const ExpandIcon = () => (
  <IconBox>
    <IconArrow transform="translate(-50%, -50%) translate(25px, -25px)">
      <Arrow rotate={0} />
    </IconArrow>

    <IconArrow transform="translate(-50%, -50%) translate(-5px, 2px) rotate(180deg)">
      <Arrow rotate={0} />
    </IconArrow>
  </IconBox>
);
const CollapseIcon = () => (
  <IconBox>
    <IconArrow transform="translate(-50%, -50%) translate(25px, -25px) rotate(180deg)">
      <Arrow rotate={0} />
    </IconArrow>

    <IconArrow transform="translate(-50%, -50%) translate(-2px, 5px)">
      <Arrow rotate={0} />
    </IconArrow>
  </IconBox>
);

/* ================= COMPONENT ================= */

function CategoryPage() {
  const { slug } = useParams();
  const [photos, setPhotos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    api.get(`/gallery/categories/${slug}/photos`).then((res) => {
      setPhotos(res.data);
    });
  }, [slug]);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () =>
      document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const closeLightbox = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    setActiveIndex(null);
  };

  const blocks = [];
  for (let i = 0; i < photos.length; i += 5) {
    blocks.push(photos.slice(i, i + 5));
  }

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
        <Lightbox>
          <Controls>
              <ControlButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                title="Pantalla completa"
              >
                {isFullscreen ? <CollapseIcon /> : <ExpandIcon />}
              </ControlButton>

          </Controls>

          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            navigation
            pagination={{ clickable: true }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            initialSlide={activeIndex}
            style={{ width: "90%", maxWidth: "1200px", height: "85%" }}
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

// src/components/CategoryPage/index.jsx
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import {
  BlockImage,
  BlockItem,
  ControlButton,
  Controls,
  EditorialBlock,
  FullscreenButton,
  GalleryWrapper,
  Lightbox,
  LightboxImage,
  PageTitle,
} from "./styles";
import { CloseIcon, CollapseIcon, ExpandIcon } from "../../components/ui/icons";
import { EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import api from "../../services/api";
import { getImageUrl } from "../../utils/getImageUrl";
import { useParams } from "react-router-dom";

function CategoryPage() {
  const { slug } = useParams();

  // STATES
  const [photos, setPhotos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.matchMedia("(min-width: 769px)").matches);
  const [loading, setLoading] = useState(true);

  const lightboxRef = useRef(null);

  // HOOK: fetch photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await api.get(`/gallery/categories/${slug}/photos`);
        setPhotos(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error al cargar fotos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [slug]);

  // HOOK: detect desktop / mobile
  useEffect(() => {
    const media = window.matchMedia("(min-width: 769px)");
    const handler = () => setIsDesktop(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // HOOK: ESC para cerrar lightbox
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // HOOK: fullscreen change
  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // FUNCIONES LIGHTBOX
  const openLightbox = (index) => {
    setActiveIndex(index);
    setIsMounted(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const closeLightbox = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
      setActiveIndex(null);
      if (document.fullscreenElement) document.exitFullscreen();
    }, 300);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && lightboxRef.current) {
      lightboxRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Crear bloques de 5 fotos
  const blocks = [];
  for (let i = 0; i < photos.length; i += 5) blocks.push(photos.slice(i, i + 5));

  // RETURNS condicionales
  if (loading) return <p>Cargando fotos...</p>;
  if (photos.length === 0) return <p>No hay fotos disponibles</p>;

  return (
    <>
      <PageTitle>{slug}</PageTitle>

      <GalleryWrapper>
        {blocks.map((block, bIndex) => (
          <EditorialBlock key={bIndex}>
            {block.map((photo, index) => (
              <BlockItem
                key={photo.id}
                $pos={index}
                onClick={() => openLightbox(bIndex * 5 + index)}
              >
                <BlockImage
                  src={getImageUrl(photo.image_url)}
                  loading="lazy"
                  onLoad={(e) => (e.currentTarget.dataset.loaded = "true")}
                />
              </BlockItem>
            ))}
          </EditorialBlock>
        ))}
      </GalleryWrapper>

      {isMounted && (
        <Lightbox $visible={isVisible} ref={lightboxRef}>
          {isDesktop && (
            <Controls>
              <ControlButton onClick={closeLightbox}>
                <CloseIcon />
              </ControlButton>
              <FullscreenButton onClick={toggleFullscreen}>
                {isFullscreen ? <CollapseIcon /> : <ExpandIcon />}
              </FullscreenButton>
            </Controls>
          )}

          {!isDesktop && (
            <ControlButton
              onClick={closeLightbox}
              style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
            >
              <CloseIcon />
            </ControlButton>
          )}

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Swiper
              key={activeIndex} // fuerza Swiper a abrir en la foto correcta
              modules={[Navigation, Pagination, EffectFade, Keyboard]}
              navigation={isDesktop}
              keyboard={{ enabled: true, onlyInViewport: false }}
              pagination={{ clickable: true }}
              effect={isDesktop ? "fade" : "slide"}
              fadeEffect={{ crossFade: true }}
              loop
              initialSlide={activeIndex}
              style={{ width: "90%", maxWidth: "1200px", height: "85%" }}
            >
              {photos.map((photo) => (
                <SwiperSlide key={photo.id}>
                  <LightboxImage src={getImageUrl(photo.image_url)} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Lightbox>
      )}
    </>
  );
}

export default CategoryPage;

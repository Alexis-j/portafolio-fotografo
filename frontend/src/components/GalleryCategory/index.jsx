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
  const [photos, setPhotos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // para fade de entrada/salida
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 769px)").matches
  );
  const lightboxRef = useRef(null);

  // Fetch photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await api.get(`/gallery/categories/${slug}/photos`);
        setPhotos(res.data);
      } catch (err) {
        console.error("Error al cargar fotos:", err);
      }
    };
    fetchPhotos();
  }, [slug]);

  // Abrir lightbox con fade
  const openLightbox = (index) => {
    setActiveIndex(index);
    setIsMounted(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  // Cerrar lightbox con fade
  const closeLightbox = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
      setActiveIndex(null);
      if (document.fullscreenElement) document.exitFullscreen();
    }, 300);
  };

  // Detect desktop/mobile
  useEffect(() => {
    const media = window.matchMedia("(min-width: 769px)");
    const handler = () => setIsDesktop(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Close lightbox on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Listen fullscreen changes
  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

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

  return (
    <>
      <PageTitle>{slug}</PageTitle>

      <GalleryWrapper>
        {blocks.map((block, bIndex) => (
          <EditorialBlock key={bIndex}>
            {block.map((photo, index) => (
              <BlockItem
                key={photo.id}
                $pos={index} // prop transiente
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

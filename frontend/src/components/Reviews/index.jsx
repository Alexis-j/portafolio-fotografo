import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import {
  ClientLink,
  ClientName,
  ClientPhoto,
  ClientText,
  Divider,
  PhotoWrapper,
  ReviewsWrapper,
  SlideWrapper,
  TextBox
} from "./styles";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import api from "../../services/api";
import { getImageUrl } from "../../utils/getImageUrl";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews");

        // Asegurarnos de que siempre sea un array
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setReviews(data);
      } catch (err) {
        console.error("Error loading reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Cargando reseñas...</p>;
  if (reviews.length === 0) return <p>No hay reseñas disponibles.</p>;

  return (
    <ReviewsWrapper>
      <h1>Reseñas de Clientes</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {reviews.map((r, index) => {
          const layout = index % 6;
          const isValidLink = r.link && r.link.startsWith("http");

          return (
            <SwiperSlide key={r.id}>
              <SlideWrapper>
                <PhotoWrapper layout={layout}>
                  <ClientPhoto
                    src={getImageUrl(r.client_photo)}
                    alt={r.client_name}
                  />
                </PhotoWrapper>

                <TextBox layout={layout}>
                  <ClientText>{r.review_text}</ClientText>
                  <Divider />
                  {isValidLink ? (
                    <ClientLink
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ClientName>{r.client_name}</ClientName>
                    </ClientLink>
                  ) : (
                    <ClientName>{r.client_name}</ClientName>
                  )}
                </TextBox>
              </SlideWrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </ReviewsWrapper>
  );
}

export default Reviews;

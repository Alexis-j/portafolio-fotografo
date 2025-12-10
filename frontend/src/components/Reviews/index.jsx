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
  PhotoWrapper,
  ReviewsWrapper,
  SlideWrapper,
  TextBox
} from "./styles";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import api from "../../services/api";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews");
        setReviews(res.data);
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
    <ReviewsWrapper variant={reviews.length % 5}>

      <h2>Reseñas de Clientes</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {reviews.map((r) => (
          <SwiperSlide key={r.id}>
            <SlideWrapper>
              <PhotoWrapper>
                <ClientPhoto
                  src={`http://localhost:5000/uploads/${r.client_photo}`}
                  alt={r.client_name}
                />
              </PhotoWrapper>

              <TextBox>
                <ClientName>{r.client_name}</ClientName>
                <ClientText>{r.review_text}</ClientText>

                {r.link && (
                  <ClientLink
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver perfil
                  </ClientLink>
                )}
              </TextBox>
            </SlideWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </ReviewsWrapper>
  );
}

export default Reviews;

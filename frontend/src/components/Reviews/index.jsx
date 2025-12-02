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
  TextBox,
} from "./styles";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import api from "../../services/api";

function Resenas() {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResenas = async () => {
      try {
        const res = await api.get("/resenas");
        setResenas(res.data);
      } catch (err) {
        console.error("Error al cargar reseñas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResenas();
  }, []);

  if (loading) return <p>Cargando reseñas...</p>;
  if (resenas.length === 0) return <p>No hay reseñas disponibles.</p>;

  return (
    <ReviewsWrapper>
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
        {resenas.map((r) => (
<SwiperSlide key={r.id}>
  <SlideWrapper>
    <PhotoWrapper>
      <ClientPhoto
        src={`http://localhost:5000/uploads/${r.foto_cliente}`}
        alt={r.nombre_cliente}
      />
    </PhotoWrapper>

    <TextBox>
      <ClientName>{r.nombre_cliente}</ClientName>
      <ClientText>{r.texto}</ClientText>

      {r.link && (
        <ClientLink href={r.link} target="_blank" rel="noopener noreferrer">
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

export default Resenas;

import { ClientLink, ClientName, ClientPhoto, ClientText, ReviewCard, ReviewsGrid, ReviewsWrapper } from "./styles";
// src/components/reviews/index.jsx
import React, { useEffect, useState } from "react";

import api from "../../services/api"; // Asegúrate que apunta al axios configurado

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
      <ReviewsGrid>
        {resenas.map((r) => (
          <ReviewCard key={r.id}>
            {r.foto_cliente && <ClientPhoto src={`http://localhost:5000/uploads/${r.foto_cliente}`} alt={r.nombre_cliente} />}
            <ClientName>{r.nombre_cliente}</ClientName>
            <ClientText>{r.texto}</ClientText>
            {r.link && <ClientLink href={r.link} target="_blank" rel="noopener noreferrer">Ver perfil</ClientLink>}
          </ReviewCard>
        ))}
      </ReviewsGrid>
    </ReviewsWrapper>
  );
}

export default Resenas;

// src/pages/admin/ReviewsList.jsx
import {
  PreviewImage,
  ReviewActions,
  ReviewCard,
  ReviewText,
  ReviewsWrapper,
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from "react";

import Button from "../../../components/ui/Button";
import api from "../../../services/api";
import { getImageUrl } from "../../../utils/getImageUrl";
import { useNavigate } from "react-router-dom";

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const res = await api.get("/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Error al cargar reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar esta reseña?")) return;

    try {
      await api.delete(`/reviews/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchReviews();
    } catch (err) {
      console.error("Error al borrar review:", err);
    }
  };

  return (
    <ReviewsWrapper>
      <h2>Reseñas</h2>
      <Button variant="create" onClick={() => navigate("/admin/dashboard/reviews/new")}>
        ➕ Nueva Reseña
      </Button>

      {reviews.map((r) => (
        <ReviewCard key={r.id}>
          <ReviewText>
            <p><strong>{r.client_name}</strong></p>
            <p>{r.review_text}</p>
          </ReviewText>

          {r.client_photo && (
            <PreviewImage src={getImageUrl(r.client_photo)} />
          )}

          <ReviewActions>
            <Button variant="login" onClick={() => navigate(`/admin/dashboard/reviews/${r.id}`)}>
              Editar
            </Button>
            <Button variant="cancel" onClick={() => handleDelete(r.id)}>
              Borrar
            </Button>
          </ReviewActions>
        </ReviewCard>
      ))}
    </ReviewsWrapper>
  );
}

export default ReviewsList;

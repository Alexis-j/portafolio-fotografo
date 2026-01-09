// src/pages/admin/ReviewsForm.jsx
import {
  FormWrapper,
  Input,
  Label,
  PreviewImage,
  TextArea,
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/ui/Button";
import api from "../../../services/api";
import { getImageUrl } from "../../../utils/getImageUrl";

function ReviewsForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clientName, setClientName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [link, setLink] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchReview = async () => {
      try {
        const res = await api.get(`/reviews`);
        const foundReview = res.data.find((r) => r.id === parseInt(id));
        if (!foundReview) return;

        setClientName(foundReview.client_name);
        setReviewText(foundReview.review_text);
        setLink(foundReview.link);

        if (foundReview.client_photo) {
          setPhotoPreview(getImageUrl(foundReview.client_photo));
        }
      } catch (err) {
        console.error("Error al cargar review:", err);
      }
    };

    fetchReview();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // preview local sigue igual
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("client_name", clientName);
    formData.append("review_text", reviewText);
    formData.append("link", link);
    if (photo) formData.append("client_photo", photo);

    try {
      if (id) {
        await api.put(`/reviews/${id}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Reseña actualizada ✅");
      } else {
        await api.post(`/reviews`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Reseña creada ✅");
      }

      navigate("/admin/dashboard/reviews");
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Error al guardar la reseña");
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h2>{id ? "Editar Reseña" : "Nueva Reseña"}</h2>

      <Label>Nombre</Label>
      <Input value={clientName} onChange={(e) => setClientName(e.target.value)} required />

      <Label>Texto</Label>
      <TextArea value={reviewText} onChange={(e) => setReviewText(e.target.value)} required />

      <Label>Link</Label>
      <Input value={link} onChange={(e) => setLink(e.target.value)} />

      <Label>Foto</Label>
      {photoPreview && <PreviewImage src={photoPreview} />}
      <Input type="file" onChange={handleFileChange} />

      <Button variant="login">{id ? "Guardar" : "Crear"}</Button>
      <Button
        variant="cancel"
        type="button"
        onClick={() => navigate("/admin/dashboard/reviews")}
      >
        Cancelar
      </Button>
    </FormWrapper>
  );
}

export default ReviewsForm;

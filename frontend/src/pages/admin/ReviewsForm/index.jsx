import {
  CloseWrapper,
  FormBox,
  FormWrapper,
  Input,
  Label,
  PreviewImage,
  ReviewActions,
  ReviewCard,
  ReviewText,
  ReviewsFormWrapper,
  TextArea,
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/ui/Button";
import TooltipWithText from "../../../components/TooltipWithText";
import { X } from "lucide-react";
import api from "../../../services/api";

function ResenasForm() {
  const { id } = useParams();

  // ---------- FORM STATES ----------
  const [resena, setResena] = useState(null);
  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [link, setLink] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  // ---------- LISTA DE RESEÑAS ----------
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  // =========================
  //   CARGAR RESEÑAS
  // =========================
  const fetchReviews = async () => {
    try {
      const res = await api.get("/resenas");
      setReviews(res.data);
    } catch (err) {
      console.error("Error al cargar reseñas:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // =========================
  //   CARGAR RESEÑA PARA EDITAR
  // =========================
  useEffect(() => {
    if (!id) return;

    const fetchResena = async () => {
      try {
        const res = await api.get(`/resenas/${id}`);

        setResena(res.data);
        setNombre(res.data.nombre_cliente || "");
        setTexto(res.data.texto || "");
        setLink(res.data.link || "");

        if (res.data.foto_cliente) {
          setFotoPreview(`http://localhost:5000/uploads/${res.data.foto_cliente}`);
        }
      } catch (err) {
        console.error("Error al cargar reseña:", err);
      }
    };

    fetchResena();
  }, [id]);

  // =========================
  //   PREVISUALIZACIÓN DE FOTO
  // =========================
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  // =========================
  //  CREAR / EDITAR
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("nombre_cliente", nombre);
    formData.append("texto", texto);
    formData.append("link", link);
    if (foto) formData.append("foto_cliente", foto);

    try {
      if (id) {
        await api.put(`/resenas/${id}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Reseña actualizada ✅");
      } else {
        await api.post("/resenas", formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Reseña creada ✅");
      }

      navigate("/admin");
    } catch (err) {
      console.error("Error al guardar reseña:", err);
    }
  };

  // =========================
  //  BORRAR
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar esta reseña?")) return;

    try {
      await api.delete(`/resenas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      fetchReviews(); // recargar lista
    } catch (err) {
      console.error("Error al borrar reseña:", err);
    }
  };

  // =========================
  //  CERRAR FORM
  // =========================
  const handleClose = () => navigate("/admin");

  // =========================
  //  IR A EDITAR
  // =========================
  const handleEdit = (rid) => {
    navigate(`/admin/dashboard/reviews/${rid}`);
  };

  return (
    <ReviewsFormWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <CloseWrapper>
          <TooltipWithText text="Al cerrar serás redirigido sin guardar cambios.">
            <Button variant="ghost" type="button" onClick={handleClose}>
              <X size={20} />
            </Button>
          </TooltipWithText>
        </CloseWrapper>

        <h2>{id ? "Editar Reseña" : "Nueva Reseña"}</h2>

        <Label>Nombre del Cliente</Label>
        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <Label>Texto de la reseña</Label>
        <TextArea value={texto} onChange={(e) => setTexto(e.target.value)} required />

        <Label>Link (opcional)</Label>
        <Input value={link} onChange={(e) => setLink(e.target.value)} />

        <Label>Foto del Cliente</Label>
        {fotoPreview && <PreviewImage src={fotoPreview} />}
        <Input type="file" onChange={handleFileChange} />

        <Button variant="login">{id ? "Guardar cambios" : "Crear Reseña"}</Button>
        <Button variant="cancel" type="button" onClick={handleClose}>
          Cancelar
        </Button>
      </FormWrapper>

      <FormBox>
        <CloseWrapper>
          <TooltipWithText text="Al cerrar serás redirigido sin guardar cambios.">
            <Button variant="ghost" type="button" onClick={handleClose}>
              <X size={20} />
            </Button>
          </TooltipWithText>
        </CloseWrapper>

        <h3>Reseñas existentes</h3>
        {reviews.map((r) => (
          <ReviewCard key={r.id}>
            <ReviewText>
              <p><strong>{r.nombre_cliente}</strong></p>
              <p>{r.texto}</p>
            </ReviewText>

            {r.foto_cliente && (
              <PreviewImage src={`http://localhost:5000/uploads/${r.foto_cliente}`} />
            )}

            <ReviewActions>
              <Button type="button" variant="login" onClick={() => handleEdit(r.id)}>
                Editar
              </Button>

              <Button type="button" variant="cancel" onClick={() => handleDelete(r.id)}>
                Borrar
              </Button>

            </ReviewActions>
          </ReviewCard>
        ))}
      </FormBox>
    </ReviewsFormWrapper>
  );
}

export default ResenasForm;

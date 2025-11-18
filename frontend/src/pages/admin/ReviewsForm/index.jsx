import {
  CloseWrapper,
  FormWrapper,
  Input,
  Label,
  PreviewImage,
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/ui/Button";
import TooltipWithText from "../../../components/TooltipWithText";
import { X } from "lucide-react";
import api from "../../../services/api";

function ResenasForm() {
  const { id } = useParams(); // Si vamos a editar, pasamos el id
  const [resena, setResena] = useState(null);
  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [link, setLink] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  const navigate = useNavigate();

  // 📌 Obtener reseña si hay id (editar)
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

  // 📌 Previsualización de la foto
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  // 📌 Guardar o crear reseña
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre_cliente", nombre);
    formData.append("texto", texto);
    formData.append("link", link);
    if (foto) formData.append("foto_cliente", foto);

    try {
      if (id) {
        // Editar
        await api.put(`/resenas/${id}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Reseña actualizada ✅");
      } else {
        // Crear
        await api.post("/resenas", formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Reseña creada ✅");
      }
      navigate("/admin");
    } catch (err) {
      console.error("Error al guardar reseña:", err);
      alert("Error al guardar la reseña");
    }
  };

  const handleClose = () => navigate("/admin");

  return (
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
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        required
        style={{
          padding: "0.7rem",
          minHeight: "100px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />

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
  );
}

export default ResenasForm;

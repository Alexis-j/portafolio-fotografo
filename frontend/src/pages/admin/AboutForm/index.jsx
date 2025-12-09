import {
  CloseWrapper,
  FormWrapper,
  Input,
  Label,
  PreviewImage,
  PreviewImageVertical,
  TextArea,
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from "react";

import Button from "../../../components/ui/Button";
import TooltipWithText from "../../../components/TooltipWithText";
import { X } from "lucide-react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

function AboutForm() {
  const [about, setAbout] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [imagenLight, setImagenLight] = useState(null);
  const [imagenLightPreview, setImagenLightPreview] = useState(null);

  const [imagenDark, setImagenDark] = useState(null);
  const [imagenDarkPreview, setImagenDarkPreview] = useState(null);

  const navigate = useNavigate();

  // 📌 Obtener About al cargar
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        setAbout(res.data);
        setTitulo(res.data.titulo || "");
        setDescripcion(res.data.descripcion || "");
      } catch (err) {
        console.error("Error al cargar About:", err);
      }
    };
    fetchAbout();
  }, []);

  // 📌 Previsualización de imágenes
  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 📌 Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    if (imagenLight) formData.append("imagen_light", imagenLight);
    if (imagenDark) formData.append("imagen_dark", imagenDark);

    try {
      // eslint-disable-next-line no-unused-vars
      const res = await api.put("/about", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert("About actualizado con éxito");
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      alert("Error al actualizar");
    }
  };

  // 📌 Cerrar
  const handleClose = () => navigate("/");

  if (!about) return <p>Cargando...</p>;

  return (
    <FormWrapper onSubmit={handleSubmit}>

      {/* Botón cerrar */}
      <CloseWrapper>
        <TooltipWithText text="Al cerrar Seras redirigido al landing sin guardar.">
          <Button variant="ghost" type="button" onClick={handleClose}>
            <X size={20} />
          </Button>
        </TooltipWithText>
      </CloseWrapper>

      <h2>Editar About Me</h2>

      <Label>Título</Label>
      <Input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <Label>Descripción</Label>
      <TextArea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      {/* Imagen Light */}
      <Label>Imagen Light</Label>
      {imagenLightPreview ? (
        <PreviewImage src={imagenLightPreview} />
      ) : (
        about.imagen_light && (
          <PreviewImageVertical src={`http://localhost:5000/uploads/${about.imagen_light}`} />
        )
      )}
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setImagenLight, setImagenLightPreview)}
      />

      {/* Imagen Dark */}
      <Label>Imagen Dark</Label>
      {imagenDarkPreview ? (
        <PreviewImageVertical src={imagenDarkPreview} />
      ) : (
        about.imagen_dark && (
          <PreviewImageVertical src={`http://localhost:5000/uploads/${about.imagen_dark}`} />
        )
      )}
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setImagenDark, setImagenDarkPreview)}
      />

      <Button variant="login">Guardar cambios</Button>
      <Button variant="cancel" type="button" onClick={handleClose}>
        Cancelar
      </Button>

    </FormWrapper>
  );
}

export default AboutForm;

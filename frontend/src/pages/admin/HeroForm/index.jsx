import {CloseWrapper, FormWrapper, Input, Label, PreviewImage, ShowTextWrapper} from './styles';
import React, { useEffect, useState } from 'react';

import Button from '../../../components/ui/Button';
import TooltipWithText from "../../../components/TooltipWithText";
import { X } from "lucide-react";
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

function HeroForm() {
  const [hero, setHero] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [mostrarTexto, setMostrarTexto] = useState(true);

  // 🔹 Estados de archivos y previews
  const [imagenLight, setImagenLight] = useState(null);
  const [imagenLightPreview, setImagenLightPreview] = useState(null);

  const [imagenDark, setImagenDark] = useState(null);
  const [imagenDarkPreview, setImagenDarkPreview] = useState(null);

  const [logoLight, setLogoLight] = useState(null);
  const [logoLightPreview, setLogoLightPreview] = useState(null);

  const [logoDark, setLogoDark] = useState(null);
  const [logoDarkPreview, setLogoDarkPreview] = useState(null);

  const navigate = useNavigate();

  // 📌 Obtener el hero actual al cargar
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get('/hero');
        if (res.data.length > 0) {
          const h = res.data[0];
          setHero(h);
          setTitulo(h.titulo || '');
          setSubtitulo(h.subtitulo || '');
          setMostrarTexto(h.mostrar_texto);
        }
      } catch (err) {
        console.error('Error al cargar hero:', err);
      }
    };
    fetchHero();
  }, []);

  // 📌 Manejar cambio de archivos
  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // guardamos archivo real
      setPreview(URL.createObjectURL(file)); // generamos preview
    }
  };

  // 📌 Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hero) return;

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('subtitulo', subtitulo);
    formData.append('mostrar_texto', mostrarTexto);

    if (imagenLight) formData.append('imagen_light', imagenLight);
    if (imagenDark) formData.append('imagen_dark', imagenDark);
    if (logoLight) formData.append('logo_light', logoLight);
    if (logoDark) formData.append('logo_dark', logoDark);

    try {
      await api.put(`/hero/${hero.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Hero actualizado con éxito ✅');
      navigate('/');
    } catch (err) {
      console.error('Error al actualizar hero:', err);
      alert('Error al actualizar hero ❌');
    }
  };

    const handleClose = () => navigate("/");


  if (!hero) return <p>Cargando...</p>;

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <CloseWrapper>
          <TooltipWithText text="Al cerrar serás redirigido al landing page sin cambios realizados.">
      <Button variant="ghost" type="button" onClick={handleClose}>
        <X size={20} />
      </Button>
    </TooltipWithText>
        </CloseWrapper>
      <Label>Título</Label>
      <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

      <Label>Subtítulo</Label>
      <Input value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} />

      <ShowTextWrapper>
      <Label>Mostrar texto</Label>
      <input
        type="checkbox"
        checked={mostrarTexto}
        onChange={() => setMostrarTexto((prev) => !prev)}
      />
      </ShowTextWrapper>


      {/* Imagen Light */}
      {imagenLightPreview ? (
        <PreviewImage src={imagenLightPreview} />
      ) : (
        hero.imagen_light && (
          <PreviewImage src={`http://localhost:5000/uploads/${hero.imagen_light}`} />
        )
      )}
      <Label>Fondo Claro</Label>
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setImagenLight, setImagenLightPreview)}
      />

      {/* Imagen Dark */}

      {imagenDarkPreview ? (
        <PreviewImage src={imagenDarkPreview} />
      ) : (
        hero.imagen_dark && (
          <PreviewImage src={`http://localhost:5000/uploads/${hero.imagen_dark}`} />
        )
      )}
      <Label>Fondo Oscuro</Label>
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setImagenDark, setImagenDarkPreview)}
      />

      {/* Logo Light */}
      <Label>Logo para Fondo Claro</Label>
      {logoLightPreview ? (
        <PreviewImage src={logoLightPreview} />
      ) : (
        hero.logo_light && (
          <PreviewImage src={`http://localhost:5000/uploads/${hero.logo_light}`} />
        )
      )}
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setLogoLight, setLogoLightPreview)}
      />

      {/* Logo Dark */}
      <Label>Logo Para fondo Claro</Label>
      {logoDarkPreview ? (
        <PreviewImage src={logoDarkPreview} />
      ) : (
        hero.logo_dark && (
          <PreviewImage src={`http://localhost:5000/uploads/${hero.logo_dark}`} />
        )
      )}
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setLogoDark, setLogoDarkPreview)}
        />

        <Button variant="login">Guardar cambios</Button>
        <Button variant="cancel">Cancelar</Button>

    </FormWrapper>
  );
}

export default HeroForm;

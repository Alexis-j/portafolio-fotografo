import {
  CloseWrapper,
  FormWrapper,
  Input,
  Label,
  PreviewImage,
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from 'react';

import Button from '../../../components/ui/Button';
import TooltipWithText from "../../../components/TooltipWithText";
import { X } from "lucide-react";
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

function HeroForm() {
  const [hero, setHero] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [ShowText, setShowText] = useState(true);

  // 🔹 Estados de archivos y previews
  const [imageLight, setImageLight] = useState(null);
  const [imageLightPreview, setImageLightPreview] = useState(null);

  const [imageDark, setImageDark] = useState(null);
  const [imageDarkPreview, setImageDarkPreview] = useState(null);

  const [logoLight, setLogoLight] = useState(null);
  const [logoLightPreview, setLogoLightPreview] = useState(null);

  const [logoDark, setLogoDark] = useState(null);
  const [logoDarkPreview, setLogoDarkPreview] = useState(null);

  const [imageMobileLight, setImageMobileLight] = useState(null);
  const [imageMobileLightPreview, setImageMobileLightPreview] = useState(null);

  const [imageMobileDark, setImageMobileDark] = useState(null);
  const [imageMobileDarkPreview, setImageMobileDarkPreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get('/hero');
        if (res.data.length > 0) {
          const h = res.data[0];
          setHero(h);
          setTitle(h.title || '');
          setSubtitle(h.subtitle || '');
          setShowText(h.show_text); // 👈 coincide con DB
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
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('show_text', ShowText); // 👈 coincide con DB

    if (imageLight) formData.append('image_light', imageLight);
    if (imageDark) formData.append('image_dark', imageDark);
    if (logoLight) formData.append('logo_light', logoLight);
    if (logoDark) formData.append('logo_dark', logoDark);
    if (imageMobileLight) formData.append('image_mobile_light', imageMobileLight);
    if (imageMobileDark) formData.append('image_mobile_dark', imageMobileDark);

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

      {/* Imagen Light */}
      {imageLightPreview ? (
        <PreviewImage src={imageLightPreview} />
      ) : (
        hero.image_light && (
          <PreviewImage src={`http://localhost:5000/uploads/${hero.image_light}`} />
        )
      )}
      <Label>Fondo Claro</Label>
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setImageLight, setImageLightPreview)}
      />

      {/* Imagen Dark */}
      {imageDarkPreview ? (
        <PreviewImage src={imageDarkPreview} />
      ) : (
        hero.image_dark && (
          <PreviewImage src={`http://localhost:5000/uploads/${hero.image_dark}`} />
        )
      )}
      <Label>Fondo Oscuro</Label>
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setImageDark, setImageDarkPreview)}
      />

      {/* Imagen Mobile Light */}
      {imageMobileLightPreview ? (
        <PreviewImage src={imageMobileLightPreview} />
      ) : (
        hero.image_mobile_light && (
          <PreviewImage src={`http://localhost:5000/uploads/${hero.image_mobile_light}`} />
        )
      )}
      <Label>Fondo Móvil Claro</Label>
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setImageMobileLight, setImageMobileLightPreview)}
      />

      {/* Imagen Mobile Dark */}
      {imageMobileDarkPreview ? (
        <PreviewImage src={imageMobileDarkPreview} />
      ) : (
        hero.image_mobile_dark && (
          <PreviewImage src={`http://localhost:5000/uploads/${hero.image_mobile_dark}`} />
        )
      )}
      <Label>Fondo Móvil Oscuro</Label>
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setImageMobileDark, setImageMobileDarkPreview)}
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
      <Label>Logo Para Fondo Oscuro</Label>
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
      <Button variant="cancel" type="button" onClick={handleClose}>Cancelar</Button>
    </FormWrapper>
  );
}

export default HeroForm;

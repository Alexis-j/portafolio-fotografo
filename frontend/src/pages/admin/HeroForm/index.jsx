// src/pages/admin/HeroForm.jsx
import {
  CloseWrapper,
  FormWrapper,
  Input,
  Label,
  PreviewImage,
} from "../../../components/FormStyles/FormStyles";
import React, { useEffect, useState } from "react";

import Button from "../../../components/ui/Button";
import TooltipWithText from "../../../components/TooltipWithText";
import { X } from "lucide-react";
<<<<<<< HEAD
import api from '../../../services/api';
import { getImageUrl } from '../../../utils/getImageUrl'; // 🔹 Importamos la función
import { useNavigate } from 'react-router-dom';

function HeroForm() {
  const [hero, setHero] = useState({
    title: '',
    subtitle: '',
    show_text: true,
    image_light: '',
    image_dark: '',
    image_mobile_light: '',
    image_mobile_dark: '',
    logo_light: '',
    logo_dark: ''
  });

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
=======
import api from "../../../services/api";
import { getImageUrl } from "../../../utils/getImageUrl";
import { useNavigate } from "react-router-dom";

function HeroForm() {
  const [hero, setHero] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
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

  // 🔹 Cargar hero desde API
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get("/hero");
        if (res.data.length > 0) {
          const h = res.data[0];
          setHero(h);
<<<<<<< HEAD
          setTitle(h.title || '');
          setSubtitle(h.subtitle || '');
          setShowText(h.show_text ?? true);
=======
          setTitle(h.title || "");
          setSubtitle(h.subtitle || "");
          setShowText(h.show_text);
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
        }
      } catch (err) {
        console.error("Error al cargar hero:", err);
      }
    };
    fetchHero();
  }, []);

  // 📌 Manejar cambio de archivos
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
<<<<<<< HEAD
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('show_text', ShowText);
=======
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("show_text", ShowText);
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327

    if (imageLight) formData.append("image_light", imageLight);
    if (imageDark) formData.append("image_dark", imageDark);
    if (logoLight) formData.append("logo_light", logoLight);
    if (logoDark) formData.append("logo_dark", logoDark);
    if (imageMobileLight) formData.append("image_mobile_light", imageMobileLight);
    if (imageMobileDark) formData.append("image_mobile_dark", imageMobileDark);

    try {
<<<<<<< HEAD
      if (hero.id) {
        await api.put(`/hero/${hero.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Hero actualizado con éxito ✅');
      } else {
        await api.post(`/hero`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Hero creado con éxito ✅');
      }
      navigate('/');
    } catch (err) {
      console.error('Error al guardar hero:', err);
      alert('Error al guardar hero ❌');
=======
      await api.put(`/hero/${hero.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Hero actualizado con éxito ✅");
      navigate("/");
    } catch (err) {
      console.error("Error al actualizar hero:", err);
      alert("Error al actualizar hero ❌");
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
    }
  };

  const handleClose = () => navigate("/");

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
<<<<<<< HEAD
      {imageLightPreview ? (
        <PreviewImage src={imageLightPreview} />
      ) : (
        hero.image_light && (
          <PreviewImage src={getImageUrl(hero.image_light)} />
        )
      )}
=======
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
      <Label>Fondo Claro</Label>
      <PreviewImage
        src={
          imageLightPreview ||
          (hero.image_light ? getImageUrl(hero.image_light) : "")
        }
      />
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setImageLight, setImageLightPreview)}
      />

      {/* Imagen Dark */}
<<<<<<< HEAD
      {imageDarkPreview ? (
        <PreviewImage src={imageDarkPreview} />
      ) : (
        hero.image_dark && (
          <PreviewImage src={getImageUrl(hero.image_dark)} />
        )
      )}
=======
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
      <Label>Fondo Oscuro</Label>
      <PreviewImage
        src={
          imageDarkPreview ||
          (hero.image_dark ? getImageUrl(hero.image_dark) : "")
        }
      />
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setImageDark, setImageDarkPreview)}
      />

      {/* Imagen Mobile Light */}
<<<<<<< HEAD
      {imageMobileLightPreview ? (
        <PreviewImage src={imageMobileLightPreview} />
      ) : (
        hero.image_mobile_light && (
          <PreviewImage src={getImageUrl(hero.image_mobile_light)} />
        )
      )}
=======
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
      <Label>Fondo Móvil Claro</Label>
      <PreviewImage
        src={
          imageMobileLightPreview ||
          (hero.image_mobile_light ? getImageUrl(hero.image_mobile_light) : "")
        }
      />
      <Input
        type="file"
        onChange={(e) =>
          handleFileChange(e, setImageMobileLight, setImageMobileLightPreview)
        }
      />

      {/* Imagen Mobile Dark */}
<<<<<<< HEAD
      {imageMobileDarkPreview ? (
        <PreviewImage src={imageMobileDarkPreview} />
      ) : (
        hero.image_mobile_dark && (
          <PreviewImage src={getImageUrl(hero.image_mobile_dark)} />
        )
      )}
=======
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
      <Label>Fondo Móvil Oscuro</Label>
      <PreviewImage
        src={
          imageMobileDarkPreview ||
          (hero.image_mobile_dark ? getImageUrl(hero.image_mobile_dark) : "")
        }
      />
      <Input
        type="file"
        onChange={(e) =>
          handleFileChange(e, setImageMobileDark, setImageMobileDarkPreview)
        }
      />

      {/* Logo Light */}
      <Label>Logo para Fondo Claro</Label>
<<<<<<< HEAD
      {logoLightPreview ? (
        <PreviewImage src={logoLightPreview} />
      ) : (
        hero.logo_light && (
          <PreviewImage src={getImageUrl(hero.logo_light)} />
        )
      )}
=======
      <PreviewImage
        src={logoLightPreview || (hero.logo_light ? getImageUrl(hero.logo_light) : "")}
      />
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setLogoLight, setLogoLightPreview)}
      />

      {/* Logo Dark */}
      <Label>Logo Para Fondo Oscuro</Label>
<<<<<<< HEAD
      {logoDarkPreview ? (
        <PreviewImage src={logoDarkPreview} />
      ) : (
        hero.logo_dark && (
          <PreviewImage src={getImageUrl(hero.logo_dark)} />
        )
      )}
=======
      <PreviewImage
        src={logoDarkPreview || (hero.logo_dark ? getImageUrl(hero.logo_dark) : "")}
      />
>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
      <Input
        type="file"
        onChange={(e) => handleFileChange(e, setLogoDark, setLogoDarkPreview)}
      />

      <Button variant="login">Guardar cambios</Button>
      <Button variant="cancel" type="button" onClick={handleClose}>
        Cancelar
      </Button>
    </FormWrapper>
  );
}

export default HeroForm;

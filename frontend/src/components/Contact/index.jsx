// src/components/Contact/index.jsx
import {
  AltContact,
  Button,
  ContactDescription,
  ContactTitle,
  ContactWrapper,
  Form,
  Input,
  LeftSide,
  Photo,
  RightSide,
  Select,
  TextArea,
} from "./styles";
import React, { useEffect, useState } from "react";

import api from "../../services/api";
import { getImageUrl } from "../../utils/getImageUrl";
import { useTheme } from "styled-components";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "",
    message: "",
  });

  const [about, setAbout] = useState(null);
  const theme = useTheme();

  // Traer la info de About para mostrar la imagen
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        setAbout(res.data);
      } catch (err) {
        console.error("Error al cargar About:", err);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Usamos la instancia de Axios (api) en lugar de fetch
      const res = await api.post("/contact", form);

      if (res.status === 200) {
        alert("Mensaje enviado correctamente");
        setForm({
          name: "",
          email: "",
          phone: "",
          sessionType: "",
          message: "",
        });
      } else {
        alert("Error al enviar el mensaje");
      }
    } catch (err) {
      console.error("Error al enviar:", err);
      alert("Error al enviar el mensaje");
    }
  };

  if (!about) return <p>Cargando...</p>;

  // Imagen según tema usando getImageUrl
  const imgSrc =
    theme.colors.background === "#2c2c2c"
      ? getImageUrl(about.imagen_dark)
      : getImageUrl(about.imagen_light);

  return (
    <ContactWrapper>
      <LeftSide>
        <ContactTitle>¿Tienes una idea en mente?</ContactTitle>
        <ContactDescription>
          Cuéntame los detalles y me pondré en contacto contigo.
        </ContactDescription>

        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Teléfono (opcional)"
            value={form.phone}
            onChange={handleChange}
          />

          <Select
            name="sessionType"
            value={form.sessionType}
            onChange={handleChange}
            required
          >
            <option value="">Tipo de sesión</option>
            <option value="Boda">Boda</option>
            <option value="Retrato">Retrato</option>
            <option value="Evento">Evento</option>
            <option value="Comercial">Comercial</option>
            <option value="Otro">Otro</option>
          </Select>

          <TextArea
            name="message"
            placeholder="Mensaje"
            value={form.message}
            onChange={handleChange}
            required
          />

          <Button type="submit">Enviar mensaje</Button>
        </Form>

        <AltContact>
          O escríbeme directamente a <strong>contacto@fotografo.com</strong>
        </AltContact>
      </LeftSide>

      <RightSide>
        <Photo src={imgSrc} alt="Contacto" />
      </RightSide>
    </ContactWrapper>
  );
}

export default Contact;

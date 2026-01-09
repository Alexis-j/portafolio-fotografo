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

  // Traer la imagen de About para mostrar a la derecha
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
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
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

  // Imagen según tema
  const imgSrc =
    theme.colors.background === "#2c2c2c"
      ? about.imagen_dark
      : about.imagen_light;

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
        <Photo
          src={`http://localhost:5000/uploads/${imgSrc}`}
          alt="Contacto"
        />
      </RightSide>
    </ContactWrapper>
  );
}

export default Contact;

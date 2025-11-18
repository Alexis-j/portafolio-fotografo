import {
AboutWrapper,
Description,
LeftSide,
Photo,
RightSide,
Title
} from "./styles";
// src/components/About/index.jsx
import React, { useEffect, useState } from "react";

import Reviews from "../Reviews"
import api from "../../services/api";
import { useTheme } from "styled-components";

function About() {
  const [about, setAbout] = useState(null);
  const theme = useTheme();

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

  if (!about) return <p>Cargando...</p>;

  const imgSrc =
    theme.colors.background === "#2c2c2c"
      ? about.imagen_dark
      : about.imagen_light;

  return (
    <>
      <AboutWrapper>
        <LeftSide>
          <Title>{about.titulo}</Title>
          <Description>{about.descripcion}</Description>
        </LeftSide>

        <RightSide>
          <Photo src={`http://localhost:5000/uploads/${imgSrc}`} alt="About" />
        </RightSide>
      </AboutWrapper>
        <Reviews/>
    </>
  );
}

export default About;

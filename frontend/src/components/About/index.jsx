import {
  AboutWrapper,
  Description,
  LeftSide,
  Photo,
  RightSide,
  Title
} from "./styles";
import React, { useEffect, useState } from "react";

import Reviews from "../Reviews";
import api from "../../services/api";
import { getImageUrl } from "../../utils/getImageUrl";
import { useTheme } from "styled-components";

function About() {
  const [about, setAbout] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about");
        // Siempre usar el primer elemento si viene en un array
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setAbout(data);
      } catch (err) {
        console.error("Error al cargar About:", err);
      }
    };
    fetchAbout();
  }, []);

  if (!about) return <p>Cargando...</p>;

  const imgSrc =
    theme.colors.background === "#2c2c2c"
      ? getImageUrl(about.imagen_dark)
      : getImageUrl(about.imagen_light);

  return (
    <>
      <AboutWrapper>
        <LeftSide>
          <Title>{about.titulo}</Title>
          <Description>{about.descripcion}</Description>
        </LeftSide>

        <RightSide>
          <Photo src={imgSrc} alt="About" />
        </RightSide>
      </AboutWrapper>
      <Reviews />
    </>
  );
}

export default About;

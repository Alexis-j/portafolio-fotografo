import { HeroImage, HeroWrapper, Logo, Subtitle, Title } from './styles';
import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import { useTheme } from 'styled-components';

function Hero() {
  const [hero, setHero] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get('/hero');
        if (res.data.length > 0) setHero(res.data[0]);
      } catch (err) {
        console.error('Error al cargar hero:', err);
      }
    };
    fetchHero();
  }, []);

  if (!hero) return <p>Cargando...</p>;

  const imgSrc = theme.colors.background === '#2c2c2c'
    ? hero.imagen_dark
    : hero.imagen_light;

    const logoSrc = theme.colors.background === '#2c2c2c'
  ? hero.logo_dark || ''
  : hero.logo_light || '';



  return (
    <HeroWrapper>
  {logoSrc && <Logo src={`http://localhost:5000/uploads/${logoSrc}`} alt="Logo" />}
  <HeroImage src={`http://localhost:5000/uploads/${imgSrc}`} alt={hero.titulo} />
  <Title>{hero.titulo}</Title>
  <Subtitle>{hero.subtitulo}</Subtitle>
</HeroWrapper>

  );
}

export default Hero;

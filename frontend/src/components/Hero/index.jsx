import { HeroImage, HeroWrapper, Subtitle, Title } from './styles';
import React, { useEffect, useState } from 'react';

import api from '../../services/api.js';

function Hero() {
  const [hero, setHero] = useState(null);

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

    console.log("🖼️ URL de imagen:", `http://localhost:5000/uploads/${hero.imagen}`);

  return (
    <HeroWrapper>
      <HeroImage src={`http://localhost:5000/uploads/${hero.imagen}`} alt={hero.titulo} />
      <Title>{hero.titulo}</Title>
      <Subtitle>{hero.subtitulo}</Subtitle>
    </HeroWrapper>
  );
}

export default Hero;

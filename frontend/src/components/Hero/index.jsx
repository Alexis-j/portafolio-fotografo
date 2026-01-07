import { Content, HeroWrapper, Logo } from './styles';
import React, { useEffect, useState } from 'react';

import Button from "../ui/Button"
import { NavLink } from "react-router-dom";
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
        console.error('Error loading hero:', err);
      }
    };
    fetchHero();
  }, []);

  if (!hero) return <p>Loading...</p>;

  const imgSrc =
    theme.colors.background === '#2c2c2c' ? hero.image_dark : hero.image_light;

  const logoSrc =
    theme.colors.background === '#2c2c2c'
      ? hero.logo_dark || ''
      : hero.logo_light || '';

  return (
    <HeroWrapper $imgSrc={`http://localhost:5000/uploads/${imgSrc}`}>
      <Content>
        {logoSrc && <Logo src={`http://localhost:5000/uploads/${logoSrc}`} alt="Logo"
        />}
        <Button
          as={NavLink}
          to="/gallery"
          variant="portfolio"

          
        >
          Ver galería
        </Button>
        {/* {hero.show_text && (
          <>
            <Title>{hero.title}</Title>
            <Subtitle>{hero.subtitle}</Subtitle>
          </>
        )} */}
      </Content>
    </HeroWrapper>
  );
}

export default Hero;

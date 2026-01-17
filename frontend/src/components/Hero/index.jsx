import { Content, HeroWrapper, Logo } from './styles';
import React, { useEffect, useState } from 'react';

import Button from "../ui/Button";
import { NavLink } from "react-router-dom";
import { getImageUrl } from '../../utils/getImageUrl';
import { getSingle } from '../../services/api';
import { useTheme } from 'styled-components';

function Hero() {
  const [hero, setHero] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getSingle('/hero');
        console.log("🟣 HERO DATA:", data);
        setHero(data);
      } catch (err) {
        console.error('Error loading hero:', err);
      }
    };

    fetchHero();
  }, []);

  if (!hero) return <p>Loading...</p>;

  console.log("🟣 hero.image_light:", hero.image_light);

  const imgSrc = theme.colors.background === '#2c2c2c'
    ? getImageUrl(hero.image_dark)
    : getImageUrl(hero.image_light);

  const imgMobileSrc = theme.colors.background === '#2c2c2c'
    ? getImageUrl(hero.image_mobile_dark || hero.image_dark)
    : getImageUrl(hero.image_mobile_light || hero.image_light);

  const logoSrc = theme.colors.background === '#2c2c2c'
    ? getImageUrl(hero.logo_dark)
    : getImageUrl(hero.logo_light);

  return (
    <HeroWrapper
      $imgSrc={imgSrc}
      $imgMobileSrc={imgMobileSrc}
    >
      <Content>
        {logoSrc && (
          <Logo
            src={logoSrc}
            alt="Logo"
          />
        )}

        <Button
          as={NavLink}
          to="/gallery"
          variant="portfolio"
          className="portfolio-btn"
        >
          PORTFOLIO
        </Button>
      </Content>
    </HeroWrapper>
  );
}

export default Hero;

import {
  FooterBottom,
  FooterColumn,
  FooterGrid,
  FooterLink,
  FooterText,
  FooterTitle,
  FooterWrapper,
  SocialRow
} from "./styles";
import { Mail, MapPin, Phone, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SiFacebook, SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <FooterWrapper>
        <FooterGrid>

          {/* DIRECCIÓN */}
          <FooterColumn>
            <FooterTitle>
              <MapPin size={20} />
            </FooterTitle>
            <FooterText>
              Calle Ejemplo 123 <br />
              Ciudad, País
            </FooterText>
          </FooterColumn>

          {/* TELÉFONO */}
          <FooterColumn>
            <FooterTitle>
              <Phone size={20} />
            </FooterTitle>
            <FooterLink href="tel:+123456789">
              +1 234 567 89
            </FooterLink>
          </FooterColumn>

          {/* EMAIL */}
          <FooterColumn>
            <FooterTitle>
              <Mail size={20} />
            </FooterTitle>
            <FooterLink href="mailto:andreynavas11@gmail.com">
              andreynavas11@gmail.com
            </FooterLink>
          </FooterColumn>

          {/* REDES SOCIALES */}
          <FooterColumn>
            <FooterTitle>
              <ThumbsUp size={20} />
            </FooterTitle>

            <SocialRow>
              <a href="https://www.instagram.com/andrey_navas_cr" target="_blank" rel="noopener noreferrer">
                <SiInstagram size={20} />
              </a>

              <a href="https://www.facebook.com/Andreynavasphotography/" target="_blank" rel="noopener noreferrer">
                <SiFacebook size={20} />
              </a>

              <a href="https://www.youtube.com/@HablandoPuraPajaPodcast" target="_blank" rel="noopener noreferrer">
                <SiYoutube size={20} />
              </a>

              <a href="https://www.linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer">
                <SiLinkedin size={20} />
              </a>
            </SocialRow>
          </FooterColumn>

        </FooterGrid>
      </FooterWrapper>

      <FooterBottom>
        &copy; {currentYear} Alexis Jiménez Castillo.
      </FooterBottom>
    </>
  );
}

export default Footer;

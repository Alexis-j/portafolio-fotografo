import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ThumbsUp, Youtube } from "lucide-react";
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
import React, { useEffect, useState }  from "react";

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
          <FooterTitle><MapPin size={20} /></FooterTitle>
          <FooterText>
            Calle Ejemplo 123
            Ciudad, País
          </FooterText>
        </FooterColumn>

        {/* TELÉFONO */}
        <FooterColumn>
          <FooterTitle><Phone size={20} />
          </FooterTitle>
          <FooterLink href="tel:+123456789">
            +1 234 567 89
          </FooterLink>
        </FooterColumn>

        {/* EMAIL */}
        <FooterColumn>
          <FooterTitle><Mail size={20} /></FooterTitle>
          <FooterLink href="mailto:contacto@email.com">
            andreynavas11@gmail.com
          </FooterLink>
        </FooterColumn>

        {/* SOCIAL MEDIA */}
          <FooterColumn>
            <FooterTitle>
              <ThumbsUp size={20} />
            </FooterTitle>
            <SocialRow>
              <a href="https://www.instagram.com/andrey_navas_cr" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/tu-perfil" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://www.youtube.com/c/tu-canal" target="_blank" rel="noopener noreferrer">
                <Youtube size={20} />
              </a>
              <Linkedin/>
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

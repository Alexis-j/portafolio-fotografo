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
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
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
          <FooterTitle>Dirección</FooterTitle>
          <FooterText>
            <MapPin size={16} />
            <br />
            Calle Ejemplo 123 <br />
            Ciudad, País
          </FooterText>
        </FooterColumn>

        {/* TELÉFONO */}
        <FooterColumn>
          <FooterTitle>Teléfono</FooterTitle>
          <FooterLink href="tel:+123456789">
            <Phone size={16} /> +1 234 567 89
          </FooterLink>
        </FooterColumn>

        {/* EMAIL */}
        <FooterColumn>
          <FooterTitle>Email</FooterTitle>
          <FooterLink href="mailto:contacto@email.com">
            <Mail size={16} /> contacto@email.com
          </FooterLink>
        </FooterColumn>

        {/* SOCIAL MEDIA */}
        <FooterColumn>
          <Instagram size={20} />

          <SocialRow>
            <FooterLink href="https://instagram.com" target="_blank">
            </FooterLink>
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

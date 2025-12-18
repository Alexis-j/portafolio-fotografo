import styled from "styled-components";

export const FooterWrapper = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  border-top: 1px solid ${({ theme }) => theme.colors.border}30;
`;



export const FooterGrid = styled.div`
  width: 100%;
  min-height: 250px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;

  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;


export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;   /* ⬅️ centra vertical */
  align-items: center;       /* ⬅️ centra horizontal */
  gap: 1rem;
  padding: 3rem 2rem;
  border-left: 1px solid ${({ theme }) => theme.colors.border}30;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
  }

  &:first-child {
    border-left: none;
  }


  @media (max-width: 900px) {
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}30;

  }
`;


export const FooterTitle = styled.h4`
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

export const FooterText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.85;
`;

export const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
  opacity: 0.85;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;


export const SocialRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;


export const FooterBottom = styled.div`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.7;
  border-top: 1px solid ${({ theme }) => theme.colors.border}30;
  margin-top: auto; /* asegura que quede al final si FooterWrapper crece */
`;

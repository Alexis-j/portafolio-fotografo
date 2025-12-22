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
  justify-content: center;
  align-items: center;
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
`;

export const FooterText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.8;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.15);
    text-decoration: underline;
  }
`;

export const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s ease, color 0.2s ease,  transform 0.2s ease;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.15);
    text-decoration: underline;
  }
`;

export const SocialRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  a {
    display: inline-flex;
    transition: transform 0.25s ease, color 0.25s ease;
  }

  a:hover {
    transform: scale(1.25);
  }
`;

export const FooterBottom = styled.div`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.7;
  border-top: 1px solid ${({ theme }) => theme.colors.border}30;
`;

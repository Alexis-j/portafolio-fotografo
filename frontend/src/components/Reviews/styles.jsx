import styled from "styled-components";

export const ReviewsWrapper = styled.section`
  padding: 2rem 1rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  padding-left: 15%;
  padding-right: 15%;
`;

export const SlideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 0;
  min-height: 450px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;       /* 👈 NO separación entre foto y tarjeta */
    padding: 0;   /* 👈 opcional pero recomendado */
    min-height: auto;
  }
`;


export const PhotoWrapper = styled.div`
  position: relative;
  width: 420px;
  height: 420px;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 900px) {
    height: 350px;
    border-bottom-left-radius: 0;   /* 👈 une con textbox */
    border-bottom-right-radius: 0;}
    width: 100%;
    max-width: none;
`;

export const ClientPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TextBox = styled.div`
  position: relative;

  background: white;
  padding: 2rem;
  width: 350px;
  min-height: 220px;

  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);

  margin-left: -50px;

  @media (max-width: 900px) {
    margin-left: 0;
    min-height: auto;
    border-top-left-radius: 0;    /* 👈 une con la foto */
    border-top-right-radius: 0;
    width: 100%;
    max-width: none;

  }
`;

export const ClientName = styled.h4`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ClientText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-top: .5rem;
  line-height: 1.4;
  word-break: break-word;
`;

export const ClientLink = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
`;


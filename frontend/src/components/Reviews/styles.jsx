import styled from "styled-components";

export const ReviewsWrapper = styled.section`
  padding: 2rem 1rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  padding-left: 15%;
  padding-right: 15%;
`;

export const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const ReviewCard = styled.div`
  position: relative;  /* 🔥 Necesario para overlay */
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius};
`;


export const ClientPhoto = styled.img`
  height: 450px;
  width:450px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
`;


export const ClientName = styled.h4`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.primary};
`;
export const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translateY(-50%);

  background: white;
  padding: 1.5rem;
  width: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-radius: ${({ theme }) => theme.borderRadius};
  z-index: 1;

  @media (max-width: 900px) {
    position: static;
    transform: none;
    width: 100%;
    margin-top: -2rem;
  }
`;

export const ClientText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  margin-top: .5rem;
  line-height: 1.4;
`;



export const ClientLink = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
`;

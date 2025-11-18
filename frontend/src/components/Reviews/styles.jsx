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
  background: ${({ theme }) =>
    theme.colors.cardBackground || (theme.colors.background === "#2c2c2c" ? "#3c3c3c" : "#f9f9f9")};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  transition: background 0.3s ease;
`;

export const ClientPhoto = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

export const ClientName = styled.h4`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ClientText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const ClientLink = styled.a`
  display: inline-block;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: underline;
`;

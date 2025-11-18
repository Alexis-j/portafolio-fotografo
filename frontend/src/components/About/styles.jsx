import styled from "styled-components";

export const AboutWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(4)};
  gap: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

export const LeftSide = styled.div`
  flex: 1;
`;

export const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

export const Photo = styled.img`
  width: 100%;
  max-width: 380px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

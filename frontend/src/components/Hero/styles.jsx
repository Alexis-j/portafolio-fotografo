import styled from 'styled-components';

export const HeroWrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const HeroImage = styled.img`
  position: absolute;
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  z-index: 1;
`;

export const Logo = styled.img`
  position: absolute;
  bottom: 30%; /* distancia desde abajo */
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  max-width: 300px;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  z-index: 2;
`


export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
`;

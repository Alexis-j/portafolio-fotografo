// styles.js
import styled from 'styled-components';

export const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh; /* Hero ocupa toda la pantalla */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  background: ${({ imgSrc }) => `url(${imgSrc}) center/cover no-repeat`};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2; /* para que quede sobre la imagen */
`;

export const Logo = styled.img`
  width: 300px;
  max-width: 80%;
  height: auto;

  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;



export const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
`;

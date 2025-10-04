// styles.js
import styled from 'styled-components';

export const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh; /* Hero ocupa toda la pantalla */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;

  background: ${({ imgSrc }) => `url(${imgSrc}) center/cover no-repeat`};
    transition: 0.3s ease-in-out;


`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2; /* para que quede sobre la imagen */
`;

export const Logo = styled.img`
  position: relative;
  bottom: 10%;
  width: 400px;
  max-width: 100%;
  height: 400px;

  margin-bottom: ${({ theme }) => theme.spacing(0)};
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

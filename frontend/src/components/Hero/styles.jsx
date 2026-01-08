// styles.js
import styled from 'styled-components';

export const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;

  background: ${({ $imgSrc }) => `url(${$imgSrc}) center/cover no-repeat`};
  transition: 0.3s ease-in-out;

  @media (max-width: 768px) {
    height: 70vh;
    background: ${({ $imgMobileSrc }) =>
      $imgMobileSrc
        ? `url(${$imgMobileSrc}) center/cover no-repeat`
        : 'none'};
    background-position: center top;

    .portfolio-btn {
      display: none;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2; /* para que quede sobre la imagen */
`;
export const Logo = styled.img`
  position: relative;
  bottom: 50%;
  width: 500px;
  height: auto;
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.spacing(0)};

  @media (max-width: 768px) {
    width: 70%;
    height: auto;
  }
    Content {
    padding: 0 1rem;
  }


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

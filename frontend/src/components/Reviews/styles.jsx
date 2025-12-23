import styled from "styled-components";

export const ReviewsWrapper = styled.section`
  padding: 5rem 1rem;
  padding-left: 15%;
  padding-right: 15%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  h1 {
    text-align: center;

  }

  /* Bullets */
  .swiper-pagination-bullet {
    background: ${({ theme }) => theme.colors.background} !important;
    opacity: 1 !important;
    width: 10px;
    height: 10px;
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.background} !important;
    transform: scale(1.2);
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.accent};
    width: 2.5rem;
    height: 2.5rem;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 1.5rem;
  }
`;

export const SlideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* CENTRA todo */
  gap: 0; /* tiene que ser 0, porque el overlap lo hacemos manual */
  padding: 3rem 0;
  min-height: 450px;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0;
    min-height: auto;
  }
`;

export const PhotoWrapper = styled.div`
  width: 420px;
  height: 420px;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  /* FOTO IZQUIERDA */
  ${({ layout }) =>
    [0, 1, 4].includes(layout) &&
    `
      order: 1;
    `}

  /* FOTO DERECHA */
  ${({ layout }) =>
    [2, 3, 5].includes(layout) &&
    `
      order: 2;
    `}

  @media (max-width: 900px) {
    order: 1;
    width: 100%;
    height: 350px;
  }
`;

export const ClientPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const TextBox = styled.div`
  background: ${({ theme }) => theme.components.reviews.textBox.background};
  color: ${({ theme }) => theme.components.reviews.textBox.text};
  box-shadow: ${({ theme }) => theme.components.reviews.textBox.shadow};
  position: relative;
  padding: 2rem;
  width: 350px;
  min-height: 220px;
  z-index:2;
  border-radius: ${({ theme }) => theme.borderRadius};

  /* SLIDE 1 → igual al actual */
  ${({ layout }) =>
    layout === 0 &&
    `
      order: 2;
      margin-left: -50px;
      margin-top: 0;
    `}

  /* SLIDE 2 → texto derecha, más arriba */
  ${({ layout }) =>
    layout === 1 &&
    `
      order: 2;
      margin-left: -50px;
      margin-top: -100px;
    `}

  /* SLIDE 3 → texto izquierda */
  ${({ layout }) =>
    layout === 2 &&
    `
      order: 1;
      margin-right: -50px;
      margin-top: -30px;
    `}

  /* SLIDE 4 → texto izquierda, normal */
  ${({ layout }) =>
    layout === 3 &&
    `
      order: 1;
      margin-right: -50px;
      margin-top: 0;
    `}

  /* SLIDE 5 → texto derecha, abajo */
  ${({ layout }) =>
    layout === 4 &&
    `
      order: 2;
      margin-left: -50px;
      margin-top: 30px;
    `}

  /* SLIDE 6 → texto izquierda, abajo */
  ${({ layout }) =>
    layout === 5 &&
    `
      order: 1;
      margin-right: -50px;
      margin-top: 30px;
    `}

  @media (max-width: 900px) {
    order: 2;
    margin: 0;
    width: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

  export const ClientName = styled.h3`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.components.reviews.textBox.name};
  a & {
    cursor: pointer;
  }
`;

export const ClientText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: .5rem;
  line-height: 1.4;
  word-break: break-word;
  color: ${({ theme }) => theme.components.reviews.textBox.text};
`;

export const ClientLink = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  margin-top: 1rem;
    text-decoration: none;

  &:hover h4 {
    text-decoration: underline;
  }
`;

export const Divider = styled.div `
width: 20%;
height: 2px;
margin: 1rem 0;
background: ${({ theme }) => theme.components.reviews.textBox.text};
`

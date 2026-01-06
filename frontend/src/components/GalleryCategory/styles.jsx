import styled from "styled-components";

/* ================= GRID ================= */

export const PageTitle = styled.h1`
  text-align: center;
  margin: 3rem 0 2rem;
`;

export const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const EditorialBlock = styled.div`
  display: grid;
  grid-template-columns: 3fr 6fr 3fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 1.25rem;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const BlockItem = styled.div`
  position: relative;
  overflow: hidden;
  background: #111;
  cursor: pointer;
  max-height: 303px;

  ${({ $pos }) => $pos === 0 && `grid-column: 1; grid-row: 1;`}
  ${({ $pos }) => $pos === 1 && `grid-column: 2; grid-row: 1 / span 2; max-height: 628px;`}
  ${({ $pos }) => $pos === 2 && `grid-column: 3; grid-row: 1;`}
  ${({ $pos }) => $pos === 3 && `grid-column: 1; grid-row: 2;`}
  ${({ $pos }) => $pos === 4 && `grid-column: 3; grid-row: 2;`}

  &:hover img {
    transform: scale(1.05);
  }
`;

export const BlockImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;
  filter: blur(10px);
  opacity: 0;

  &[data-loaded="true"] {
    filter: blur(0);
    opacity: 1;
  }
`;

/* ================= LIGHTBOX ================= */

export const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;

  /* Swiper next/prev buttons */
  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.accent || "#fff"};
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.8rem;
    pointer-events: auto;
    background: none;
    z-index: 20;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 1.8rem;
  }

  /* Pagination bullets */
  .swiper-pagination-bullet {
    background: ${({ theme }) => theme.colors.accent} !important;
    opacity: 1 !important;
    width: 10px;
    height: 10px;
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.bulletsActives} !important;
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
  }
`;

export const LightboxImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Controls = styled.div`
  position: absolute;
  top: 20px;
  inset-inline: 30px;
  display: flex;
  justify-content: space-between;
  z-index: 10;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent || "#fff"};
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;

  &:hover svg {
    opacity: 0.85;
  }

  &:focus {
    outline: none; 
  }
`;

export const FullscreenButton = styled(ControlButton)`
  margin-top: 8px;
`;

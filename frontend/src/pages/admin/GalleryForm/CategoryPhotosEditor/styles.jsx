import styled from "styled-components";

/* ===== LAYOUT ===== */

export const Wrapper = styled.div`
  padding: 1rem;
`;

export const EditorLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const MainArea = styled.div`
  display: flex;
  flex-direction: column; /* columnas apiladas */
  gap: 24px;
`;


export const CoverPanel = styled.div`
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  width: 100%;
`;


/* ===== COVER ===== */

export const CoverPhoto = styled.img`
  width: 100%;
  aspect-ratio: 16 / 5;
  object-fit: contain;
  border-radius: 6px;
`;


/* ===== GRID ===== */

export const PhotosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

/* ===== CARD ===== */

export const PhotoCard = styled.div`
  position: relative;
  width: 180px;
  height: 220px;
  border-radius: 6px;
  overflow: hidden;
  border: ${({ isCover }) => (isCover ? "3px solid green" : "1px solid #ccc")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover .actions {
    opacity: 1;
  }

  &::after {
    content: ${({ isCover }) => (isCover ? '"Portada"' : '""')};
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0, 128, 0, 0.7);
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
  }
`;

/* ===== ACTIONS ===== */

export const ActionsOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;
`;

export const Button = styled.button`
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: white;

  background-color: ${({ variant }) =>
    variant === "danger"
      ? "#e74c3c"
      : variant === "toggle"
      ? "#3498db"
      : "#2ecc71"};
`;

export const Dropdown = styled.select`
  width: 90%;
  font-size: 12px;
`;




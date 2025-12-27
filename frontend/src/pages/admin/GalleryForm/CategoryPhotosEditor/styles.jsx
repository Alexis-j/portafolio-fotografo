// ---------- STYLES ----------

import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CoverPhoto = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
`;

export const PhotosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const PhotoCard = styled.div`
  position: relative;
  border: ${({ isCover }) => (isCover ? "3px solid green" : "1px solid #ccc")};
  border-radius: 5px;
  overflow: hidden;
  width: 150px;
  height: 150px;
  background: white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: ${({ isCover }) => (isCover ? '"Portada"' : '""')};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 128, 0, 0.7);
    color: white;
    font-weight: bold;
    text-align: center;
  }
`;

export const Button = styled.button`
  padding: 4px 8px;
  margin: 2px;
  font-size: 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: ${({ variant }) =>
    variant === "danger" ? "#e74c3c" :
    variant === "toggle" ? "#3498db" :
    "#2ecc71"};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Dropdown = styled.select`
  width: 100%;
  margin-top: 4px;
  font-size: 12px;
`;

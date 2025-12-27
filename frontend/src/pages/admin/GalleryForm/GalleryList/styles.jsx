import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PhotosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const PhotoCard = styled.div`
  width: 180px;
  border: 1px solid #ccc;
  padding: 6px;
  border-radius: 6px;

  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    margin-bottom: 4px;
  }

  label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    margin-top: 4px;
  }
`;

export const Button = styled.button`
  margin: 4px 2px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
`;

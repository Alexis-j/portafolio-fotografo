import styled from "styled-components";

export const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  h1 {
  display: flex;
  justify-content: center;
  text-align: center;

  }
`;

export const CategoryCard = styled.div`
  position: relative;
  min-height: 650px;
  width: 100%;
  background-image: ${({ $image }) => `url(${$image})`};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.35);
  }
`;

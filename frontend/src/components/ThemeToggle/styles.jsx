import styled from "styled-components";

export const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  backdrop-filter: blur(2px);
  border: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.5);
  }
`;

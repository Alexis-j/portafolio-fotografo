import styled from "styled-components";

export const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    transform: scale(1.1);
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: ${({ theme }) => theme.colors.primary};
  }
`;

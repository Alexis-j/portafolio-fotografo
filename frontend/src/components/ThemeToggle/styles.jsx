import styled from "styled-components";

export const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  position: absolute;
  top: 20px;
  right: 20px;

  &:hover {
    opacity: 0.7;
  }
`;

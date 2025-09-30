import styled from "styled-components";

export const StyledSaveButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.7rem 1.2rem;
  border: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: bold;

  background-color: ${({ theme }) => theme.colors.accent};
  color: #fff; /* 🔹 letras siempre blancas */

  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

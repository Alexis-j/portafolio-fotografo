import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;


  ${({ $variant, theme }) => {
    switch ($variant) {
      case "secondary":
        return css`
          background-color: ${theme.colors.lightGray};
          color: ${theme.colors.text};
        `;
      case "save":
        return css`
          background-color: ${theme.colors.accent};
          color: ${theme.colors.background};
        `;
      case "cancel":
        return css`
          background-color: #ccc;
          color: #333;
        `;
      case "login":
        return css`
          background-color: ${theme.colors.loginButton};
          color: #fff;
          width: 100%;
        `;
      case "ghost":
        return css`
          background: transparent;
          color: ${theme.colors.text};
          padding: 0.4rem;
          border-radius: 50%;
          &:hover {
            background: ${theme.colors.lightGray};
          }
        `;
        case "create":
          return css`
          background-color: ${theme.colors.loginButton};
          color: #fff;
          width: 100%;
          margin: 1rem 0 2rem 0;
          max-width: 600px;
        `;

      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.background};
        `;
    }
  }}

  &:hover {
    opacity: 0.9;
    transform: scale(1.03);
  }
`;

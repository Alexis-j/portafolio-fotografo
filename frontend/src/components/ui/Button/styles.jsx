import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all 0.2s ease;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.lightGray};
          color: ${theme.colors.text};
        `;
      case 'save':
        return css`
          background-color: ${theme.colors.accent};
          color: ${theme.colors.background};
        `;
      case 'cancel':
        return css`
          background-color: #ccc;
          color: #333;
        `;
      case 'login':
        return css`
          background-color: ${theme.colors.loginButton};
          color: #fff;
          width: 100%;
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
  }
`;

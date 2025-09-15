import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
    line-height: 1.6;
  }

  h1, h2, h3 {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.accent};
    transition: 0.3s;
  }

  a:hover {
    opacity: 0.8;
  }
`;

export default GlobalStyle;

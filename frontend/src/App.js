import React, { useState } from 'react';
import { darkTheme, lightTheme } from './styles/theme';

import GlobalStyle from './styles/GlobalStyles';
import Hero from './components/Hero';
import Navbar from './components/Navbar'
import { ThemeProvider } from 'styled-components';

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Navbar toggleTheme={toggleTheme} />
      <button onClick={toggleTheme} style={{ margin: '16px', padding: '8px 16px' }}>
        Cambiar Tema
      </button>
      <Hero />
    </ThemeProvider>
  );
}

export default App;

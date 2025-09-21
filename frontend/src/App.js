import React, { useState } from 'react';
import { darkTheme, lightTheme } from './styles/theme';

import GlobalStyle from './styles/GlobalStyles';
import Hero from './components/Hero';
import Navbar from './components/Navbar'
import { ThemeProvider } from 'styled-components';
import ToggleThemeButton from './components/ThemeToggle';

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <>
        <GlobalStyle />
        <Hero />
        <Navbar />
        <ToggleThemeButton toggleTheme={toggleTheme} isDark={isDark} />
      </>
    </ThemeProvider>
  );
}

export default App;

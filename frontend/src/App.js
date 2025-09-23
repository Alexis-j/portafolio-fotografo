import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'; // ✅ importar Navigate
import React, { useState } from 'react';
import { darkTheme, lightTheme } from './styles/theme';

import Dashboard from './pages/admin/Dashboard';
import GlobalStyle from './styles/GlobalStyles';
import Hero from './components/Hero';
import HeroForm from './pages/admin/HeroForm';
import Login from './pages/admin/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import { ThemeProvider } from 'styled-components';
import ToggleThemeButton from './components/ThemeToggle';

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <ToggleThemeButton toggleTheme={toggleTheme} isDark={isDark} />

        <Routes>
          {/* Ruta pública del Hero */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
            </>
          } />

          {/* Redirigir /admin a /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Admin login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Dashboard protegido */}
          <Route path="/admin/dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route path="hero" element={<HeroForm />} />
            {/* Más sub-rutas: galerías, paquetes */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

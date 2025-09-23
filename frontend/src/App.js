import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { darkTheme, lightTheme } from './styles/theme';

import Dashboard from './pages/admin/Dashboard';
import GalleryForm from './pages/admin/GalleryForm';
import GlobalStyle from './styles/GlobalStyles';
import Hero from './components/Hero';
import HeroForm from './pages/admin/HeroForm';
import Login from './pages/admin/Login';
import Navbar from './components/Navbar';
import PackagesForm from './pages/admin/PackagesForm';
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
          {/* 1️⃣ Ruta pública */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
              </>
            }
          />

          {/* 2️⃣ Redirección /admin a /admin/dashboard */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          {/* 3️⃣ Login admin */}
          <Route path="/admin/login" element={<Login />} />

          {/* 4️⃣ Dashboard protegido con sub-rutas */}
          <Route
            path="/admin/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Sub-rutas dentro del dashboard */}
            <Route path="hero" element={<HeroForm />} />
            {/* Más sub-rutas: galerías, paquetes */}
            <Route path="galerias" element={<GalleryForm />} />
            <Route path="paquetes" element={<PackagesForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { darkTheme, lightTheme } from './styles/theme';

import About from './components/About';
import AboutForm from './pages/admin/AboutForm'
import Dashboard from './pages/admin/Dashboard';
import Footer from "./components/Footer";
import ForgotPassword from "./pages/admin/ForgotPassword";
import GalleryForm from './pages/admin/GalleryForm';
import GlobalStyle from './styles/GlobalStyles';
import Hero from './components/Hero';
import HeroForm from './pages/admin/HeroForm';
import Login from './pages/admin/Login';
import Navbar from './components/Navbar';
import PackagesForm from './pages/admin/PackagesForm';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import ResetPassword from "./pages/admin/ResetPassword";
import ReviewsForm from './pages/admin/ReviewsForm'
import ReviewsList from './pages/admin/ReviewsForm/ReviewList'
import { ThemeProvider } from 'styled-components';
import ToggleThemeButton from './components/ui/ThemeToggle';

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
                <About />
                <Footer/>
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
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password/:token" element={<ResetPassword />} />


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
            <Route path="galerias" element={<GalleryForm />} />
            <Route path="paquetes" element={<PackagesForm />} />
            <Route path="about" element={<AboutForm />} />
            <Route path="reviews" element={<ReviewsList />} />
            <Route path="reviews/new" element={<ReviewsForm />} />
            <Route path="reviews/:id" element={<ReviewsForm />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

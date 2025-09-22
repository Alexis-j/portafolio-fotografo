import Navbar from '../../../components/Navbar'; // tu sidebar existente
import { Outlet } from 'react-router-dom';
import React from 'react';

function Dashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet /> {/* Aquí se cargarán las secciones Hero, Galería, Paquetes */}
      </main>
    </div>
  );
}

export default Dashboard;

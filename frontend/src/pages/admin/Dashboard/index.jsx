import { Content, DashboardWrapper, LinkItem, Sidebar } from './styles';
import { NavLink, Outlet } from 'react-router-dom';

import React from 'react';

function Dashboard() {
  return (
    <DashboardWrapper>
      <Sidebar>
        <h2>Panel Admin</h2>
        <LinkItem to="/admin/dashboard/hero">Hero</LinkItem>
        <LinkItem to="/admin/dashboard/galerias">Galerías</LinkItem>
        <LinkItem to="/admin/dashboard/paquetes">Paquetes</LinkItem>
      </Sidebar>
      <Content>
        <Outlet /> {/* Aquí se renderiza la subruta activa */}
      </Content>
    </DashboardWrapper>
  );
}

export default Dashboard;

import { Content, DashboardWrapper, LinkItem, Sidebar } from './styles';

import { Outlet } from 'react-router-dom';
import React from 'react';

function Dashboard() {


  return (
    <DashboardWrapper>
      <Sidebar>
      <LinkItem to="/">Panel Admin</LinkItem>
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

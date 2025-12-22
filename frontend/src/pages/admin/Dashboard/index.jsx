import { Content, DashboardWrapper, LinkItem, Sidebar } from './styles';

import AddAdminForm from '../AddAdminForm';
import { Outlet } from 'react-router-dom';
import React from 'react';

function Dashboard() {

  return (
    <DashboardWrapper>
      <Sidebar>
      <LinkItem to="/">Panel Admin</LinkItem>
        <LinkItem to="/admin/dashboard/hero">Hero</LinkItem>
        <LinkItem to="/admin/dashboard/about">About</LinkItem>
        <LinkItem to="/admin/dashboard/reviews">Reviews</LinkItem>
        <LinkItem to="/admin/dashboard/gallery">Galería</LinkItem>
        <LinkItem to="/admin/dashboard/gallery/new">Subir foto</LinkItem>



      <div>
      <LinkItem>Panel de creacion de Admin</LinkItem>
      <AddAdminForm />
      {/* Aquí podrías agregar otras secciones como Hero, Galería, Paquetes */}
    </div>
      </Sidebar>
      <Content>
        <Outlet /> {/* Aquí se renderiza la subruta activa */}
      </Content>
    </DashboardWrapper>
  );
}

export default Dashboard;

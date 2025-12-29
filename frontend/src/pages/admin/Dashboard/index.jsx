import {
Content,
DashboardWrapper,
Divider,
LinkItem,
Sidebar
} from './styles';
import React, { useEffect, useState } from 'react';

import AddAdminForm from '../AddAdminForm';
import { Outlet } from 'react-router-dom';
import api from "../../../services/api";

function Dashboard() {
  const [categories, setCategories] = useState([]);

  // Para mostrar links dinámicos a editor de categoría
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/gallery/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <DashboardWrapper>
      <Sidebar>
        <LinkItem to="/">Panel Admin</LinkItem>
        <Divider/>
        <LinkItem to="/admin/dashboard/hero">Hero</LinkItem>
        <LinkItem to="/admin/dashboard/about">About</LinkItem>
        <LinkItem to="/admin/dashboard/reviews">Reviews</LinkItem>
        <LinkItem to="/admin/dashboard/gallery">Galería</LinkItem>
        <LinkItem to="/admin/dashboard/gallery/new">Subir foto</LinkItem>
        <Divider/>

        <div>
          <h4>Editar categorías</h4>
          {categories.map(cat => (
            <LinkItem key={cat.id} to={`/admin/dashboard/gallery/${cat.id}`}>
              {cat.name}
            </LinkItem>
          ))}

        </div>

        <div>
                  <Divider/>

          <LinkItem>Panel de creación de Admin</LinkItem>
          <AddAdminForm />
        </div>
      </Sidebar>


      <Content>
        <Outlet /> {/* Aquí se renderiza la subruta activa */}
      </Content>
    </DashboardWrapper>
  );
}

export default Dashboard;

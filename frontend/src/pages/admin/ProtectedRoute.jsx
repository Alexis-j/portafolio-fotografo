import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // o tu método de auth
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

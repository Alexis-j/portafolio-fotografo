import React, { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';
import api from '../../services/api';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        const res = await api.get('/admin/validate', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.valid) {
          setIsValid(true);
        } else {
          setIsValid(false);
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Error validando token:', err);
        setIsValid(false);
        localStorage.removeItem('token');
      }
    };
    validateToken();
  }, []);
  if (isValid === null) {
    return <p>Cargando...</p>;
  }
  return isValid ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;

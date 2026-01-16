// src/services/api.js
import axios from 'axios';

// Configuración principal de Axios
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

// Interceptor para añadir token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Devuelve un objeto seguro (para Hero, About, etc.)
export const getSingle = async (endpoint) => {
  const res = await api.get(endpoint);
  if (Array.isArray(res.data)) {
    return res.data[0] || null;
  }
  return res.data || null;
};

// Devuelve siempre un array (para Reviews, Gallery, etc.)
export const getList = async (endpoint) => {
  const res = await api.get(endpoint);
  if (!Array.isArray(res.data)) return [];
  return res.data;
};

// Métodos POST, PUT, DELETE directos si los nemesis
export const post = (endpoint, data) => api.post(endpoint, data);
export const put = (endpoint, data) => api.put(endpoint, data);
export const del = (endpoint) => api.delete(endpoint);

export default api;

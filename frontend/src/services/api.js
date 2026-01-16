import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL; // tu ngrok o localhost

// instancia principal
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// Interceptor para mandar token si hay
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// función helper para traer un solo registro (como hero, about)
export const getSingle = async (endpoint) => {
  try {
    const res = await api.get(endpoint);
    // si el backend devuelve un array, devolver el primer elemento
    if (Array.isArray(res.data)) return res.data[0] || null;
    return res.data || null;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return null;
  }
};

export default api;

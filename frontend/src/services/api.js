import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const getSingle = async (endpoint) => {
  const res = await api.get(endpoint);
  return Array.isArray(res.data) ? res.data[0] : res.data;
};

export default api;

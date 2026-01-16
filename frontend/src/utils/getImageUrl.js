// src/utils/getImageUrl.js
const BASE_URL = process.env.REACT_APP_API_URL;

export const getImageUrl = (path) => {

  if (!path) return "/default-placeholder.jpg";

  const cleanPath = path.startsWith("/uploads/") ? path.slice(9) : path;

  return `${BASE_URL}/uploads/${cleanPath}`;
};

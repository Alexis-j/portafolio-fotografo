// src/utils/getImageUrl.js
const BASE_URL = process.env.REACT_APP_API_URL;

export const getImageUrl = (path) => {
<<<<<<< HEAD

  if (!path) return "/default-placeholder.jpg";
=======
  if (!path) return "/default-placeholder.jpg";

>>>>>>> 72ba1097d3e055ff543bc9443b8d516e00738327
  // si el path empieza con /uploads/, lo quitamos
  const cleanPath = path.startsWith("/uploads/") ? path.slice(9) : path;

  return `${BASE_URL}/uploads/${cleanPath}`;
};

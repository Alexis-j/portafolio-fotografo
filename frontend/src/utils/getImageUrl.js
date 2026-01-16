const BASE_URL = process.env.REACT_APP_API_URL;

export const getImageUrl = (path) => {
  if (!path) return "/default-placeholder.jpg";

  // Si path ya es URL completa (https://), no hacer nada
  if (path.startsWith("http")) return path;

  // Si path empieza con /uploads, solo limpiar la barra inicial
  const cleanPath = path.startsWith("/uploads/") ? path.slice(1) : path;

  return `${BASE_URL}/${cleanPath}`;
};

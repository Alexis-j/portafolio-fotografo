const BASE_URL = process.env.REACT_APP_API_URL;

export const getImageUrl = (path) => {
  if (!path) return "";
  return `${BASE_URL}/uploads/${path}`;
};

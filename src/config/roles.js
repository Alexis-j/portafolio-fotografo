export const ADMIN_EMAILS = process.env.REACT_APP_ADMIN_EMAILS
  ? process.env.REACT_APP_ADMIN_EMAILS.split(",").map(email => email.toLowerCase())
  : [];

console.log("ADMIN_EMAILS cargados:", ADMIN_EMAILS);

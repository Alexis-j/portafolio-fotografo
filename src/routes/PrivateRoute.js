import { ADMIN_EMAILS } from "../config/roles";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const normalizedUserEmail = user.email.trim().toLowerCase();
const isAdmin = ADMIN_EMAILS.some(email => email.trim().toLowerCase() === normalizedUserEmail);

if (!isAdmin) return <p>No tienes permiso para acceder a esta sección.</p>;



  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" replace />;

  if (!ADMIN_EMAILS.includes(user.email.toLowerCase())) {
    return <p>No tienes permiso para acceder a esta sección.</p>;
  }

  return children;
}

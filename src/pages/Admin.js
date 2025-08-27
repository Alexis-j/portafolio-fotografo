import AdminPhotoUpload from "../components/AdminPhotoUpload";
import PackageForm from "../components/PackageForm";
import PackageList from "../components/PackageList";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1>Panel Admin</h1>
      <button onClick={logout}>Cerrar Sesión</button>

      <h2>Subir Fotos</h2>
      <AdminPhotoUpload />

      <h2>Gestionar Paquetes</h2>
      <PackageForm />
      <PackageList />
    </div>
  );
}

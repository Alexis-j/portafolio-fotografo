import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    // 1️⃣ Log de los datos ingresados
    console.log("Intentando login con:", email);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // 2️⃣ Log del usuario que devuelve Firebase
      console.log("Login exitoso:", userCredential.user);

      navigate("/admin");
    } catch (error) {
      // 3️⃣ Log del error completo
      console.error("Error en login:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={login} className="p-6 border rounded-lg space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

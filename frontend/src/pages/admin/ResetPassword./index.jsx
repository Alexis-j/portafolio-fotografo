import React, { useState } from "react";

import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/reset-password", {
        token,
        password,
      });

      setMessage("✅ Contraseña actualizada correctamente. Ahora puedes iniciar sesión.");
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.error || "Token inválido o expirado"));
    }
  };

  if (!token) {
    return <p>Error: No hay token de recuperación en la URL</p>;
  }

  return (
    <div>
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Cambiar contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;

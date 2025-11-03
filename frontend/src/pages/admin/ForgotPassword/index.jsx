import React, { useState } from "react";

import api from "../../../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/request-reset", { email });
      setMessage("Revisa tu correo para el enlace de recuperación ✅");
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || "Inténtalo más tarde"));
    }
  };

  return (
    <div>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar enlace</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;

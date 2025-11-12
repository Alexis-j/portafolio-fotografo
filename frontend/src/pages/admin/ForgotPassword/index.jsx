import React, { useState } from "react";

import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/request-reset", { email });
      setMessage(res.data.message || "Correo enviado ✅");
      setEmail("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Error al enviar correo");
    }
  };
//ycyxcxycxyc///
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h2>Recuperar contraseña</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar correo</button>
      </form>
    </div>
  );
}

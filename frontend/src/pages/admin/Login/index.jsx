// pages/Login/Login.jsx
import { Card, CloseWrapper, Input, Title, Wrapper } from "./styles";
import React, { useState } from "react";

import Button from "../../../components/ui/Button";
import { X } from "lucide-react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClose = () => navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("✅ Login exitoso");
      navigate("/admin");
    } catch (err) {
      console.error("Error en login:", err);
      alert("❌ Credenciales incorrectas");
    }
  };

  return (
    <Wrapper>
      <Card>
        <CloseWrapper>
          <Button variant="ghost" aria-label="Cerrar" onClick={handleClose}>
            <X size={20} />
          </Button>
        </CloseWrapper>

        <Title>Admin Login</Title>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="login">Ingresar</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default Login;

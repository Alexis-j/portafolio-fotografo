import { Button, Card, Input, Title, Wrapper } from './styles';
import React, { useState } from 'react';

import api from '../../../services/api'; // tu axios instance
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("✅ Login exitoso");
      navigate("/admin"); // redirigir al panel admin
    } catch (err) {
      console.error("Error en login:", err);
      alert("❌ Credenciales incorrectas");
    }
  };

  return (
    <Wrapper>
      <Card>
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
          <Button type="submit">Ingresar</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default Login;

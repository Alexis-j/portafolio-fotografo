import {
  FormWrapper,
  Input,
  Label,
  ShowTextWrapper
} from "../../../components/FormStyles/FormStyles";
import React, { useState } from 'react';

import Button from "../../../components/ui/Button";
import api from '../../../services/api';

function AddAdminForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        '/admin/create',
        { nombre, email, password },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage(res.data.message);
      setNombre('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err); // <-- agrega esto
      setMessage(err.response?.data?.error || 'Error creando admin');
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h3>Crear nuevo admin</h3>

      <Label>Nombre</Label>
      <Input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <Label>Email</Label>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Label>Contraseña</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="login">Crear Admin</Button>

      {message && (
        <ShowTextWrapper>
          <span>{message}</span>
        </ShowTextWrapper>
      )}
    </FormWrapper>
  );
}

export default AddAdminForm;

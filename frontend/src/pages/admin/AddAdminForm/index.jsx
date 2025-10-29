import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <h3>Crear nuevo admin</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Crear Admin</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default AddAdminForm;

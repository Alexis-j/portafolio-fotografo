import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../../../services/api'; // tu instancia de Axios

function ResetPassword() {
  const { token } = useParams(); // obtenemos token del URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!newPassword || !confirmPassword) {
      setError('Ambos campos son requeridos');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await api.post('/admin/reset-password', { token, newPassword });
      setMessage(res.data.message || 'Contraseña actualizada correctamente ✅');
      setError('');
      setNewPassword('');
      setConfirmPassword('');

      // Redirigir al login después de unos segundos
      setTimeout(() => navigate('/admin/login'), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Error al resetear contraseña');
      setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Restablecer contraseña</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nueva contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Actualizar contraseña</button>
      </form>
    </div>
  );
}

export default ResetPassword;

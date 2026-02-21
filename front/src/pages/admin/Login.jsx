import React, { useState } from 'react';
import '../../assets/css/login.css';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  // Estado para el feedback de la interfaz
  const [status, setStatus] = useState({ loading: false, msg: '', error: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, msg: 'Enviando...', error: false });

    try {
      // URL del backend en producción
      const response = await fetch('/auth/login', {
      //const response = await fetch('http://localhost:3002/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        navigate('/admin');
        setStatus({ loading: false, msg: 'Login éxitoso! ✅', error: false });
        setFormData({ username: '', password: '', }); // Limpiar formulario
      } else {
        throw new Error(data.message || 'Error en el servidor');
      }
    } catch (err) {
      setStatus({ loading: false, msg: `Error: ${err.message} ❌`, error: true });
    }
  };

  return (
    <div className="login-page">
      {/* Contenedor central */}
      <div className="login-container">

        {/* 1. Logo de la ONG */}
        <div className="login-logo-wrapper">
          <img src="/Imágenes/Logo_ONG.jpg" alt="Animales Ramallo Logo" />
        </div>

        {/* 2. Tarjeta Roja/Naranja */}
        <div className="login-card">
          <h2>Inicio de sesión</h2>

          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="usuario">Usuario</label>
              <input
                name='username'
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Usuario"
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                name='password'
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
              />
            </div>

            <button type="submit" className="btn-ingresar" disabled={status.loading}>
              Ingresar
            </button >
          </form>
          {status.msg && (
            <p style={{ color: status.error ? 'yellow' : 'green', marginTop: '10px' }}>
              {status.msg}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;
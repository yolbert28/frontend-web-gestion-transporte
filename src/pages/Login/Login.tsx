import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import './Login.css'; 

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();  // Inicializa el hook de navegación

  // Manejar los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { email, password } = formData;

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Inicio de sesión exitoso');
        // Guarda el token de autenticación en localStorage
        localStorage.setItem('token', data.token);

        // Redirige al usuario a la página 'landing-user'
        navigate('/landing-user');  // Redirige después del login exitoso
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setError('Hubo un problema al conectarse con el servidor');
    }
  };

  return (
    <div className='main-container'>
      <div className="login-container">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <label>Correo electrónico</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
          
          <label>Contraseña</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required 
          />
          
          <button type="submit">Iniciar sesión</button>
          
          <div className="forgot-password">
            <a href="/forgot-password">¿Olvidaste la contraseña?</a>
          </div>
          
          <div className="register">
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

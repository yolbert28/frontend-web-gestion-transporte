// src/pages/Login.tsx
import React from 'react';
import './Login.css'; 

const Login: React.FC = () => {
  return (
  <div className='main-container'>
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form>
        <label>Correo electrónico</label>
        <input type="email" required />
        
        <label>Contraseña</label>
        <input type="password" required />
        
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


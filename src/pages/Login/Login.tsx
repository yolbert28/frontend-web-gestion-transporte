
import React from 'react';

const Login: React.FC = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Correo:</label>
          <input type="email" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" required />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;

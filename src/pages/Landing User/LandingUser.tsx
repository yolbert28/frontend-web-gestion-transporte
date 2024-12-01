import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Services/useAuth'; // Ajusta la ruta de importación según sea necesario
import './LandingUser.css';
import { useNavigate } from 'react-router-dom';
const LandingUser: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Hook para la redirección

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige al login después de cerrar sesión
  };
  if (!user) {
    return <div>No se encontró el usuario.</div>; // Maneja el caso en que no haya un usuario
  }

  return (
    <div className="landing-User">
      {/* Encabezado */}
      <header className="landing-header">
        <h1>Bienvenido a SafeRoute, {user.name}!</h1>
      </header>

      {/* Contenido Principal */}
      <main className="landing-main">
        <section className="service-request">
          <h2>¿Necesitas Transporte?</h2>
          <p>Haz tu solicitud de transporte de manera rápida y segura.</p>
          <Link to="/request-service" className="request-button">
            Pedir Servicio
          </Link>
        </section>
        <section>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="landing-footer">
        <p>&copy; 2024 SafeRoute - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingUser;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthServices } from '../Services/authServices'; // Ajusta la ruta de importación según sea necesario
import './LandingUser.css';

const LandingUser: React.FC = () => {
  // Obtener el usuario del contexto
  const { user } = useContext(AuthServices);

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
      </main>

      {/* Pie de página */}
      <footer className="landing-footer">
        <p>&copy; 2024 SafeRoute - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingUser;

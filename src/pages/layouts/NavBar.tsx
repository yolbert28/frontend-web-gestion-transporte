import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Services/useAuth";  // Importa el hook para obtener el contexto de autenticación
import "./NavBar.css";

export default function NavBar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();  // Obtén el estado de autenticación desde el contexto
  const navigate = useNavigate();  // Usamos useNavigate para redirigir al login tras cerrar sesión

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      logout(); // Actualiza el estado de autenticación en el contexto
      navigate('/login'); // Redirige al login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="body">
      <div className="spacer"></div>
      <div className="content">
        <div className="navbar">
          <div className="logo">
            <Link to="/">SafeRoute</Link>
          </div>
          <nav className={`bar ${isMenuOpen ? "open" : ""}`}>
            <ul className="options">
              <li>
                <Link className="option" to="/">Inicio</Link>
              </li>
              <li>
                <Link className="option" to="/services">Servicios</Link>
              </li>
              <li>
                <Link className="option" to="/driver">Chofer</Link>
              </li>
              <li> 
                <Link className="option" to="/tracking">Seguimiento</Link>
              </li>
            </ul>
          </nav>

          <div className="div-buttons">
            {isAuthenticated ? (
              <>
                <span>Bienvenido, {user?.name}</span>
                <button onClick={handleLogout} className="logout-button">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Iniciar Sesión</Link>
                <Link to="/register">Registrar</Link>
              </>
            )}
          </div>
          
          {/* Botón Hamburguesa */}
          <button className="burger-button" onClick={toggleMenu}>
            ☰
          </button>
        </div>

        
      </div>
    </div>
  );
}

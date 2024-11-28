import { Outlet, Link } from "react-router-dom";
import { useState } from "react"; // Importar useState para manejar la visibilidad del menú
import "./NavBar.css";

export default function NavBar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú en pantallas pequeñas

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Alternar la visibilidad del menú
  };

  return (
    <div className="body">
      <div className="spacer"></div>
      <div className="content">
        <div className="navbar">
          <div className="logo">
            <Link to="/">SafeRoute</Link>
          </div>
          <nav className={`bar ${isMenuOpen ? "open" : ""}`}> {/* Condicional para mostrar u ocultar el menú */}
            <ul className="options">
              <li>
                <Link className="option" to="/">Inicio</Link>
              </li>
              <li>
                <Link className="option" to="/services">Servicios</Link>
              </li>
              <li>
                <Link className="option" to="/about">Sobre Nosotros</Link>
              </li>
            </ul>
          </nav>
          <div className="div-buttons">
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrar</Link>
          </div>
          <button className="burger-button" onClick={toggleMenu}>
            &#9776; {/* Símbolo del botón de menú hamburguesa */}
          </button>
        </div>
        <div className="pages">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

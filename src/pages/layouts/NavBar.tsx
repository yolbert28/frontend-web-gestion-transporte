import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
                <Link className="option" to="/about">Sobre Nosotros</Link>
              </li>
            </ul>
          </nav>
          <div className="div-buttons">
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrar</Link>
          </div>
          {/* Botón Hamburguesa */}
          <button className="burger-button" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <div className="pages">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

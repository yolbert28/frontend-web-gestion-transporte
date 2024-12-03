import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nombre, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Comprobar si el usuario está logueado
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user"); // Se espera que guardes el nombre del usuario
    if (token) {
      setIsLoggedIn(true);
      setUserName(user);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName(null);
    navigate("/login");
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
              {isLoggedIn && (
                <li>
                  <Link className="option" to="/services">Servicios</Link>
                </li>
              )}
              
            </ul>
          </nav>
          <div className="div-buttons">
            {isLoggedIn ? (
              <>
                <span className="user">Bienvenido{nombre}</span> {/* Mostrar nombre del usuario */}
                <button  className="logout"onClick={logoutUser}>Cerrar sesión</button>
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
        <div className="pages">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Ubicación</h4>
          <p>Estamos ubicados en la Av.X con Calle Y.</p>
        </div>
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#inicio">Facebook</a></li>
            <li><a href="#servicios">Instagram</a></li>
            <li><a href="#contacto">Twitter</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contáctanos</h4>
          <p>Email: contacto@saferoute.com</p>
          <p>Tel: +123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SafeRoute. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './Services.css';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleContratar = () => {
    navigate('/service-component'); // Redirige a /service-component
  };

  return (
    <div className="services-container">
      <h1>Servicios Disponibles</h1>
      <p className="services-description">
        Descubre nuestros servicios para el transporte de mercancías y personas. Si deseas contratar alguno, haz clic en "Contratar".
      </p>

      <div className="service-card-container">
        <div className="service-card" onClick={handleContratar}>
          <div className="service-icon">📦</div>
          <h3>Envio de Paquetes</h3>
          <p>De 100 a 1000 kilogramos</p>
        </div>

        <div className="service-card" onClick={handleContratar}>
          <div className="service-icon">❄️</div>
          <h3>Cava Refrigerada</h3>
          <p>De 100 a 1000 kilogramos</p>
        </div>

        <div className="service-card" onClick={handleContratar}>
          <div className="service-icon">💪</div>
          <h3>Carga Pesada</h3>
          <p>Hasta 1000 kilogramos</p>
        </div>

        <div className="service-card" onClick={handleContratar}>
          <div className="service-icon">🚐</div>
          <h3>Transporte de Personas</h3>
          <p>Hasta 30 personas</p>
        </div>

        <div className="service-card" onClick={handleContratar}>
          <div className="service-icon">🏍️</div>
          <h3>Mototaxi</h3>
          <p>1 persona</p>
        </div>
      </div>
      
      <button className="main-action-btn" onClick={handleContratar}>
        Contratar Ahora
      </button>
    </div>
  );
};

export default Services;

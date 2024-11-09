import React from 'react';
import './Services.css';
import { useNavigate } from 'react-router-dom';

type Service = {
  id: number;
  title: string;
  description: string;
  category: string;
};

const Services: React.FC = () => {
  // Lista de servicios (ejemplo estático)
  const services: Service[] = [
    { id: 1, title: 'Carga ligera', description: '100-1000 kilogramos', category: 'Transporte de mercancía' },
    { id: 2, title: 'Carga ligera', description: '100-1000 kilogramos', category: 'Transporte de mercancía' },
    { id: 3, title: 'Carga ligera', description: '100-1000 kilogramos', category: 'Transporte de mercancía' },
    { id: 4, title: 'Encava', description: '30 personas max', category: 'Transporte de personas' },
    { id: 5, title: 'Rapidito', description: '4 personas max', category: 'Transporte de personas' },
    { id: 6, title: 'Mototaxi', description: '1 persona max', category: 'Transporte de personas' },
  ];
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleContratar = () => {
    navigate('/service-component'); // Redirige a /service-component
  };
  // Filtrar servicios por categorías
  const categories = Array.from(new Set(services.map(service => service.category)));

  return (
    <div className="services-container">
      <h1>Servicios Disponibles</h1>
      {categories.map(category => (
        <div key={category} className="service-category">
          <h2>{category}</h2>
          <div className="service-list">
            {services
              .filter(service => service.category === category)
              .map(service => (
                <div key={service.id} className="service-card">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button onClick={handleContratar}>Contratar</button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
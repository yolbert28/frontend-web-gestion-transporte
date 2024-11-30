import React, { useState } from 'react';
import './Tracking.css';

const Tracking: React.FC = () => {
  const [trackingData, setTrackingData] = useState([
    { fecha: '30/11/2024', ubicacion: 'Ciudad A', estado: 'En tránsito' },
    { fecha: '29/11/2024', ubicacion: 'Ciudad B', estado: 'Despachado' },
    { fecha: '28/11/2024', ubicacion: 'Ciudad C', estado: 'Recibido' },
  ]);

  const handleSearch = () => {
    // Aquí podrías integrar lógica de búsqueda para consultar una API
    console.log('Realizando búsqueda...');
  };

  return (
    <div className="Tracking-container">
      <div className="search-section">
        <label htmlFor="numeroGuia" className="label">
          Número de Guía:
        </label>
        <input
          id="numeroGuia"
          type="text"
          className="input-field"
          placeholder="Ingresa número de guía"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      <table className="tracking-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Ubicación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {trackingData.map((item, index) => (
            <tr key={index}>
              <td>{item.fecha}</td>
              <td>{item.ubicacion}</td>
              <td>{item.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tracking;

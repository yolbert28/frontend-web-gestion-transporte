import React from 'react';
import './Driver.css';

const Driver: React.FC = () => {
  return (
    <div className="container">
      {/* Sección Viaje */}
      <section className="travel-section">
        <h2>Viaje</h2>
        <h3 className="status">En Curso</h3>
        <img
          src=""
          alt="Viaje en progreso"
          className="travel-image"
        />
        <table className="travel-table">
          <thead>
            <tr>
              <th>Guía</th>
              <th>Ruta</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>109278</td>
              <td>72938</td>
              <td>30/11/2024</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Sección Ruta Detalle */}
      <section className="route-section">
        <h2>Ruta Detalle</h2>
        <div className="map-container">
          <img
            src=""
            alt="Mapa"
            className="map-image"
          />
        </div>
        <form className="route-form">
          <div className="form-group">
            <label htmlFor="startPoint">Punto Inicio</label>
            <input id="startPoint" type="text" className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="endPoint">Punto Final</label>
            <input id="endPoint" type="text" className="input-field" />
          </div>
        </form>
      </section>

      {/* Formulario de Incidencias */}
      <section className="incident-section">
        <h2>Reportar Incidencia</h2>
        <form className="incident-form">
          <div className="form-group">
            <label htmlFor="subject">Asunto</label>
            <input id="subject" type="text" className="input-field" />
          </div>
          <div className="form-group">
            <label htmlFor="issueType">Seleccione Tipo Incidencia</label>
            <select id="issueType" className="input-field">
              <option value="">-- Seleccione --</option>
              <option value="retraso">Retraso</option>
              <option value="accidente">Accidente</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Reportar Incidencia
          </button>
        </form>
      </section>
    </div>
  );
};

export default Driver;

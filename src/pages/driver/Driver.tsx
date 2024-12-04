import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Driver.css';
import Map from '../../components/Map';

interface Guia {
  id: number;
  ruta_id: number;
  solicitud_id: number;
  fecha_inicio: string;
  fecha_final: string;
  precio: number;
  status: number;
  tipos_pagos_id: number;
}

const Driver: React.FC = () => {
  const [guias, setGuias] = useState<Guia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Estado para los datos del nuevo toque de ruta
  const [toqueRuta, setToqueRuta] = useState({
    ruta_id: '',
    punto_id: '',
    status: 1,
    tipos_toques_id: 1,
  });

  useEffect(() => {
    // Llamada a la API para obtener las guías
    const fetchGuias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/driver');
        if (response.data.success) {
          setGuias(response.data.data); // Asignar los datos de las guías
        } else {
          console.error('Error al obtener las guías:', response.data.message);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuias();
  }, []);

  const handleToqueRutaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setToqueRuta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitToqueRuta = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/createToqueRuta', toqueRuta);
      if (response.data.success) {
        alert('Toque de ruta agregado exitosamente');
        setToqueRuta({
          ruta_id: '',
          punto_id: '',
          status: 1,
          tipos_toques_id: 1,
        }); // Limpiar el formulario
      } else {
        alert('Error al agregar el toque de ruta');
      }
    } catch (error) {
      console.error('Error al crear el toque de ruta:', error);
      alert('Hubo un error al agregar el toque de ruta');
    }
  };

  return (
    <div className="container">
      {/* Sección Viaje */}
      <section className="travel-section">
        <h2>Viaje</h2>
        <h3 className="status">{loading ? 'Cargando...' : 'Guias de Cargas '}</h3>

        {/* Tabla dinámica con los datos completos */}
        <table className="travel-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ruta ID</th>
              <th>Solicitud ID</th>
              <th>Fecha Inicio</th>
              <th>Fecha Final</th>
              <th>Precio</th>
              <th>Status</th>
              <th>Tipo Pago ID</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8}>Cargando datos...</td>
              </tr>
            ) : guias.length > 0 ? (
              guias.map((guia) => (
                <tr key={guia.id}>
                  <td>{guia.id}</td>
                  <td>{guia.ruta_id}</td>
                  <td>{guia.solicitud_id}</td>
                  <td>{new Date(guia.fecha_inicio).toLocaleString()}</td>
                  <td>{new Date(guia.fecha_final).toLocaleString()}</td>
                  <td>${guia.precio}</td>
                  <td>{guia.status === 1 ? 'Activo' : 'Inactivo'}</td>
                  <td>{guia.tipos_pagos_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Agregar Toques de Rutas */}
      <section className="route-section">
        <h2>Agregar Toques de Rutas</h2>
        <div className="map-container">
          <Map coordinates={{ origen: null, destino: null }} route={null} />
        </div>
        <form className="route-form" onSubmit={handleSubmitToqueRuta}>
          <div className="form-group">
            <label htmlFor="ruta_id">Ruta ID</label>
            <input
              id="ruta_id"
              type="text"
              name="ruta_id"
              value={toqueRuta.ruta_id}
              onChange={handleToqueRutaChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="punto_id">Punto ID</label>
            <input
              id="punto_id"
              type="text"
              name="punto_id"
              value={toqueRuta.punto_id}
              onChange={handleToqueRutaChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              name="status"
              value={toqueRuta.status}
              onChange={handleToqueRutaChange}
              className="input-field"
            >
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tipos_toques_id">Tipo de Toque</label>
            <input
              id="tipos_toques_id"
              type="text"
              name="tipos_toques_id"
              value={toqueRuta.tipos_toques_id}
              onChange={handleToqueRutaChange}
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">Agregar Toque</button>
        </form>
      </section>

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

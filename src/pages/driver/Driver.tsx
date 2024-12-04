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
    guias_cargas_id: '',
    ubicacion_actual: '',
    fecha: new Date().toISOString(),  // Campo de fecha
  });

  // Estado para el reporte de incidencia
  const [incidencia, setIncidencia] = useState({
    guia_id: '',
    descripcion: '',
    fecha: new Date().toISOString(),
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
    let newValue: string | number = value;
  
    // Convertir los valores a números cuando corresponda
    if (name === 'ruta_id' || name === 'punto_id' || name === 'tipos_toques_id' || name === 'guias_cargas_id') {
      newValue = Number(value);  // Convertir a número
    }
  
    setToqueRuta((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleIncidenciaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIncidencia((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitToqueRuta = async (e: React.FormEvent) => {
    e.preventDefault();
    // Verificar que los campos obligatorios estén presentes
    if (!toqueRuta.ruta_id || !toqueRuta.punto_id || !toqueRuta.guias_cargas_id || !toqueRuta.ubicacion_actual) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    // Asegurarse de que los valores sean números si es necesario
    const validRutaId = Number(toqueRuta.ruta_id);
    const validPuntoId = Number(toqueRuta.punto_id);
    const validGuiasCargasId = Number(toqueRuta.guias_cargas_id);

    if (isNaN(validRutaId) || isNaN(validPuntoId) || isNaN(validGuiasCargasId)) {
      alert("Todos los IDs deben ser números válidos.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/createToqueRuta', {
        ...toqueRuta,
        ruta_id: validRutaId,
        punto_id: validPuntoId,
        guias_cargas_id: validGuiasCargasId,
      });

      if (response.data.success) {
        alert('Toque de ruta agregado exitosamente');
        setToqueRuta({
          ruta_id: '',
          punto_id: '',
          status: 1,
          tipos_toques_id: 1,
          guias_cargas_id: '',
          ubicacion_actual: '',
          fecha: new Date().toISOString(), // Reiniciar fecha
        });
      } else {
        alert('Error al agregar el toque de ruta');
      }
    } catch (error) {
      console.error('Error al crear el toque de ruta:', error);
      alert('Hubo un error al agregar el toque de ruta');
    }
  };

  const handleSubmitIncidencia = async (e: React.FormEvent) => {
    e.preventDefault();
    // Verificar que los campos obligatorios estén presentes
    if (!incidencia.guia_id || !incidencia.descripcion) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/reportIncidencia', incidencia);

      if (response.data.success) {
        alert('Incidencia reportada exitosamente');
        setIncidencia({
          guia_id: '',
          descripcion: '',
          fecha: new Date().toISOString(),
        });
      } else {
        alert('Error al reportar la incidencia');
      }
    } catch (error) {
      console.error('Error al reportar la incidencia:', error);
      alert('Hubo un error al reportar la incidencia');
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
              type="number"
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
              type="number"
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
              <option value={1}>Inicio</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tipos_toques_id">Tipo de Toque</label>
            <input
              id="tipos_toques_id"
              type="number"
              name="tipos_toques_id"
              value={toqueRuta.tipos_toques_id}
              onChange={handleToqueRutaChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="guias_cargas_id">Guía de Carga ID</label>
            <input
              id="guias_cargas_id"
              type="number"
              name="guias_cargas_id"
              value={toqueRuta.guias_cargas_id}
              onChange={handleToqueRutaChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ubicacion_actual">Ubicación Actual</label>
            <input
              id="ubicacion_actual"
              type="text"
              name="ubicacion_actual"
              value={toqueRuta.ubicacion_actual}
              onChange={handleToqueRutaChange}
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn">Agregar Toque</button>
        </form>
      </section>

      {/* Reportar Incidencia */}
      <section className="report-section">
        <h2>Reportar Incidencia</h2>
        <form className="report-form" onSubmit={handleSubmitIncidencia}>
          <div className="form-group">
            <label htmlFor="guia_id">Guía ID</label>
            <input
              id="guia_id"
              type="number"
              name="guia_id"
              value={incidencia.guia_id}
              onChange={handleIncidenciaChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={incidencia.descripcion}
              onChange={handleIncidenciaChange}
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn">Reportar Incidencia</button>
        </form>
      </section>
    </div>
  );
};

export default Driver;

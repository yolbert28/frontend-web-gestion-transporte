import { useState } from "react";
import "./ServicesComponent.css";
import Map from "../Map";
import axios from "axios";

const GRAPH_HOPPER_API_KEY = "55c799bd-36f6-4fd7-873f-b6d0902f2570";

export default function ServicesComponent(): JSX.Element {
  const [descripcion, setDescripcion] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaError, setFechaError] = useState("");
  const [coordinates, setCoordinates] = useState<{ origen: [number, number] | null; destino: [number, number] | null }>(
    { origen: null, destino: null }
  );
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Obtener la fecha actual en formato YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Validar fecha de salida
  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const today = getTodayDate();

    if (selectedDate < today) {
      setFechaError("La fecha de salida no puede ser anterior al día de hoy.");
      setFechaSalida("");
    } else {
      setFechaError("");
      setFechaSalida(selectedDate);
    }
  };

  // Obtener coordenadas de una ciudad usando GraphHopper
  const fetchCoordinates = async (address: string) => {
    const url = `https://graphhopper.com/api/1/geocode?key=${GRAPH_HOPPER_API_KEY}&q=${encodeURIComponent(address)}`;
    try {
      const response = await axios.get(url);
      if (response.data.hits.length > 0) {
        const { lat, lng } = response.data.hits[0].point;
        return [parseFloat(lat), parseFloat(lng)];
      }
      return null;
    } catch (error) {
      console.error("Error obteniendo coordenadas:", error);
      return null;
    }
  };

  // Obtener la ruta entre origen y destino
  const fetchRoute = async (origenCoords: [number, number], destinoCoords: [number, number]) => {
    const url = `https://graphhopper.com/api/1/route?` +
      `point=${origenCoords[0]},${origenCoords[1]}&` +
      `point=${destinoCoords[0]},${destinoCoords[1]}&` +
      `calc_points=true&points_encoded=false&` +
      `profile=car&key=${GRAPH_HOPPER_API_KEY}`;
  
    try {
      const response = await axios.get(url);
      if (response.data.paths && response.data.paths.length > 0) {
        // La API devuelve un array de puntos: [[lon, lat], [lon, lat], ...]
        const path = response.data.paths[0].points.coordinates.map((point: [number, number]) => [
          point[1], // lat
          point[0], // lon
        ]);
        setRoute(path); // Ajustar el formato para Leaflet
      } else {
        console.error("No se encontraron rutas.");
      }
    } catch (error) {
      console.error("Error obteniendo la ruta:", error);
    }
  };
  // Manejar la contratación
  const handleContratar = async () => {
    if (!fechaSalida) {
      alert("Por favor selecciona una fecha de salida válida.");
      return;
    }
    if (!origen || !destino) {
      alert("Por favor ingresa un origen y un destino válidos.");
      return;
    }

    setLoading(true);

    try {
      const origenCoords = await fetchCoordinates(origen);
      const destinoCoords = await fetchCoordinates(destino);

      if (origenCoords && destinoCoords) {
        setCoordinates({ origen: origenCoords, destino: destinoCoords });
        await fetchRoute(origenCoords, destinoCoords);
      } else {
        alert("No se pudieron encontrar las coordenadas de origen o destino.");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }

    setLoading(false);
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="carga-ligera-container">
          <h2 className="carga-ligera-title">Registro de Servicio</h2>
          <div className="form-group">
            <label>Descripción de la carga</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej. Documentos, paquete..."
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Fecha de Salida</label>
            <input
              type="date"
              value={fechaSalida}
              min={getTodayDate()} // Restringe a fechas actuales o futuras
              onChange={handleFechaChange}
              className="input-field"
            />
            {fechaError && <p className="error-text">{fechaError}</p>}
          </div>
          <div className="form-group">
            <label>Origen</label>
            <input
              type="text"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              placeholder="Ejemplo: Barquisimeto, n° de calle"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Destino</label>
            <input
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Ejemplo: San Juan, n° de calle"
              className="input-field"
            />
          </div>
          <button className="btn-contratar" onClick={handleContratar} disabled={loading}>
            {loading ? "Cargando..." : "Contratar"}
          </button>
        </div>
        <div className="map-container">
          <Map coordinates={coordinates} route={route} />
        </div>
      </div>
    </div>
  );
}

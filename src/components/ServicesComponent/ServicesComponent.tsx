import { useState } from "react";
import "./ServicesComponent.css";
import Map from "../Map";
import axios from "axios";

const GRAPH_HOPPER_API_KEY = "55c799bd-36f6-4fd7-873f-b6d0902f2570";

export default function ServicesComponent(): JSX.Element {
  const [clienteDocumento, setclienteDocumento] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaError, setFechaError] = useState("");
  const [tipos_transportes_id, setTiposTransportesId] = useState<number | string>("");
  const [coordinates, setCoordinates] = useState<{ origen: [number, number] | null; destino: [number, number] | null }>( { origen: null, destino: null });
  const [route, setRoute] = useState<any>(null);
  const [travelTime, setTravelTime] = useState<number | null>(null); // Tiempo estimado en milisegundos
  const [simulationProgress, setSimulationProgress] = useState<number>(0); // Porcentaje de progreso
  const [isSimulating, setIsSimulating] = useState(false); // Indica si la simulación está en curso
  const [loading, setLoading] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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

  const fetchRoute = async (origenCoords: [number, number], destinoCoords: [number, number]) => {
    const url = `https://graphhopper.com/api/1/route?` +
      `point=${origenCoords[0]},${origenCoords[1]}&` +
      `point=${destinoCoords[0]},${destinoCoords[1]}&` +
      `calc_points=true&points_encoded=false&` +
      `profile=car&key=${GRAPH_HOPPER_API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.paths && response.data.paths.length > 0) {
        const path = response.data.paths[0];
        setRoute(path.points.coordinates.map((point: [number, number]) => [point[1], point[0]]));
        setTravelTime(path.time); // Tiempo estimado en milisegundos
      } else {
        console.error("No se encontraron rutas.");
      }
    } catch (error) {
      console.error("Error obteniendo la ruta:", error);
    }
  };

  const startSimulation = () => {
    if (!travelTime) return;

    setSimulationProgress(0);
    setIsSimulating(true);

    const totalDuration = travelTime / 1000; // Convertir milisegundos a segundos
    const intervalDuration = 100; // Duración del intervalo en milisegundos
    const increment = (100 / totalDuration) * (intervalDuration / 500); // Incremento por intervalo

    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(interval); // Detener la simulación
          setIsSimulating(false);
          return 100;
        }
        return prev + increment;
      });
    }, intervalDuration);
  };

  const handleContratar = async () => {
    if (!clienteDocumento || !fechaSalida || !origen || !destino || !metodoPago || !tipos_transportes_id) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const origenCoords = await fetchCoordinates(origen);
      const destinoCoords = await fetchCoordinates(destino);

      if (origenCoords && destinoCoords) {
        setCoordinates({ origen: origenCoords, destino: destinoCoords });
        await fetchRoute(origenCoords as [number, number], destinoCoords as [number, number]);
        startSimulation(); // Iniciar la simulación

        // Enviar la solicitud al backend con latitud y longitud por separado
        const requestData = {
          clienteDocumento,
          fechaSalida,
          origenLat: origenCoords[0],  // Latitud de origen
          origenLon: origenCoords[1],  // Longitud de origen
          destinoLat: destinoCoords[0], // Latitud de destino
          destinoLon: destinoCoords[1], // Longitud de destino
          tipoTransporteId: tipos_transportes_id,
          precio: 20, // Suponiendo que el precio es fijo en este caso
          tiposPagosId: metodoPago === "1" ? 1 : metodoPago === "2" ? 2 : 3 // Ejemplo de asignación de ID de tipo de pago
        };

        // Realiza la solicitud al backend
        const response = await axios.post('http://localhost:3000/api/auth/services', requestData);
        if (response.status === 201) {
          alert("Solicitud registrada exitosamente");
        } else {
          alert("Hubo un problema al registrar la solicitud");
        }
        
      } else {
        alert("No se pudieron encontrar las coordenadas de origen o destino.");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      alert("Hubo un error al procesar la solicitud.");
    }

    setLoading(false);
};

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="carga-ligera-container">
          <h2 className="carga-ligera-title">Registro de Servicio</h2>
          <div className="form-group">
            <label>Inserte su N° de Identificación</label>
            <input
              type="text"
              value={clienteDocumento}
              onChange={(e) => setclienteDocumento(e.target.value)}
              placeholder="Ej: 123456789"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Fecha de Salida</label>
            <input
              type="date"
              value={fechaSalida}
              min={getTodayDate()}
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
              placeholder="Ej: Barquisimeto,Calle 10"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Destino</label>
            <input
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Ej: Cabudare,Calle 20"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Tipo de Transporte</label>
            <select
              value={tipos_transportes_id}
              onChange={(e) => setTiposTransportesId(e.target.value)}
              className="input-field"
            >
              <option value="">Selecciona el tipo de transporte</option>
              <option value="1">Transporte Ligero</option>
              <option value="2">Transporte Pesado</option>
            </select>
          </div>
          <div className="form-group">
            <label>Método de Pago</label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="input-field"
            >
              <option value="">Selecciona un método de pago</option>
              <option value="1">PayPal </option>
              <option value="2">Tarjeta de Crédito/Débito</option>
              <option value="3">Transferencia Bancaria</option>
            </select>
          </div>

          <button className="btn-contratar" onClick={handleContratar} disabled={loading}>
            {loading ? "Cargando..." : "Contratar"}
          </button>
        </div>
        <div className="map-container">
          <Map coordinates={coordinates} route={route} />
        </div>
      </div>

      {isSimulating && (
        <div className="simulation-container">
          <p>Envio en curso... {Math.round(simulationProgress)}%</p>
          <progress value={simulationProgress} max="100"></progress>
          <p>Tiempo estimado: {travelTime && `${Math.floor(travelTime / 60000)} min`}</p>
        </div>
      )}
    </div>
  );
}

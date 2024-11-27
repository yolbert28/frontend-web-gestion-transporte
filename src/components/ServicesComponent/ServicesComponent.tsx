import { useState } from "react";
import "./ServicesComponent.css";
import Map from "../Map";
import axios from "axios";

const GRAPH_HOPPER_API_KEY = "https://graphhopper.com/api/1/route?point=51.131,12.414&point=48.224,3.867&profile=car&locale=de&calc_points=false&key=api_key"; // Reemplaza con tu clave API de GraphHopper

export default function ServicesComponent(): JSX.Element {
  const [descripcion, setDescripcion] = useState("");
  const [peso, setPeso] = useState("100 - 200");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [coordinates, setCoordinates] = useState<{ origen: [number, number] | null; destino: [number, number] | null }>({
    origen: null,
    destino: null,
  });
  const [route, setRoute] = useState<any>(null); // Ruta entre origen y destino
  const [loading, setLoading] = useState(false); // Estado para mostrar que se está cargando

  // Función para obtener coordenadas de una dirección usando la API de GraphHopper
  const fetchCoordinates = async (address: string) => {
    const url = `https://graphhopper.com/api/1/geocode?key=${GRAPH_HOPPER_API_KEY}&q=${encodeURIComponent(address)}`;
    try {
      const response = await axios.get(url);
      if (response.data.hits.length > 0) {
        const { lat, lng } = response.data.hits[0];
        return [parseFloat(lat), parseFloat(lng)];
      }
      return null;
    } catch (error) {
      console.error("Error obteniendo coordenadas:", error);
      return null;
    }
  };
  async function manejarContratar() {
    try {
      // Obtén las coordenadas de origen y destino
      const origenCoords = await obtenerCoordenadas(origen);
      const destinoCoords = await obtenerCoordenadas(destino);

      if (!origenCoords || !destinoCoords) {
        alert("No se pudo encontrar el origen o el destino");
        return;
      }

      // Trazar la ruta
      const ruta = await trazarRuta(origenCoords, destinoCoords);
      if (ruta) {
        setRoutePoints(ruta.geometry); // Actualiza los puntos de la ruta
      } else {
        alert("No se encontró una ruta entre las ubicaciones especificadas.");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  }
  const API_KEY = "https://graphhopper.com/api/1/geocode?q=berlin&locale=de&key=api_key";
  async function obtenerCoordenadas(ciudad: string) {
    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(
      ciudad
    )}&locale=es&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        const { lat, lng } = data.hits[0].point;
        return { lat, lng };
      } else {
        console.error(`No se encontraron coordenadas para: ${ciudad}`);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
      return null;
    }
  }

  async function trazarRuta(origen: any, destino: any) {
    const url = `https://graphhopper.com/api/1/route?point=${origen.lat},${origen.lng}&point=${destino.lat},${destino.lng}&vehicle=car&locale=es&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.paths && data.paths.length > 0) {
        return data.paths[0]; // Devuelve el primer camino encontrado
      } else {
        console.error("No se encontró una ruta.");
        return null;
      }
    } catch (error) {
      console.error("Error al trazar la ruta:", error);
      return null;
    }
  }
  // Función para obtener la ruta usando la API de enrutamiento de GraphHopper
  const fetchRoute = async (origenCoords: [number, number], destinoCoords: [number, number]) => {
    const url = `https://graphhopper.com/api/1/route?point=${origenCoords[0]},${origenCoords[1]}&point=${destinoCoords[0]},${destinoCoords[1]}&type=json&key=${GRAPH_HOPPER_API_KEY}`;
    try {
      const response = await axios.get(url);
      if (response.data.paths && response.data.paths.length > 0) {
        const path = response.data.paths[0].points.coordinates; // Coordenadas de la ruta
        setRoute(path); // Actualizamos el estado con la ruta
      }
    } catch (error) {
      console.error("Error obteniendo la ruta:", error);
    }
  };

  // Función para manejar el botón "Contratar"
  const handleContratar = async () => {
    if (!origen || !destino) {
      alert("Por favor ingrese un origen y un destino válidos.");
      return;
    }

    setLoading(true); // Mostramos un indicador de carga

    // Obtenemos las coordenadas de origen y destino
    const origenCoords = await fetchCoordinates(origen);
    const destinoCoords = await fetchCoordinates(destino);

    if (origenCoords && destinoCoords) {
      setCoordinates({ origen: origenCoords, destino: destinoCoords });
      await fetchRoute(origenCoords, destinoCoords); // Obtenemos la ruta
    } else {
      alert("No se pudieron encontrar las coordenadas de origen o destino.");
    }

    setLoading(false); // Ocultamos el indicador de carga
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="carga-ligera-container">
          <h2 className="carga-ligera-title">Carga ligera</h2>
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
            <label>Peso aproximado</label>
            <select value={peso} onChange={(e) => setPeso(e.target.value)} className="input-field">
              <option value="100 - 200">100 - 200</option>
              <option value="200 - 500">200 - 500</option>
              <option value="500 - 1000">500 - 1000</option>
            </select>
          </div>
          <div className="form-group">
            <label>Origen</label>
            <input
              type="text"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              placeholder="Ciudad de origen"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Destino</label>
            <input
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Ciudad de destino"
              className="input-field"
            />
          </div>
          <button className="btn-contratar" onClick={handleContratar}>
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

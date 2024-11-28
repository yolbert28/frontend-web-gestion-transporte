import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  coordinates: {
    origen: [number, number] | null;
    destino: [number, number] | null;
  };
  route: [number, number][] | null; // Ruta con las coordenadas
}

export default function Map({ coordinates, route }: MapProps): JSX.Element {
  const defaultPosition = [10.0739, -69.3227]; // Coordenadas de Barquisimeto (valor por defecto)
  const zoomLevel = 10;

  return (
    <MapContainer center={coordinates.origen || defaultPosition} zoom={zoomLevel} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Mostrar marcador de origen */}
      {coordinates.origen && (
        <Marker position={coordinates.origen}>
          <Popup>Origen: {coordinates.origen.join(", ")}</Popup>
        </Marker>
      )}

      {/* Mostrar marcador de destino */}
      {coordinates.destino && (
        <Marker position={coordinates.destino}>
          <Popup>Destino: {coordinates.destino.join(", ")}</Popup>
        </Marker>
      )}

      {/* Mostrar la ruta como una polyline roja */}
      {route && (
        <Polyline
          positions={route}
          pathOptions={{
            color: "red", // Color de la línea
            weight: 4,    // Grosor de la línea
            opacity: 0.8, // Opacidad de la línea
          }}
        />
      )}
    </MapContainer>
  );
}

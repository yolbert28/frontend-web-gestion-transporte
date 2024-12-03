import Map from "../Map";
import { useNavigate, useLocation } from "react-router-dom";
import "./TravelTrackingComponent.css";
export default function TravelTrackingComponent(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener los datos pasados por estado
  const { coordinates, route } = location.state || { coordinates: null, route: null };

  const handleCancel = () => {
    alert("El viaje ha sido cancelado.");
    navigate("/"); // Redirige a la página inicial o donde prefieras
  };

  return (
    <div className="tracking-container">
      <h2>Seguimiento del Viaje</h2>
      <div className="map-container">
        {coordinates && route ? (
          <Map coordinates={coordinates} route={route} />
        ) : (
          <p>Los datos del viaje no están disponibles.</p>
        )}
      </div>
      <button className="btn-cancel" onClick={handleCancel}>
        Cancelar Viaje
      </button>
    </div>
  );
}
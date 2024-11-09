import { useState } from "react";
import "./ServicesComponent.css"

export default function ServicesComponent(): JSX.Element {
  const [descripcion, setDescripcion] = useState("");
  const [peso, setPeso] = useState("100 - 200");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");


  return (
   <div className="main-container">
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
        <select
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="input-field"
        >
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

      <div className="form-group-horizontal">
        <div>
          <label>Tiempo aproximado:</label>
          <p className="info-box">2 días y 2 horas</p>
        </div>
        <div>
          <label>Precio:</label>
          <p className="info-box">$200</p>
        </div>
      </div>

      <button className="btn-contratar">Contratar</button>
    </div>
    </div>  
  );
}
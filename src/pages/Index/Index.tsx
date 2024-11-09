import { useEffect, useState } from "react";
import "./Index.css";

export default function Index(): JSX.Element {
  const images = [
    "../../../public/pic-3.jpg",
    "../../../public/imagen1.jpg",
    "../../../public/Transportes.jpg",
  ];

  return (
    <div className="container">
      <div className="top-image">
        <div className="with-blur">
          <ImageCarousel images={images} />
        </div>
      </div>
      <div className="white-spacer"></div>
      <div className="info">
        <div className="info-image">
          <img src="../../../public/Transportes.jpg" alt="camino" className="info-image-img" />
        </div>
        <div className="info-text">
          <h3 className="info-text-title">Transporte y Logística Segura</h3>
          <p className="info-text-paragraph">
            Ofrecemos servicios de transporte de carga ligera, mediana y pesada a nivel nacional.
            Contamos con vehículos adaptados para distintos tipos de carga, y un equipo comprometido
            con la seguridad y puntualidad.
          </p>
        </div>
      </div>
      <div className="info">
        <div className="info-text m-70">
          <h3 className="info-text-title">Servicio de primera calidad</h3>
          <p className="info-text-paragraph">
            Nuestro servicio de transporte de personas garantiza comodidad y seguridad, con unidades
            adecuadas para grupos pequeños y grandes.
          </p>
        </div>
        <div className="info-image">
          <img src="../../../public/imagen1.jpg" alt="camino" className="info-image-img" />
        </div>
      </div>
    </div>
  );
}

function ImageCarousel({ images }: { images: string[] }): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia de imagen cada 5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Imagen ${index + 1}`} className="carousel-image" />
      ))}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

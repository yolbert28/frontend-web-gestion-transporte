import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode; // Los componentes hijos que serán renderizados si el usuario está autenticado
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  const location = useLocation(); // Para mantener la ubicación actual al redirigir

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Si está autenticado, renderiza los componentes hijos
  return <>{children}</>;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate} from 'react-router-dom';
import { useAuth } from '../pages/Services/useAuth'; 
interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode; // Los componentes hijos que serán renderizados si el usuario está autenticado
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // Para mantener la ubicación actual al redirigir

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Si está autenticado, renderiza los componentes hijos
  return <>{children}</>;
};

export default ProtectedRoute;

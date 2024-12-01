// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthServices } from './AuthServices'; // Ajusta la ruta según tu estructura

export const useAuth = () => {
  const context = useContext(AuthServices);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

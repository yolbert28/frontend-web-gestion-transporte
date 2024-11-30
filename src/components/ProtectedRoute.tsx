// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../pages/Services/authServices';

interface ProtectedRouteProps {
    allowedRoles: string[];  // Roles que pueden acceder
    children: React.ReactNode;  // Componente a renderizar
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const role = getUserRole(); // Obtén el rol del usuario desde el token

    if (!role) {
        return <Navigate to="/login" />;  // Redirige a login si no hay rol
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/not-authorized" />;  // Redirige si el rol no tiene acceso
    }

    return <>{children}</>;  // Renderiza el componente si tiene el rol permitido
};

export default ProtectedRoute;

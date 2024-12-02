
import {jwtDecode} from 'jwt-decode';

// Función para obtener el rol del usuario desde el token
export const getUserRole = (): string | null => {
    const token = localStorage.getItem('token');  // O el almacenamiento que uses, como sessionStorage
    if (!token) return null; // Si no hay token, no hay rol

    try {
        const decoded: { role: string } = jwtDecode(token);  // Decodifica el JWT
        return decoded.role;  // Devuelve el rol que está en el token
    } catch (err) {
        console.error('Error al decodificar el token:', err);
        return null; // Si hay un error (token inválido, expirado), retorna null
    }
};

// Función para obtener el ID del usuario desde el token (opcional)
export const getUserId = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded: { id: string } = jwtDecode(token);
        return decoded.id;
    } catch (err) {
        console.error('Error al decodificar el token:', err);
        return null;
    }
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return !!decoded;  // Retorna true si el token es válido
    } catch (err) {
        console.error('Token inválido:', err);
        return false;  // Retorna false si el token es inválido o expirado
    }
};

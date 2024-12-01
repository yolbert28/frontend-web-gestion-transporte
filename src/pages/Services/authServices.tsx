import React, { createContext,useState, useEffect, PropsWithChildren } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string } | null;
  login: (user: { name: string }, token: string) => void;
  logout: () => void;
}

export const AuthServices = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Recuperar el estado de la autenticación desde localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para manejar el login
  const login = (user: { name: string }, token: string) => {
    setIsAuthenticated(true);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token); // Guarda el token en localStorage
  };

  // Función para manejar el logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Elimina el token de localStorage
  };

  return (
    <AuthServices.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthServices.Provider>
  );
};
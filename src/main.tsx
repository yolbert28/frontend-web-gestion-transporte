import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './pages/layouts/NavBar';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Services from './pages/Services/Services';
import ServicesComponent from './components/ServicesComponent/ServicesComponent';
import Tracking from './pages/Tracking/Tracking';
import Driver from './pages/Driver/Driver';
import LandingUser from './pages/Landing User/LandingUser';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider} from './pages/Services/AuthServices';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      { path: '/', element: <Index /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/services', element: <Services /> },
      { path: '/service-component', element: <ServicesComponent /> },
      { path: '/driver', element: <Driver /> },
      { path: '/tracking', element: <Tracking /> },

      // Ruta protegida para el landing del usuario
      {
        path: '/landing-user',
        element: (
          <ProtectedRoute isAuthenticated={true}>
            <LandingUser />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Utiliza el AuthProvider para manejar el estado de autenticación */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
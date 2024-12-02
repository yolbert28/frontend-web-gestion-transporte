import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavBar from './pages/layouts/NavBar'
import Index from './pages/Index/Index'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Services from './pages/Services/Services'
import ServicesComponent from './components/ServicesComponent/ServicesComponent';
import Tracking from './pages/Tracking/Tracking';
import Driver from './pages/driver/Driver';
const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Index />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      { path: '/services', 
        element: <Services /> },
      { path: '/service-component',
        element: <ServicesComponent />},
        {
          path: '/driver',
          element: <Driver/>
        },
        {
          path: '/tracking',
          element: <Tracking/>
        }
       
      ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

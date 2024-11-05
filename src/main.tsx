import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavBar from './pages/layouts/NavBar'
import Index from './pages/Index/Index'

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
      // {
      //   path: '/clients',
      //   element: <Clients />
      // },
      // {
      //   path: '/units',
      //   element: <Units />
      // }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

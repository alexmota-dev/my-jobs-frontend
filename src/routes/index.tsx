import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { EnvelopCarousel } from '../components/Carousel/main';
import { AuthContext } from '../contexts/auth';
import PrivateRoute from './PrivateRoute';
import { About } from '../pages/About';
import { AddPosts } from '../pages/AddPosts';

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);

  // Defina as rotas assinadas e outras rotas corretamente
  const signedRoutes = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <PrivateRoute element={About} /> },
    { path: "/carousel", element: <PrivateRoute element={EnvelopCarousel} /> },
    { path: "/add-books", element: <AddPosts /> },
    { path: "/update-book/:id", element: <AddPosts /> },
    { path: "*", element: <Navigate to="/" /> }
  ]);

  const otherRoutes = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to="/login" /> }
  ]);

  return <RouterProvider router={signed ? signedRoutes : otherRoutes} />;
};

export default Routes;
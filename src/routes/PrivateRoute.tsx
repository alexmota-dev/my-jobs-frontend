import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

interface PrivateRouteProps {
  element: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component }) => {
  const { signed } = useContext(AuthContext);
  return signed ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;

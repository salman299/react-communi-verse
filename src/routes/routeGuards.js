import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

export const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login/" />;
};

export const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? element : <Navigate to="/" />;
};

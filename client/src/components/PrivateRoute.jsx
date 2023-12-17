import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthValue } from '../context/AuthContext';

function PrivateRoute() {
  const { isAuthenticated } = useAuthValue();
  const location = useLocation();

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute;

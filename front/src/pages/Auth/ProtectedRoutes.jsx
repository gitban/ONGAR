import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { token } = useAuth();

  // Si no hay token, redirige al login. 'replace' limpia el historial.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderiza las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;
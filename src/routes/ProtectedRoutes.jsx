import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingScreen } from '../components/LoadingScreen';

export function ProtectedRoutes({ requiredRoles }) {
    const { isAuthenticated, isPending, user } = useAuth();

    // Mostrar un componente de carga mientras se verifica la autenticación
    if (isPending) {
        return <LoadingScreen message="Verificando acceso..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}

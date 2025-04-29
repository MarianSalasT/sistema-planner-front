import { useAuth } from '@/contexts/AuthContext';

export function UserInfo() {
    // Obtenemos el usuario y el estado de autenticación del contexto
    const { user, isAuthenticated, isPending } = useAuth();

    // Si está cargando, mostramos un mensaje de carga
    if (isPending) {
        return <div>Cargando información del usuario...</div>;
    }

    // Si no está autenticado, mostramos un mensaje
    if (!isAuthenticated || !user) {
        return <div>No hay usuario autenticado</div>;
    }

    // Si tenemos usuario, mostramos su información
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-2">Información del Usuario</h2>
            <div className="space-y-2">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.role}</p>
            </div>
        </div>
    );
} 
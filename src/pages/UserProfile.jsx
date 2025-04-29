import { UserInfo } from "@/components/UserInfo";
import { useAuth } from "@/contexts/AuthContext";

export function UserProfile() {
    // Obtenemos directamente el usuario del contexto
    const { user } = useAuth();
    
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">
                {user ? `Hola, ${user.name}!` : 'Bienvenido'}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Tu Perfil</h2>
                    <UserInfo />
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold mb-4">Tus Preferencias</h2>
                    <div className="p-4 bg-white rounded shadow">
                        <p>Rol: {user?.role}</p>
                        <p>Último acceso: {new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 
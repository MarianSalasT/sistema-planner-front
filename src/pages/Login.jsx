import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            navigate("/dashboard");
        } catch (error) {
            setError("Credenciales inválidas");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-100 p-3 rounded text-red-600">
                    {error}
                </div>
            )}
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    value={credentials.email}
                    onChange={e => setCredentials(prev => ({
                        ...prev,
                        email: e.target.value
                    }))}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Contraseña</label>
                <input
                    type="password"
                    value={credentials.password}
                    onChange={e => setCredentials(prev => ({
                        ...prev,
                        password: e.target.value
                    }))}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
            >
                Iniciar Sesión
            </button>
        </form>
    );
}

import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Sistema Planner</h2>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

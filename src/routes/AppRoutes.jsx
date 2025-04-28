import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ProtectedRoutes } from './ProtectedRoutes';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Admin } from '../pages/Admin';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route element={<ProtectedRoutes requiredRoles={['admin']} />}>
                        <Route path="/admin/*" element={<Admin />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ProtectedRoutes } from './ProtectedRoutes';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Admin } from '../pages/Admin';
import { Unauthorized } from '../pages/Unauthorized';
import { Boards } from '../pages/Boards';
import { Calendar } from '../pages/Calendar';
import { AuditLogs } from '../pages/AuditLogs';
import { Users } from '../pages/Users';
import { Roles } from '../pages/Roles';
import { UserProfile } from '../pages/UserProfile';
import BoardPage from '../pages/Board[id]/Page';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route element={<ProtectedRoutes />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/boards" element={<Boards />} />
                    <Route path="/boards/:id" element={<BoardPage />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/audit-log" element={<AuditLogs />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/user-profile" element={<UserProfile />} />

                    <Route element={<ProtectedRoutes requiredRoles={['admin']} />}>
                        <Route path="/admin/*" element={<Admin />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

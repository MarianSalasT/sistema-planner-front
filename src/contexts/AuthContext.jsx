import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const AUTH_STATUS = {
    PENDING: 'pending',
    AUTHENTICATED: 'authenticated',
    UNAUTHENTICATED: 'unauthenticated'
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authStatus, setAuthStatus] = useState(AUTH_STATUS.PENDING);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
            navigate('/login');
            return;
        }
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await api.post('/authenticate');
            setUser(response.data.data);
            setAuthStatus(AUTH_STATUS.AUTHENTICATED);
        } catch (error) {
            console.error('Error checking authentication:', error);
            handleAuthError();
        }
    };

    const handleAuthError = () => {
        setUser(null);
        setAuthStatus(AUTH_STATUS.UNAUTHENTICATED);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const login = async (credentials) => {
        try {
            setAuthStatus(AUTH_STATUS.PENDING);
            const response = await api.post('/login', credentials);
            const { token, user } = response.data.data;

            if (!token) {
                throw new Error('No token received from server');
            }

            localStorage.setItem('token', token);
            setUser(user);
            setAuthStatus(AUTH_STATUS.AUTHENTICATED);
        } catch (error) {
            console.error('Error logging in:', error);
            handleAuthError();
            throw error;
        }
    };

    const logout = async () => {
        try {
            setAuthStatus(AUTH_STATUS.PENDING);
            await api.post('/logout');
        } catch (error) {
            console.error('Error logging out:', error);
            handleAuthError();
        }
    };

    const value = {
        user,
        isAuthenticated: authStatus === AUTH_STATUS.AUTHENTICATED,
        isPending: authStatus === AUTH_STATUS.PENDING,
        login,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


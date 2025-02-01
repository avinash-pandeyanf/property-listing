import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/auth.service';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setUser } = useContext(AuthContext);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(email, password);
            localStorage.setItem('token', response.authToken);
            setUser({ email: response.email });
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return {
        loading,
        error,
        login,
        logout
    };
};

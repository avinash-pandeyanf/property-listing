import { API_URL, handleResponse, fetchConfig } from '../utils/api';

export const authService = {
    login: async (email, password) => {
        const response = await fetch(
            `${API_URL}/api/auth/login`, 
            fetchConfig('POST', { email, password })
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid credentials');
        }
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(
            `${API_URL}/api/auth/signup`, 
            fetchConfig('POST', userData)
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }
        return response.json();
    }
};



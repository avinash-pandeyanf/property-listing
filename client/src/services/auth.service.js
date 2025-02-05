import { API_URL, handleResponse, authHeader } from '../utils/api';

export const authService = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: authHeader(),
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({ email, password })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid credentials');
        }
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: authHeader(),
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }
        return response.json();
    }
};


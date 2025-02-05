import { API_URL, fetchConfig } from '../utils/api';

export const authService = {
    login: async (email, password) => {
        const response = await fetch(
            `${API_URL}/api/auth/login`,
            fetchConfig('POST', { email, password })
        );
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Invalid credentials');
        }
        return data.data;
    },

    register: async (userData) => {
        const form = new FormData();
        Object.keys(userData).forEach(key => {
            form.append(key, userData[key]);
        });

        const response = await fetch(
            `${API_URL}/api/auth/signup`,
            fetchConfig('POST', form)
        );
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        return data.data;
    }
};



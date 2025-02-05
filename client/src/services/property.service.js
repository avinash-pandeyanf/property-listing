import { API_URL, handleResponse, authHeader } from '../utils/api';

export const propertyService = {
    getProperties: async (queryParams) => {
        const response = await fetch(`${API_URL}/properties?${queryParams}`, {
            method: 'GET',
            headers: authHeader(),
            credentials: 'include',
            mode: 'cors'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch properties');
        }
        const data = await response.json();
        return data.data;
    },

    getPropertyById: async (id) => {
        const response = await fetch(`${API_URL}/properties/${id}`, {
            method: 'GET',
            headers: authHeader(),
            credentials: 'include',
            mode: 'cors'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch property');
        }
        const data = await response.json();
        return data.data;
    },

    createProperty: async (formData) => {
        // Remove Content-Type header for FormData
        const headers = authHeader();
        delete headers['Content-Type'];
        
        const response = await fetch(`${API_URL}/properties`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            mode: 'cors',
            body: formData
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create property');
        }
        const data = await response.json();
        return data.data;
    }
};




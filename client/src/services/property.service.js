import { API_URL, handleResponse, fetchConfig } from '../utils/api';

export const propertyService = {
    getProperties: async (queryParams) => {
        const response = await fetch(
            `${API_URL}/api/properties?${queryParams}`, 
            fetchConfig('GET')
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch properties');
        }
        const data = await response.json();
        return data.data;
    },

    getPropertyById: async (id) => {
        const response = await fetch(
            `${API_URL}/api/properties/${id}`, 
            fetchConfig('GET')
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch property');
        }
        const data = await response.json();
        return data.data;
    },

    createProperty: async (formData) => {
        const response = await fetch(
            `${API_URL}/api/properties`, 
            fetchConfig('POST', formData)
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create property');
        }
        const data = await response.json();
        return data.data;
    }
};




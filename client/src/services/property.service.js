import { API_URL, fetchConfig } from '../utils/api';

export const propertyService = {
    getProperties: async (queryParams) => {
        const response = await fetch(
            `${API_URL}/api/properties?${queryParams}`,
            fetchConfig('GET')
        );
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch properties');
        }
        return data.data;
    },

    getPropertyById: async (id) => {
        const response = await fetch(
            `${API_URL}/api/properties/${id}`,
            fetchConfig('GET')
        );
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch property');
        }
        return data.data;
    },

    createProperty: async (formData) => {
        const response = await fetch(
            `${API_URL}/api/properties`,
            fetchConfig('POST', formData)
        );
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create property');
        }
        return data.data;
    }
};




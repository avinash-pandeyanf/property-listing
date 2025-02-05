const API_URL = process.env.REACT_APP_API_URL || 'https://property-listing-0m2j.onrender.com/api';

export const propertyService = {
    getProperties: async (queryParams) => {
        const response = await fetch(`${API_URL}/properties?${queryParams}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch properties');
        }
        return response.json();
    },

    getPropertyById: async (id) => {
        const response = await fetch(`${API_URL}/properties/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch property');
        }
        return response.json();
    },

    createProperty: async (formData) => {
        const response = await fetch(`${API_URL}/properties`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: formData
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create property');
        }
        return response.json();
    },

    updatePropertyViews: async (id) => {
        const response = await fetch(`${API_URL}/properties/${id}/views`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update views');
        }
        return response.json();
    }
};


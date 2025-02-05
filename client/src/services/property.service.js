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
        const data = await response.json();
        return data.data;
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
        const data = await response.json();
        return data.data;
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
        const data = await response.json();
        return data.data;
    }
};



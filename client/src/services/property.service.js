const API_URL = '/api';

export const propertyService = {
    getProperties: async (queryParams) => {
        const response = await fetch(`${API_URL}/properties?${queryParams}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            try {
                const jsonError = JSON.parse(errorData);
                throw new Error(jsonError.message || 'Failed to fetch properties');
            } catch (e) {
                throw new Error(errorData || 'Failed to fetch properties');
            }
        }
        
        const data = await response.json();
        return data.data;
    },

    getPropertyById: async (id) => {
        const response = await fetch(`${API_URL}/properties/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            try {
                const jsonError = JSON.parse(errorData);
                throw new Error(jsonError.message || 'Failed to fetch property');
            } catch (e) {
                throw new Error(errorData || 'Failed to fetch property');
            }
        }
        
        const data = await response.json();
        return data.data;
    },

    createProperty: async (formData) => {
        const response = await fetch(`${API_URL}/properties`, {
            method: 'POST',
            credentials: 'include',
            body: formData // Don't set Content-Type for FormData, browser will set it automatically
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            try {
                const jsonError = JSON.parse(errorData);
                throw new Error(jsonError.message || 'Failed to create property');
            } catch (e) {
                throw new Error(errorData || 'Failed to create property');
            }
        }
        
        const data = await response.json();
        return data.data;
    },

    updatePropertyViews: async (id) => {
        const response = await fetch(`${API_URL}/properties/${id}/views`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            try {
                const jsonError = JSON.parse(errorData);
                throw new Error(jsonError.message || 'Failed to update views');
            } catch (e) {
                throw new Error(errorData || 'Failed to update views');
            }
        }
        
        const data = await response.json();
        return data.data;
    }
};

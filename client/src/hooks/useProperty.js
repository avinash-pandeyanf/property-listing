import { useState } from 'react';
import { propertyService } from '../services/property.service';

export const useProperty = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProperties = async (queryParams) => {
        setLoading(true);
        setError(null);
        try {
            const response = await propertyService.getProperties(queryParams);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createProperty = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please login to add a property');
            }
            const response = await propertyService.createProperty(formData, token);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getProperties,
        createProperty
    };
};

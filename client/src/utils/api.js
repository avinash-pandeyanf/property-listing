export const API_URL = process.env.REACT_APP_API_URL || 'https://property-listing-0m2j.onrender.com';

export const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const authHeader = (isFormData = false) => {
    const token = localStorage.getItem('token');
    const headers = isFormData ? {} : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

export const fetchConfig = (method = 'GET', body = null) => {
    const isFormData = body instanceof FormData;
    const config = {
        method,
        headers: authHeader(isFormData),
        credentials: 'include',
        mode: 'cors'
    };

    if (body) {
        config.body = isFormData ? body : JSON.stringify(body);
    }

    return config;
};


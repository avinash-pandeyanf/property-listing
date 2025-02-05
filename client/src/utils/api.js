export const API_URL = process.env.REACT_APP_API_URL || 'https://property-listing-0m2j.onrender.com';

export const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const authHeader = () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

export const fetchConfig = (method = 'GET', body = null) => {
    const config = {
        method,
        headers: authHeader(),
        credentials: 'include',
        mode: 'cors'
    };

    if (body) {
        if (body instanceof FormData) {
            delete config.headers['Content-Type'];
            config.body = body;
        } else {
            config.body = JSON.stringify(body);
        }
    }

    return config;
};

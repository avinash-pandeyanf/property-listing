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
    return token ? { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    } : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
};

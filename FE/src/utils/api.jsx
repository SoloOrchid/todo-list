import axios from 'axios';

export const makeRequest = async (url, options = {}) => {
    try {
        // Fetch CSRF token if available
        await axios.get('/sanctum/csrf-cookie')

        return await axios(url, options);
    } catch (error) {
        throw error;
    }
};

export const makeAuthRequest = async (url, options = {}) => {
    try {
        // Fetch CSRF token if available
        await axios.get('/sanctum/csrf-cookie')

        return await axios(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${localStorage.getItem('Bearer')}`
            }
        });
    } catch (error) {
        throw error;
    }
}

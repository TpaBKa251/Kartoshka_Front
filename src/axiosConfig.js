// src/axiosConfig.js

import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/potato/api',
});

// Intercept requests to include the Bearer token
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('sessionToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;

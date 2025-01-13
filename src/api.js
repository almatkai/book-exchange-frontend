// src/api.js
import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000/api/1.0',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default api;
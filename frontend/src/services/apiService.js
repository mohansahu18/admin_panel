import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const handleApiError = (error) => {
    if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
        throw new Error(error.response.data.message || "An error occurred");
    } else if (error.request) {
        console.error("Request:", error.request);
        throw new Error("No response received from server");
    } else {
        console.error("Error:", error.message);
        throw new Error("Error setting up the request");
    }
};

export const login = async (credentials) => {
    try {
        const response = await api.post('api/auth/login', credentials);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const register = async (userData) => {
    // debugger
    try {
        const response = await api.post(`/api/auth/register`, userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getUsers = async () => {
    try {
        const response = await api.get('api/users');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const createUser = async (userData) => {
    try {
        const response = await api.post('api/users/create', userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await api.put(`api/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`api/users/${userId}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};
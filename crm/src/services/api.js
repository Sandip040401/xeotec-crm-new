import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL, // Backend API
    withCredentials: true, // Allow sending cookies
    headers: {
        "Content-Type": "application/json",
    },
});

// Handle API response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized! Redirecting to login.");
        }
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default api;

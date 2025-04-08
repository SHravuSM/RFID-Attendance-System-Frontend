// api.js (create this once and use everywhere)
import axios from "axios";

// Create instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // change this to your backend
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
import axios from 'axios';
import { auth } from '../config/firebase';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL
});

// Add debug logs
api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser;
    if (user) {
      console.log('Current user:', user.email);
      const token = await user.getIdToken();
      console.log('Token obtained:', token ? 'Yes' : 'No');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Auth error:', error);
    return config;
  }
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api; 
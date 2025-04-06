import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5051/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default api;

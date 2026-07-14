import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.API_URL || 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.log('No answer from server:', error.message);
    } else {
      console.log('Error creating request:', error.message);
    }
    return Promise.reject(error);
  }
);
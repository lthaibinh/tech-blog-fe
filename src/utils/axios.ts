// utils/axios.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookie from 'js-cookie';

// Create an Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set the base URL for your API
});

// Add an interceptor to add the JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookie.get('token'); // Get the token from cookies
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach JWT to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data?.data;
  },
  (error) => {
    // Transform the error to include a standardized message or format
    const customError = {
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
    };
    return Promise.reject(customError); // Reject with the custom error
  }
);


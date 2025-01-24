// utils/axios.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

// Create an Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set the base URL for your API
});

// Add an interceptor to add the JWT token to every request
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession(); // Retrieve the session
    const serverSideSession = await getServerSession(authOptions);
    const { accessToken } = session || serverSideSession || {};
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // Attach JWT to Authorization header
    }
    console.log('Config Headers:', config.headers);

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

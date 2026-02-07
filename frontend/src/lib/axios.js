import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:5001/api",
  withCredentials: true,
});
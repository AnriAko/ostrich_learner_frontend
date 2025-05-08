import axios from "axios";
import { API_BASE_URL } from "./config";
import { setupInterceptors } from "./interceptors";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

setupInterceptors(axiosInstance);

export default axiosInstance;

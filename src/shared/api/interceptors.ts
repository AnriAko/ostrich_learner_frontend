import axios, { AxiosError } from "axios";
import { ApiError } from "./types";

export const setupInterceptors = (
    axiosInstance: ReturnType<typeof axios.create>
) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError<ApiError>) => {
            if (error.response) {
                console.error("[API ERROR]", error.response.data);
            } else {
                console.error("[API ERROR]", error.message);
            }
            return Promise.reject(error);
        }
    );
};

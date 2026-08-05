import axios from "axios";
import toast from "react-hot-toast";
import { tokenStorage } from "../utils/tokenStorage";

let isLoggingOut = false;

const api = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {

        const token = tokenStorage.getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
);

api.interceptors.response.use(

    (response) => response,

    (error) => {

        const isLoginRequest =
            error.config?.url?.includes("/api/auth/login");

        if (
            error.response?.status === 401 &&
            !isLoginRequest &&
            !isLoggingOut
        ) {

            isLoggingOut = true;

            toast.error(
                "Your session has expired. Please log in again."
            );

            tokenStorage.clear();

            localStorage.removeItem("role");
            localStorage.removeItem("username");
            setTimeout(() => {

                window.location.replace("/");

            }, 1500);

        }

        return Promise.reject(error);
    }

);

export default api;
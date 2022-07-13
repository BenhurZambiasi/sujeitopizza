import axios, { AxiosError } from "axios";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "../contexts/AuthContext";
import { parseCookies } from "nookies";

const { "@nextauth.token": token } = parseCookies();

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        signOut();
      } else {
        return Promise.reject(new AuthTokenError());
      }
    }

    return {
      success: false,
      failure: true,
      message: error?.response?.data?.error,
    };
  }
);

export { api };

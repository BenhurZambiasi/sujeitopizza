import axios, { AxiosError } from "axios";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "../contexts/AuthContext";

import { parseCookies } from "nookies";

export const config = (ctx = undefined) => {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      authorization: `Bearer ${cookies["@nextauth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      response.headers.authorization = `Bearer ${cookies["@nextauth.token"]}`;
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

  return api;
};

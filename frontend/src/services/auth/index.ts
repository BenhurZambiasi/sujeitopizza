import { api } from "../api";

type TSigninProps = {
  password: string;
  email: string;
};

export const sessionLogin = async (credentials: TSigninProps) => {
  try {
    return await api.post("/session", credentials);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const userLogged = async () => {
  try {
    return await api.get("/me");
  } catch (error) {
    return Promise.reject(error);
  }
};

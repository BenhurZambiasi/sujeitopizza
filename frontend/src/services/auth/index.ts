import { api } from "../apiClient";

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

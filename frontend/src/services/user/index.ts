import { api } from "../api";

type TUser = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async (dataUser: TUser) => {
  try {
    return await api.post("/users", dataUser);
  } catch (error) {
    return Promise.reject(error);
  }
};

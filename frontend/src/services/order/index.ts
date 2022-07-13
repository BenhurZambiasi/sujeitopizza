import { api } from "../api";

export const getOrders = async () => {
  try {
    return await api.get("/orders");
  } catch (err) {
    return Promise.reject(err);
  }
};

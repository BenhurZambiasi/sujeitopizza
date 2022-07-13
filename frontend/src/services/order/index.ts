import { api } from "../api";

export const getOrders = async () => {
  try {
    return await api.get("/orders");
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getOrderItenById = async (order_id: string) => {
  try {
    return await api.get("/order", {
      params: {
        order_id,
      },
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const finishOrder = async (order_id: string) => {
  try {
    return await api.put(`/order/finish?order_id=${order_id}`);
  } catch (err) {
    return Promise.reject(err);
  }
};

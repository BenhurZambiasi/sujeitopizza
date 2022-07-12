import { api } from "../apiClient";

export const createCategory = async (name: string) => {
  try {
    return await api.post("/category", { name });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCategories = async () => {
  try {
    return await api.get("/categories");
  } catch (error) {
    return Promise.reject(error);
  }
};

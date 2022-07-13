import { api } from "../api";

interface IProdutc {
  file: File | any;
  category_id: string;
  name: string;
  price: string;
  description: string;
}

export const createProduct = async (payload: IProdutc) => {
  try {
    const formData = new FormData();
    let key: keyof IProdutc;
    for (key in payload) {
      formData.append(key, payload[key]);
    }
    return await api.post("/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

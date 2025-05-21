import axiosClient from "./axios-client";

export const getAllProducts = (params) => {
  return axiosClient.get("/products", {params: params });
};

export const getProductDetail = (id) => {
  return axiosClient.get(`/products/${id}`);
};
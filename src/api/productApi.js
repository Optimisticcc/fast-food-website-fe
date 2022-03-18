import axiosClient from "./axiosClient";
// get tat ca product
export const getAllProduct = (params) => {
  const url = "/sanphams";
  return axiosClient.get(url, { params });
};
// lay 1 bai viet theo slug
export const getProductByCode = (code) => {
  const url = `/sanphams/${code}`;
  return axiosClient.get(url);
};
// lay 1 bai viet theo id

export const getProductById = (id) => {
  const url = `/sanphams/${id}`;
  return axiosClient.get(url);
};

// lay cac bai viet theo category
export const getProductByCategory = (idCategory) => {
  const url = "/sanphams/get-product-by-category";
  return axiosClient.post(url, idCategory);
};

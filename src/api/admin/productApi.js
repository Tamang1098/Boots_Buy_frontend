// import axios from "../api";

// export const getAllProductApi = (params) => axios.get("/admin/product", { params });

// export const createOneProductApi = (data) =>
//   axios.post("/admin/product", data, { headers: { "Content-Type": "multipart/form-data" } });

// export const getOneProductApi = (id) => axios.get(`/admin/product/${id}`);

// export const updateOneProductApi = (id, data) =>
//   axios.put(`/admin/product/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });

// export const deleteOneProductApi = (id) => axios.delete(`/admin/product/${id}`);


import axios from "../api";

// ✅ Utility to attach token if present
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ✅ Get all products (with query params: page, limit, search)
export const getAllProductApi = (params) =>
  axios.get("/admin/product", {
    params,
    headers: authHeaders(),
  });

// ✅ Create one product (requires name, price, brandId, image)
export const createOneProductApi = (data) =>
  axios.post("/admin/product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeaders(),
    },
  });

// ✅ Get single product by ID
export const getOneProductApi = (id) =>
  axios.get(`/admin/product/${id}`, {
    headers: authHeaders(),
  });

// ✅ Update product by ID (requires name, price, brandId, optional image)
export const updateOneProductApi = (id, data) =>
  axios.put(`/admin/product/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeaders(),
    },
  });

// ✅ Delete product by ID
export const deleteOneProductApi = (id) =>
  axios.delete(`/admin/product/${id}`, {
    headers: authHeaders(),
  });

// src/api/user.js
import axios from "../api";

// Get all users with optional query params (pagination, search)
export const getAllUserApi = (params) => {
  const token = localStorage.getItem("token");
  return axios.get("/admin/users", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get one user by ID
export const getOneUserApi = (id) => 
  axios.get(`/admin/users/${id}`);

// Update one user by ID
export const updateOneUserApi = (id, data) =>
  axios.put(`/admin/users/${id}`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// Delete one user by ID
export const deleteOneUserApi = (id) =>
  axios.delete(`/admin/users/${id}`);

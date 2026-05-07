import { createAxiosInstanceWithInterceptor, userTypeAuth } from "../axios";

const api = createAxiosInstanceWithInterceptor("data", userTypeAuth.admin);

export const getUsersApi = async (filters = {}) => {
  try {
    const response = await api.get("/api/v1/admin/users", { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByIdApi = async (userId) => {
  try {
    const response = await api.get(`/api/v1/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserApi = async (userData) => {
  try {
    const response = await api.post("/api/v1/admin/users", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserApi = async (userId, userData) => {
  try {
    const response = await api.put(`/api/v1/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserApi = async (userId) => {
  try {
    const response = await api.delete(`/api/v1/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

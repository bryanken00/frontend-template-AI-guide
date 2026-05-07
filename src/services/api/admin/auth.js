import { axiosInstance } from "../axios";

export const loginAdminApi = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/admin/auth/login",
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutAdminApi = async () => {
  try {
    const response = await axiosInstance.post("/api/v1/admin/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshTokenApi = async (token) => {
  try {
    const response = await axiosInstance.post("/api/v1/admin/auth/refresh", {
      token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCsrfTokenApi = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/admin/auth/csrf-token");
    return response.data;
  } catch (error) {
    throw error;
  }
};

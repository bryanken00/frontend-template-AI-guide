import { axiosInstance } from "../axios";

export const loginSuperAdminApi = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/superadmin/auth/login",
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutSuperAdminApi = async () => {
  try {
    const response = await axiosInstance.post("/api/v1/superadmin/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshTokenApi = async (token) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/superadmin/auth/refresh",
      {
        token,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCsrfTokenApi = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/v1/superadmin/auth/csrf-token",
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

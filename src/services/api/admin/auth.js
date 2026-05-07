import { axiosInstance } from "../axios";
import {
  mockAdminLoginResponse,
  mockCsrfTokenResponse,
  mockDelay,
} from "../../../mock/auth";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

export const loginAdminApi = async (payload) => {
  if (useMock) {
    await mockDelay();
    return mockAdminLoginResponse;
  }

  const response = await axiosInstance.post(
    "/api/v1/admin/auth/login",
    payload,
  );
  return response.data;
};

export const logoutAdminApi = async () => {
  if (useMock) {
    await mockDelay(400);
    return { message: "Logged out successfully" };
  }

  const response = await axiosInstance.post("/api/v1/admin/auth/logout");
  return response.data;
};

export const refreshTokenApi = async (token) => {
  if (useMock) {
    await mockDelay(400);
    return { token: mockAdminLoginResponse.token };
  }

  const response = await axiosInstance.post("/api/v1/admin/auth/refresh", {
    token,
  });
  return response.data;
};

export const getCsrfTokenApi = async () => {
  if (useMock) {
    await mockDelay(200);
    return mockCsrfTokenResponse;
  }

  const response = await axiosInstance.get("/api/v1/admin/auth/csrf-token");
  return response.data;
};

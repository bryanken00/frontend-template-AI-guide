import { axiosInstance } from "../axios";
import {
  mockSuperAdminLoginResponse,
  mockCsrfTokenResponse,
  mockDelay,
} from "../../../mock/auth";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

export const loginSuperAdminApi = async (payload) => {
  if (useMock) {
    await mockDelay();
    return mockSuperAdminLoginResponse;
  }

  const response = await axiosInstance.post(
    "/api/v1/superadmin/auth/login",
    payload,
  );
  return response.data;
};

export const logoutSuperAdminApi = async () => {
  if (useMock) {
    await mockDelay(400);
    return { message: "Logged out successfully" };
  }

  const response = await axiosInstance.post("/api/v1/superadmin/auth/logout");
  return response.data;
};

export const refreshTokenApi = async (token) => {
  if (useMock) {
    await mockDelay(400);
    return { token: mockSuperAdminLoginResponse.token };
  }

  const response = await axiosInstance.post("/api/v1/superadmin/auth/refresh", {
    token,
  });
  return response.data;
};

export const getCsrfTokenApi = async () => {
  if (useMock) {
    await mockDelay(200);
    return mockCsrfTokenResponse;
  }

  const response = await axiosInstance.get(
    "/api/v1/superadmin/auth/csrf-token",
  );
  return response.data;
};

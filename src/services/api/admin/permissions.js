import { createAxiosInstanceWithInterceptor, userTypeAuth } from "../axios";
import { mockDelay } from "../../../mock/auth";
import { mockUserPermissions, mockModules } from "../../../mock/permissions";

const axiosInstance = createAxiosInstanceWithInterceptor(
  "data",
  userTypeAuth.admin,
);

const useMock = import.meta.env.VITE_USE_MOCK === "true";

/**
 * Get all permissions
 */
export const getPermissions = async (params = {}) => {
  if (useMock) {
    await mockDelay(300);
    return mockUserPermissions;
  }

  const { data } = await axiosInstance.get("/api/v1/admin/permissions", {
    params,
  });
  return data;
};

/**
 * Get list of modules
 */
export const getModules = async () => {
  if (useMock) {
    await mockDelay(300);
    return mockModules;
  }

  const { data } = await axiosInstance.get("/api/v1/admin/permissions/modules");
  return data;
};

/**
 * Get current user's permissions
 */
export const getUserPermissions = async () => {
  if (useMock) {
    await mockDelay(300);
    return mockUserPermissions;
  }

  const { data } = await axiosInstance.get("/api/v1/admin/permissions/user");
  return data.data;
};

/**
 * Check if user has specific permission
 */
export const checkPermission = async (module, submodule, accessLevel) => {
  if (useMock) {
    await mockDelay(200);
    return { hasPermission: true };
  }

  const { data } = await axiosInstance.post("/api/v1/admin/permissions/check", {
    module,
    submodule,
    accessLevel,
  });
  return data;
};

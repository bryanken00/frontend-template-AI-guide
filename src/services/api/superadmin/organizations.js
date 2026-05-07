import { createAxiosInstanceWithInterceptor, userTypeAuth } from "../axios";

const api = createAxiosInstanceWithInterceptor("data", userTypeAuth.superadmin);

export const getOrganizationsApi = async (filters = {}) => {
  try {
    const response = await api.get("/api/v1/superadmin/organizations", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrganizationByIdApi = async (organizationId) => {
  try {
    const response = await api.get(
      `/api/v1/superadmin/organizations/${organizationId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrganizationApi = async (organizationData) => {
  try {
    const response = await api.post(
      "/api/v1/superadmin/organizations",
      organizationData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrganizationApi = async (
  organizationId,
  organizationData,
) => {
  try {
    const response = await api.put(
      `/api/v1/superadmin/organizations/${organizationId}`,
      organizationData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrganizationApi = async (organizationId) => {
  try {
    const response = await api.delete(
      `/api/v1/superadmin/organizations/${organizationId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

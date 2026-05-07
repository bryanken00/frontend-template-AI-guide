import { createAxiosInstanceWithInterceptor, userTypeAuth } from "../axios";

const api = createAxiosInstanceWithInterceptor("data", userTypeAuth.superadmin);

export const getOrganizationsApi = async (filters = {}) => {
  const response = await api.get("/api/v1/superadmin/organizations", {
    params: filters,
  });
  return response.data;
};

export const getOrganizationByIdApi = async (organizationId) => {
  const response = await api.get(
    `/api/v1/superadmin/organizations/${organizationId}`,
  );
  return response.data;
};

export const createOrganizationApi = async (organizationData) => {
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
};

export const updateOrganizationApi = async (
  organizationId,
  organizationData,
) => {
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
};

export const deleteOrganizationApi = async (organizationId) => {
  const response = await api.delete(
    `/api/v1/superadmin/organizations/${organizationId}`,
  );
  return response.data;
};

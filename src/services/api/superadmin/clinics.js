import { createAxiosInstanceWithInterceptor, userTypeAuth } from "../axios";

const api = createAxiosInstanceWithInterceptor("data", userTypeAuth.superadmin);

export const getClinicsApi = async (filters = {}) => {
  try {
    const response = await api.get("/api/v1/superadmin/clinics", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClinicByIdApi = async (clinicId) => {
  try {
    const response = await api.get(`/api/v1/superadmin/clinics/${clinicId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createClinicApi = async (clinicData) => {
  try {
    const response = await api.post("/api/v1/superadmin/clinics", clinicData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateClinicApi = async (clinicId, clinicData) => {
  try {
    const response = await api.put(
      `/api/v1/superadmin/clinics/${clinicId}`,
      clinicData,
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

export const deleteClinicApi = async (clinicId) => {
  try {
    const response = await api.delete(`/api/v1/superadmin/clinics/${clinicId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

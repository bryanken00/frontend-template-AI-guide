import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  getClinicsApi,
  getClinicByIdApi,
  createClinicApi,
  updateClinicApi,
  deleteClinicApi,
} from "../../api/superadmin/clinics";

// Query: Get all clinics
export const useGetClinics = (filters = {}) => {
  return useQuery({
    queryKey: ["clinics", filters],
    queryFn: () => getClinicsApi(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Query: Get single clinic
export const useGetClinicById = (clinicId) => {
  return useQuery({
    queryKey: ["clinics", clinicId],
    queryFn: () => getClinicByIdApi(clinicId),
    enabled: !!clinicId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Mutation: Create clinic
export const useCreateClinic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClinicApi,
    onSuccess: () => {
      message.success("Clinic created successfully");
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to create clinic");
    },
  });
};

// Mutation: Update clinic
export const useUpdateClinic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clinicId, clinicData }) =>
      updateClinicApi(clinicId, clinicData),
    onSuccess: (data, variables) => {
      message.success("Clinic updated successfully");
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
      queryClient.invalidateQueries({
        queryKey: ["clinics", variables.clinicId],
      });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to update clinic");
    },
  });
};

// Mutation: Delete clinic
export const useDeleteClinic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClinicApi,
    onSuccess: () => {
      message.success("Clinic deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to delete clinic");
    },
  });
};

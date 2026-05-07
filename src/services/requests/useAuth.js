import { useLoginAdminAuth, useLogoutAdminAuth } from "./admin/auth";

export const useAuth = () => {
  const login = useLoginAdminAuth();
  const logout = useLogoutAdminAuth();

  return {
    login,
    logout,
    isLoading: login.isPending || logout.isPending,
  };
};

import { useQuery } from "@tanstack/react-query";
import { getUserPermissions } from "../services/api/admin/permissions";

/**
 * Hook for checking user permissions
 * Returns permission checking functions and user's permissions
 */
export const usePermissions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userPermissions"],
    queryFn: getUserPermissions,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  /**
   * Check if user has specific permission
   * @param {string} module - Module name
   * @param {string|null} submodule - Submodule name (optional)
   * @param {string} accessLevel - Required access level (read or write)
   * @returns {boolean}
   */
  const hasPermission = (module, submodule = null, accessLevel = "read") => {
    if (!data?.permissions) return false;

    const permission = data.permissions.find(
      (p) => p.module === module && p.submodule === submodule,
    );

    if (!permission) return false;

    // Check access level hierarchy: none < read < write
    const accessLevels = { none: 0, read: 1, write: 2 };
    return accessLevels[permission.accessLevel] >= accessLevels[accessLevel];
  };

  /**
   * Check if user has module access
   * @param {string} module - Module name
   * @returns {boolean}
   */
  const hasModuleAccess = (module) => {
    if (!data?.permissions) return false;

    return data.permissions.some(
      (p) => p.module === module && p.submodule === null,
    );
  };

  /**
   * Check if user has any permission in a submodule
   * @param {string} module - Module name
   * @param {string} submodule - Submodule name
   * @returns {boolean}
   */
  const hasSubmoduleAccess = (module, submodule) => {
    if (!data?.permissions) return false;

    return data.permissions.some(
      (p) => p.module === module && p.submodule === submodule,
    );
  };

  /**
   * Get all permissions for a module
   * @param {string} module - Module name
   * @returns {Array}
   */
  const getModulePermissions = (module) => {
    if (!data?.permissions) return [];

    return data.permissions.filter((p) => p.module === module);
  };

  /**
   * Check if user has any of the specified permissions
   * @param {Array} permissions - Array of {module, submodule, accessLevel}
   * @returns {boolean}
   */
  const hasAnyPermission = (permissions) => {
    return permissions.some(({ module, submodule, accessLevel }) =>
      hasPermission(module, submodule, accessLevel),
    );
  };

  return {
    permissions: data?.permissions || [],
    role: data
      ? {
          roleId: data.roleId,
          roleName: data.roleName,
          description: data.description,
        }
      : null,
    hasPermission,
    hasModuleAccess,
    hasSubmoduleAccess,
    getModulePermissions,
    hasAnyPermission,
    isLoading,
    error,
  };
};

/**
 * Filter navigation items based on user permissions
 * @param {Array} navigation - Array of navigation items
 * @param {Function} hasPermission - Permission check function
 * @returns {Array} Filtered navigation items
 */
export const filterNavigationByPermissions = (navigation, hasPermission) => {
  return navigation
    .filter((item) => {
      // If no permission required, show item
      if (!item.permission) return true;

      const { module, submodule, accessLevel } = item.permission;

      // Check if user has required permission
      return hasPermission(module, submodule, accessLevel);
    })
    .map((item) => {
      // Recursively filter children if they exist
      if (item.children) {
        return {
          ...item,
          children: filterNavigationByPermissions(item.children, hasPermission),
        };
      }
      return item;
    });
};

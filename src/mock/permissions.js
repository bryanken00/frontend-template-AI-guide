/**
 * Mock permissions data for development/demo purposes.
 */

export const mockUserPermissions = {
  roleId: "role_super_admin_org_001",
  roleName: "Super Admin",
  description: "Full access to all admin portal modules",
  permissions: [
    {
      permissionId: "perm_dashboard",
      module: "dashboard",
      submodule: null,
      description: "Dashboard access",
      accessLevel: "write",
      source: "role",
    },
    {
      permissionId: "perm_audit_trail",
      module: "audit_trail",
      submodule: null,
      description: "Audit Trail access",
      accessLevel: "write",
      source: "role",
    },
    {
      permissionId: "perm_settings",
      module: "settings",
      submodule: null,
      description: "Settings management",
      accessLevel: "write",
      source: "role",
    },
    {
      permissionId: "perm_users_list",
      module: "users",
      submodule: "list",
      description: "Users list management",
      accessLevel: "write",
      source: "role",
    },
    {
      permissionId: "perm_users_positions",
      module: "users",
      submodule: "positions",
      description: "Positions management",
      accessLevel: "write",
      source: "role",
    },
    {
      permissionId: "perm_users_roles",
      module: "users",
      submodule: "roles",
      description: "Roles management",
      accessLevel: "write",
      source: "role",
    },
  ],
};

export const mockModules = {
  data: [
    { module: "dashboard", label: "Dashboard" },
    { module: "users", label: "Users" },
    { module: "settings", label: "Settings" },
    { module: "audit_trail", label: "Audit Trail" },
  ],
};

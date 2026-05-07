/**
 * Mock authentication data for development/demo purposes.
 * Enable by setting VITE_USE_MOCK=true in your .env file.
 */

export const mockAdminLoginResponse = {
  message: "Login successful",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJhY2NfYWRtaW4wMSIsInR5cGUiOiJBRE1JTiIsImlhdCI6MTc3ODE2MjUyNSwiZXhwIjoxNzc4MTYzNDI1fQ.ZsBjrZTFx4uliGiRBVhr4ZHO3dhXXAXkhlrkgbWzipI",
  user: {
    accountId: "acc_admin01",
    firstName: "Admin",
    lastName: "User",
    fullName: "Admin User",
    phone: null,
    email: "admin@example.com",
    type: "ADMIN",
    positionId: "pos_admin_org_001",
    positionName: "Administrator",
    organizationId: "org_001",
    branchId: "branch_001",
    roleId: "role_super_admin_org_001",
    roleName: "Super Admin",
    roleDescription: "Full access to all admin portal modules",
    signature: null,
  },
  organization: {
    organizationId: "org_001",
    organizationName: "Sample Organization",
    organizationLogo: null,
  },
  permissions: {
    admin: [
      {
        permissionId: "perm_audit_trail",
        module: "audit_trail",
        description: "Audit Trail access",
        accessLevel: "write",
        source: "role",
      },
      {
        permissionId: "perm_dashboard",
        module: "dashboard",
        description: "Dashboard access",
        accessLevel: "write",
        source: "role",
      },
      {
        permissionId: "perm_settings",
        module: "settings",
        description: "Settings management",
        accessLevel: "write",
        source: "role",
      },
      {
        module: "users",
        submodules: [
          {
            permissionId: "perm_users_list",
            submodule: "list",
            description: "Users list management",
            accessLevel: "write",
            source: "role",
          },
          {
            permissionId: "perm_users_positions",
            submodule: "positions",
            description: "Positions management",
            accessLevel: "write",
            source: "role",
          },
          {
            permissionId: "perm_users_roles",
            submodule: "roles",
            description: "Roles management",
            accessLevel: "write",
            source: "role",
          },
        ],
      },
    ],
  },
};

export const mockSuperAdminLoginResponse = {
  message: "Login successful",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJhY2Nfc3VwZXJhZG1pbjAxIiwidHlwZSI6IlNVUEVSQURNSU4iLCJpYXQiOjE3NzgxNjI1MjUsImV4cCI6MTc3ODE2MzQyNX0.mock-superadmin-token",
  user: {
    accountId: "acc_superadmin01",
    firstName: "Super",
    lastName: "Admin",
    fullName: "Super Admin",
    phone: null,
    email: "superadmin@example.com",
    type: "SUPERADMIN",
    roleId: "role_superadmin",
    roleName: "Super Administrator",
    roleDescription: "Full system access",
  },
};

export const mockCsrfTokenResponse = {
  csrfToken: "mock-csrf-token-" + Date.now(),
};

/**
 * Simulate API delay for realistic UX
 */
export const mockDelay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

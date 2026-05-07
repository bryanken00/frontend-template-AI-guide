import { useState } from "react";
import { Table, Button, Input, Empty, Spin, Alert, Drawer } from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Shield, Users, CheckCircle, Key } from "lucide-react";
import { useRolesData } from "./hooks";
import { usePermissions } from "../../../../hooks/usePermissions";
import RoleForm from "./RoleForm";
import PermissionsDrawer from "./PermissionsDrawer";

const RolesPage = () => {
  const {
    data,
    pagination,
    filters,
    isLoading,
    error,
    refetch,
    handleTableChange,
    handleSearch,
    handleStatusFilter,
    handleDelete,
    getColumns,
  } = useRolesData();

  const { hasPermission } = usePermissions();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [permissionsDrawerOpen, setPermissionsDrawerOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [mode, setMode] = useState("create");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const canWrite = hasPermission("users", "roles", "write");

  const handleCreate = () => {
    setSelectedRole(null);
    setMode("create");
    setDrawerOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedRole(record);
    setMode("edit");
    setDrawerOpen(true);
  };

  const handleManagePermissions = (record) => {
    setSelectedRole(record);
    setPermissionsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedRole(null);
    refetch?.();
  };

  const handlePermissionsDrawerClose = () => {
    setPermissionsDrawerOpen(false);
    setSelectedRole(null);
    refetch?.();
  };

  const handleRefresh = () => {
    refetch?.();
  };

  const handleClearFilters = () => {
    handleSearch("");
    handleStatusFilter("");
  };

  // Get columns with action handlers
  const columns = getColumns(handleEdit, handleManagePermissions, handleDelete);

  const totalRoles = data?.length || 0;
  const activeRoles = data?.filter((r) => r.status === "Active").length || 0;
  const totalUsers =
    data?.reduce((sum, role) => sum + (role.userCount || 0), 0) || 0;
  const totalPermissions =
    data?.reduce((sum, role) => sum + (role.permissionCount || 0), 0) || 0;

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4 bg-gradient-to-br from-white to-slate-50">
        <div className="w-full max-w-2xl">
          <Alert
            message="Error Loading Roles"
            description={
              error.message || "Failed to load roles data. Please try again."
            }
            type="error"
            showIcon
            closable
            className="shadow-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5"></div>

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Roles Management
              </h1>
              <p className="text-blue-100">Manage user roles and permissions</p>
            </div>

            {/* Stats Cards */}
            {totalRoles > 0 && (
              <div className="flex gap-3 flex-wrap">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold text-white">
                    {totalRoles}
                  </div>
                  <div className="text-sm font-medium text-blue-100">
                    Total Roles
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold text-green-300">
                    {activeRoles}
                  </div>
                  <div className="text-sm font-medium text-blue-100">
                    Active
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Total Roles</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {totalRoles}
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Active Roles</div>
                <div className="text-2xl font-bold text-green-600 mt-1">
                  {activeRoles}
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-2xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Total Users</div>
                <div className="text-2xl font-bold text-indigo-600 mt-1">
                  {totalUsers}
                </div>
              </div>
              <div className="p-3 bg-indigo-50 rounded-2xl">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Permissions</div>
                <div className="text-2xl font-bold text-purple-600 mt-1">
                  {totalPermissions}
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-2xl">
                <Key className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        {isFilterVisible && (
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <Input
                  placeholder="Search roles..."
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="rounded-2xl"
                  allowClear
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">All statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-end md:col-span-2">
                <Button
                  onClick={handleClearFilters}
                  className="rounded-2xl w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 items-center">
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={isLoading}
            className="rounded-2xl"
          >
            Refresh
          </Button>

          <Button
            icon={<FilterOutlined />}
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="rounded-2xl"
          >
            Filters
          </Button>

          {canWrite && (
            <div className="ml-auto">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
                className="rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                  border: "none",
                }}
              >
                Create Role
              </Button>
            </div>
          )}
        </div>

        {/* Main Content - Table */}
        <div className="rounded-3xl bg-white shadow-lg ring-1 ring-gray-200">
          {totalRoles === 0 && !isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Empty
                description="No Roles Found"
                style={{ marginTop: 0, marginBottom: 0 }}
              >
                {canWrite && (
                  <Button
                    type="primary"
                    onClick={handleCreate}
                    className="mt-6 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                      border: "none",
                    }}
                  >
                    Create First Role
                  </Button>
                )}
              </Empty>
            </div>
          ) : (
            <div className="p-6">
              <Table
                dataSource={data}
                columns={columns}
                loading={{
                  spinning: isLoading,
                  indicator: (
                    <Spin
                      size="large"
                      tip="Loading roles..."
                      style={{ marginTop: 50 }}
                    />
                  ),
                }}
                rowKey="roleId"
                pagination={{
                  ...pagination,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}–${range[1]} of ${total} roles`,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  size: "default",
                  responsive: true,
                  className: "mt-4",
                }}
                onChange={handleTableChange}
                scroll={{ x: 1000 }}
                locale={{
                  emptyText: (
                    <Empty
                      description="No data available"
                      style={{ marginTop: 20 }}
                    />
                  ),
                }}
                size="middle"
                className="border-none"
              />
            </div>
          )}
        </div>

        {/* Create/Edit Drawer */}
        <Drawer
          title={mode === "create" ? "Create New Role" : "Edit Role"}
          placement="right"
          onClose={handleDrawerClose}
          open={drawerOpen}
          width={600}
          styles={{ body: { paddingBottom: 80 } }}
        >
          <RoleForm
            mode={mode}
            initialData={selectedRole}
            onClose={handleDrawerClose}
          />
        </Drawer>

        {/* Permissions Drawer */}
        <Drawer
          title="Manage Permissions"
          placement="right"
          onClose={handlePermissionsDrawerClose}
          open={permissionsDrawerOpen}
          width={800}
          styles={{ body: { paddingBottom: 80 } }}
        >
          <PermissionsDrawer
            role={selectedRole}
            onClose={handlePermissionsDrawerClose}
          />
        </Drawer>
      </div>
    </div>
  );
};

export default RolesPage;

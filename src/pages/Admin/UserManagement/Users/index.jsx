import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Empty,
  Spin,
  Popconfirm,
  Alert,
  Drawer,
} from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  FilterOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Search, User, Users, CheckCircle, Briefcase } from "lucide-react";
import { useUserHooks } from "./hooks";
import UserForm from "./UserForm";
import UserViewModal from "./UserViewModal";
import UserPermissionsDrawer from "./UserPermissionsDrawer";

const UsersPage = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    columns,
    currentPage,
    pageSize,
    handleTableChange,
    selectedRowKeys,
    rowSelection,
    handleBulkDelete,
    editingUser,
    handleCloseEditDrawer,
    isViewModalVisible,
    viewingUser,
    handleViewModalCancel,
    isCreateDrawerOpen,
    handleOpenCreateDrawer,
    handleCloseCreateDrawer,
    isPermissionsDrawerOpen,
    permissionsUser,
    handleClosePermissionsDrawer,
    search,
    setSearch,
    positionFilter,
    setPositionFilter,
    statusFilter,
    setStatusFilter,
    handleClearFilters,
    isSearching,
  } = useUserHooks();

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleRefresh = () => {
    refetch?.();
  };

  const totalUsers = data?.users?.length || 0;
  const activeUsers =
    data?.users?.filter((u) => u.status === "Active").length || 0;
  const hasSelectedRows = selectedRowKeys.length > 0;

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4 bg-gradient-to-br from-white to-slate-50">
        <div className="w-full max-w-2xl">
          <Alert
            message="Error Loading Users"
            description={
              error.message || "Failed to load users data. Please try again."
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
                User Management
              </h1>
              <p className="text-blue-100">
                Manage clinic staff and their permissions
              </p>
            </div>

            {/* Stats Cards */}
            {totalUsers > 0 && (
              <div className="flex gap-3 flex-wrap">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold text-white">
                    {totalUsers}
                  </div>
                  <div className="text-sm font-medium text-blue-100">
                    Total Users
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold text-green-300">
                    {activeUsers}
                  </div>
                  <div className="text-sm font-medium text-blue-100">
                    Active
                  </div>
                </div>

                {hasSelectedRows && (
                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 text-center min-w-[100px]">
                    <div className="text-2xl font-bold text-amber-300">
                      {selectedRowKeys.length}
                    </div>
                    <div className="text-sm font-medium text-blue-100">
                      Selected
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Total Users</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {totalUsers}
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Active Users</div>
                <div className="text-2xl font-bold text-green-600 mt-1">
                  {activeUsers}
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
                <div className="text-sm text-gray-600">Doctors</div>
                <div className="text-2xl font-bold text-blue-600 mt-1">
                  {data?.users?.filter((u) => u.position === "Doctor").length ||
                    0}
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Staff</div>
                <div className="text-2xl font-bold text-indigo-600 mt-1">
                  {data?.users?.filter((u) => u.position !== "Doctor").length ||
                    0}
                </div>
              </div>
              <div className="p-3 bg-indigo-50 rounded-2xl">
                <Briefcase className="w-6 h-6 text-indigo-600" />
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
                  placeholder="Search users..."
                  prefix={<Search className="w-4 h-4 text-gray-400" />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`rounded-2xl ${isSearching ? "bg-yellow-50 border-yellow-300" : ""}`}
                />
                {isSearching && (
                  <div className="text-xs text-yellow-600 mt-1">
                    Searching...
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">All positions</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">All statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-end">
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

          {hasSelectedRows && (
            <Popconfirm
              title="Delete Selected Users"
              description={`Are you sure you want to delete ${selectedRowKeys.length} user(s)?`}
              onConfirm={handleBulkDelete}
              okText="Delete"
              okType="danger"
              cancelText="Cancel"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                loading={isLoading}
                className="rounded-2xl"
              >
                Delete Selected ({selectedRowKeys.length})
              </Button>
            </Popconfirm>
          )}

          <div className="ml-auto">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenCreateDrawer}
              className="rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                border: "none",
              }}
            >
              Add New User
            </Button>
          </div>
        </div>

        {/* Main Content - Table */}
        <div className="rounded-3xl bg-white shadow-lg ring-1 ring-gray-200">
          {totalUsers === 0 && !isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Empty
                description="No Users Found"
                style={{ marginTop: 0, marginBottom: 0 }}
              >
                <Button
                  type="primary"
                  onClick={handleOpenCreateDrawer}
                  className="mt-6 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                    border: "none",
                  }}
                >
                  Create First User
                </Button>
              </Empty>
            </div>
          ) : (
            <div className="p-6">
              <Table
                dataSource={data?.users}
                columns={columns}
                rowSelection={rowSelection}
                loading={{
                  spinning: isLoading,
                  indicator: (
                    <Spin
                      size="large"
                      tip="Loading users..."
                      style={{ marginTop: 50 }}
                    />
                  ),
                }}
                rowKey="accountId"
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: data?.pagination?.total || 0,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}–${range[1]} of ${total} users`,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  size: "default",
                  responsive: true,
                  className: "mt-4",
                }}
                onChange={handleTableChange}
                scroll={{ x: 1400 }}
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

        {/* Create Drawer */}
        <Drawer
          title="Create New User"
          placement="right"
          onClose={handleCloseCreateDrawer}
          open={isCreateDrawerOpen}
          width={500}
          styles={{ body: { paddingBottom: 80 } }}
        >
          <UserForm
            onSuccess={handleCloseCreateDrawer}
            onCancel={handleCloseCreateDrawer}
          />
        </Drawer>

        {/* Edit Drawer */}
        <Drawer
          title="Edit User"
          placement="right"
          onClose={handleCloseEditDrawer}
          open={!!editingUser}
          width={500}
          styles={{ body: { paddingBottom: 80 } }}
        >
          <UserForm
            user={editingUser}
            onSuccess={handleCloseEditDrawer}
            onCancel={handleCloseEditDrawer}
          />
        </Drawer>

        {/* View Modal */}
        <UserViewModal
          open={isViewModalVisible}
          onClose={handleViewModalCancel}
          user={viewingUser}
        />

        {/* Permissions Drawer */}
        <Drawer
          title="Manage User Permissions"
          placement="right"
          onClose={handleClosePermissionsDrawer}
          open={isPermissionsDrawerOpen}
          width={1000}
          styles={{ body: { padding: 0 } }}
        >
          <UserPermissionsDrawer
            user={permissionsUser}
            onClose={handleClosePermissionsDrawer}
          />
        </Drawer>
      </div>
    </div>
  );
};

export default UsersPage;

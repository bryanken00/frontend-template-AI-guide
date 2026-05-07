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
import { Search, Building2, MapPin, Users, CheckCircle } from "lucide-react";
import { useOrganizationHooks } from "./hooks";
import OrganizationForm from "./OrganizationForm";
import { ViewOrganizationModal } from "./components";

const Organizations = () => {
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
    editingOrganization,
    handleCloseEditModal,
    isViewModalVisible,
    viewingOrganization,
    handleViewModalCancel,
    isCreateModalOpen,
    handleOpenCreateModal,
    handleCloseCreateModal,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    subscriptionFilter,
    setSubscriptionFilter,
    handleClearFilters,
    isSearching,
  } = useOrganizationHooks();

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleRefresh = () => {
    refetch?.();
  };

  const totalOrganizations = data?.organizations?.length || 0;
  const activeOrganizations =
    data?.organizations?.filter((c) => c.status === "Active").length || 0;
  const totalBranches =
    data?.organizations?.reduce((sum, c) => sum + (c.branches || 0), 0) || 0;
  const totalStaff =
    data?.organizations?.reduce((sum, c) => sum + (c.staff || 0), 0) || 0;
  const hasSelectedRows = selectedRowKeys.length > 0;

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4 bg-gradient-to-br from-white to-slate-50">
        <div className="w-full max-w-2xl">
          <Alert
            message="Error Loading Organizations"
            description={
              error.message ||
              "Failed to load organizations data. Please try again."
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50/30 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-purple-700 to-pink-700 p-6 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-700/90"></div>
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5"></div>

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Organization Management
              </h1>
              <p className="text-purple-100">
                Manage all organizations and their information
              </p>
            </div>

            {/* Stats Cards */}
            {totalOrganizations > 0 && (
              <div className="flex gap-3 flex-wrap">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold text-white">
                    {totalOrganizations}
                  </div>
                  <div className="text-sm font-medium text-purple-100">
                    Total
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold text-green-300">
                    {activeOrganizations}
                  </div>
                  <div className="text-sm font-medium text-purple-100">
                    Active
                  </div>
                </div>

                {hasSelectedRows && (
                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 text-center min-w-[100px]">
                    <div className="text-2xl font-bold text-amber-300">
                      {selectedRowKeys.length}
                    </div>
                    <div className="text-sm font-medium text-purple-100">
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
                <div className="text-sm text-gray-600">Total Organizations</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {totalOrganizations}
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-2xl">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Active</div>
                <div className="text-2xl font-bold text-green-600 mt-1">
                  {activeOrganizations}
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
                <div className="text-sm text-gray-600">Total Branches</div>
                <div className="text-2xl font-bold text-purple-600 mt-1">
                  {totalBranches}
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-2xl">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Total Staff</div>
                <div className="text-2xl font-bold text-pink-600 mt-1">
                  {totalStaff}
                </div>
              </div>
              <div className="p-3 bg-pink-50 rounded-2xl">
                <Users className="w-6 h-6 text-pink-600" />
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
                  placeholder="Search organizations..."
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
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                >
                  <option value="">All statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription
                </label>
                <select
                  value={subscriptionFilter}
                  onChange={(e) => setSubscriptionFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                >
                  <option value="">All plans</option>
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
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
              title="Delete Selected Organizations"
              description={`Are you sure you want to delete ${selectedRowKeys.length} organization(s)?`}
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
              onClick={handleOpenCreateModal}
              className="rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              style={{
                background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
                border: "none",
              }}
            >
              Add New Organization
            </Button>
          </div>
        </div>

        {/* Main Content - Table */}
        <div className="rounded-3xl bg-white shadow-lg ring-1 ring-gray-200">
          {totalOrganizations === 0 && !isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Empty
                description="No Organizations Found"
                style={{ marginTop: 0, marginBottom: 0 }}
              >
                <Button
                  type="primary"
                  onClick={handleOpenCreateModal}
                  className="mt-6 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
                    border: "none",
                  }}
                >
                  Create First Organization
                </Button>
              </Empty>
            </div>
          ) : (
            <div className="p-6">
              <Table
                dataSource={data?.organizations}
                columns={columns}
                rowSelection={rowSelection}
                loading={{
                  spinning: isLoading,
                  indicator: (
                    <Spin
                      size="large"
                      tip="Loading organizations..."
                      style={{ marginTop: 50 }}
                    />
                  ),
                }}
                rowKey="id"
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: data?.pagination?.total || 0,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}–${range[1]} of ${total} organizations`,
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

        {/* Modals */}
        <Drawer
          title="Create New Organization"
          placement="right"
          onClose={handleCloseCreateModal}
          open={isCreateModalOpen}
          width={600}
          styles={{ body: { paddingBottom: 80 } }}
        >
          <OrganizationForm
            onSuccess={handleCloseCreateModal}
            onCancel={handleCloseCreateModal}
          />
        </Drawer>

        <Drawer
          title="Edit Organization"
          placement="right"
          onClose={handleCloseEditModal}
          open={!!editingOrganization}
          width={600}
          styles={{ body: { paddingBottom: 80 } }}
        >
          <OrganizationForm
            organization={editingOrganization}
            onSuccess={handleCloseEditModal}
            onCancel={handleCloseEditModal}
          />
        </Drawer>

        <ViewOrganizationModal
          open={isViewModalVisible}
          onClose={handleViewModalCancel}
          organization={viewingOrganization}
        />
      </div>
    </div>
  );
};

export default Organizations;

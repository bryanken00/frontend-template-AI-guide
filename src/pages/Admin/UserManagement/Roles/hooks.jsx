import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message, Tag, Button, Dropdown, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, KeyOutlined } from "@ant-design/icons";
import { MoreVertical } from "lucide-react";
import { getRoles, deleteRole } from "../../../../services/api/admin/roles";
import { usePermissions } from "../../../../hooks/usePermissions";

export const useRolesData = () => {
  const queryClient = useQueryClient();
  const { hasPermission } = usePermissions();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  // Fetch roles
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["roles", pagination.current, pagination.pageSize, filters],
    queryFn: () =>
      getRoles({
        page: pagination.current,
        limit: pagination.pageSize,
        search: filters.search,
        status: filters.status,
      }),
    keepPreviousData: true,
  });

  // Delete role mutation
  const deleteMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      message.success("Role deleted successfully");
      queryClient.invalidateQueries(["roles"]);
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to delete role");
    },
  });

  const handleTableChange = useCallback((newPagination) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  }, []);

  const handleSearch = useCallback((value) => {
    setFilters((prev) => ({ ...prev, search: value }));
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, []);

  const handleStatusFilter = useCallback((value) => {
    setFilters((prev) => ({ ...prev, status: value }));
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, []);

  const handleDelete = useCallback(
    (roleId) => {
      deleteMutation.mutate(roleId);
    },
    [deleteMutation],
  );

  const handleEdit = useCallback((record) => {
    // This will be handled in the parent component
    return record;
  }, []);

  const handleManagePermissions = useCallback((record) => {
    // This will be handled in the parent component
    return record;
  }, []);

  // Dropdown menu items for actions
  const getActionItems = useCallback(
    (record, onEdit, onManagePermissions, onDelete) => {
      const items = [
        {
          key: "permissions",
          label: "Manage Permissions",
          icon: <KeyOutlined />,
          onClick: () => onManagePermissions(record),
          disabled: !hasPermission("users", "permissions", "write"),
        },
      ];

      const canWrite = hasPermission("users", "roles", "write");

      if (canWrite) {
        items.push(
          {
            key: "edit",
            label: "Edit Role",
            icon: <EditOutlined />,
            onClick: () => onEdit(record),
          },
          {
            type: "divider",
          },
          {
            key: "delete",
            label: (
              <Popconfirm
                title="Delete Role"
                description="Are you sure you want to delete this role?"
                onConfirm={() => onDelete(record.roleId)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
              >
                <span className="flex items-center gap-2">
                  <DeleteOutlined />
                  Delete Role
                </span>
              </Popconfirm>
            ),
            danger: true,
          },
        );
      }

      return items;
    },
    [hasPermission],
  );

  // Table columns with actions
  const getColumns = useCallback(
    (onEdit, onManagePermissions, onDelete) => [
      {
        title: "Role Name",
        dataIndex: "roleName",
        key: "roleName",
        sorter: (a, b) => a.roleName.localeCompare(b.roleName),
        width: 200,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
      },
      {
        title: "Permissions",
        dataIndex: "permissionCount",
        key: "permissionCount",
        align: "center",
        width: 150,
        render: (count) => <Tag color="blue">{count || 0} permissions</Tag>,
      },
      {
        title: "Users",
        dataIndex: "userCount",
        key: "userCount",
        align: "center",
        width: 120,
        render: (count) => <Tag color="green">{count || 0} users</Tag>,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center",
        width: 120,
        render: (status) => (
          <Tag color={status === "Active" ? "success" : "default"}>
            {status}
          </Tag>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        fixed: "right",
        width: 80,
        align: "center",
        render: (_, record) => (
          <Dropdown
            menu={{
              items: getActionItems(
                record,
                onEdit,
                onManagePermissions,
                onDelete,
              ),
            }}
            trigger={["click"]}
          >
            <Button
              type="text"
              icon={<MoreVertical className="w-4 h-4" />}
              className="hover:bg-gray-100"
            />
          </Dropdown>
        ),
      },
    ],
    [getActionItems],
  );

  return {
    data: data?.data || [],
    pagination: {
      ...pagination,
      total: data?.pagination?.total || 0,
    },
    filters,
    isLoading,
    error,
    refetch,
    handleTableChange,
    handleSearch,
    handleStatusFilter,
    handleDelete,
    handleEdit,
    handleManagePermissions,
    getActionItems,
    getColumns,
  };
};

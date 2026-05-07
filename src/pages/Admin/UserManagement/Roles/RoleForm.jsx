import { useEffect } from "react";
import { Form, Input, Select, Button, Space, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole, updateRole } from "../../../../services/api/admin/roles";

const { TextArea } = Input;

const RoleForm = ({ mode, initialData, onClose }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.setFieldsValue({
        roleName: initialData.roleName,
        description: initialData.description,
        status: initialData.status,
      });
    }
  }, [mode, initialData, form]);

  const createMutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      message.success("Role created successfully");
      queryClient.invalidateQueries(["roles"]);
      onClose();
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to create role");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ roleId, data }) => updateRole(roleId, data),
    onSuccess: () => {
      message.success("Role updated successfully");
      queryClient.invalidateQueries(["roles"]);
      onClose();
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to update role");
    },
  });

  const handleSubmit = (values) => {
    if (mode === "create") {
      createMutation.mutate(values);
    } else {
      updateMutation.mutate({
        roleId: initialData.roleId,
        data: values,
      });
    }
  };

  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Role Name"
        name="roleName"
        rules={[
          { required: true, message: "Please enter role name" },
          { min: 3, message: "Role name must be at least 3 characters" },
          { max: 50, message: "Role name must not exceed 50 characters" },
        ]}
      >
        <Input placeholder="Enter role name" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please enter description" },
          { min: 10, message: "Description must be at least 10 characters" },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Enter role description"
          showCount
          maxLength={500}
        />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        initialValue="Active"
        rules={[{ required: true, message: "Please select status" }]}
      >
        <Select>
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item className="mb-0">
        <Space className="w-full justify-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 border-0"
          >
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default RoleForm;

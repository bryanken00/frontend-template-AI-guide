import { Form, Input, Select, Button, message, Divider } from "antd";
import { useEffect, useState } from "react";
import {
  Users,
  Mail,
  Phone,
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  Shield,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  useCreateUser,
  useUpdateUser,
} from "../../../../services/requests/admin/user";
import { useAdminAuthStore } from "../../../../store/authStore";
import {
  formatPhoneNumber,
  phoneValidator,
} from "../../../../utils/phoneFormat";
import { validationRules } from "../../../../utils/validation";
import PasswordStrengthIndicator from "../../../../components/PasswordStrengthIndicator";
import { getRoles } from "../../../../services/api/admin/roles";

const { Option } = Select;

const UserForm = ({ user = null, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { userData } = useAdminAuthStore();

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const isEditMode = !!user;

  // Fetch roles
  const { data: rolesData } = useQuery({
    queryKey: ["roles", { status: "Active" }],
    queryFn: () => getRoles({ status: "Active", limit: 100 }),
  });

  const roles = rolesData?.data || [];

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        position: user.position,
        roleId: user.roleId,
        status: user.status,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        status: "Active",
      });
    }
  }, [user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        position: values.position,
        roleId: values.roleId,
        status: values.status,
        organizationId: userData?.organizationId,
      };

      if (isEditMode) {
        await updateUserMutation.mutateAsync({
          userId: user.accountId,
          userData: payload,
        });
      } else {
        // For create, include password
        const createPayload = {
          ...payload,
          password: values.password,
        };
        await createUserMutation.mutateAsync(createPayload);
      }

      form.resetFields();
      onSuccess();
    } catch (error) {
      if (error.errorFields) return; // Form validation errors
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {isEditMode ? "Edit User" : "Create New User"}
          </h2>
        </div>
        <p className="text-sm text-slate-500 ml-11">
          {isEditMode
            ? "Update user account and permissions"
            : "Add a new team member to your organization"}
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        className="flex-1 space-y-1"
      >
        {/* Personal Information Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
            Personal Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input
                placeholder="Juan"
                className="h-11 rounded-xl text-sm"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Last name is required" }]}
            >
              <Input
                placeholder="Dela Cruz"
                className="h-11 rounded-xl text-sm"
                size="large"
              />
            </Form.Item>
          </div>
        </div>

        <Divider className="my-6" />

        {/* Contact Information Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
            Contact Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email address" },
              ]}
            >
              <Input
                placeholder="juan@example.com"
                className="h-11 rounded-xl text-sm"
                prefix={<Mail className="w-4 h-4 text-slate-400 mr-2" />}
                disabled={isEditMode}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ validator: phoneValidator }]}
            >
              <Input
                placeholder="09XX XXX XXXX"
                className="h-11 rounded-xl text-sm"
                prefix={<Phone className="w-4 h-4 text-slate-400 mr-2" />}
                size="large"
                maxLength={11}
                onBlur={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  form.setFieldsValue({ phone: formatted });
                }}
              />
            </Form.Item>
          </div>
        </div>

        <Divider className="my-6" />

        {/* Professional Information Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
            Professional Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: "Please select a position" }]}
            >
              <Select
                placeholder="Select position"
                className="h-11 rounded-xl text-sm"
                size="large"
              >
                <Option value="Manager">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Manager
                  </span>
                </Option>
                <Option value="Team Lead">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Team Lead
                  </span>
                </Option>
                <Option value="Staff">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Staff
                  </span>
                </Option>
                <Option value="Support">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Support
                  </span>
                </Option>
                <Option value="Administrator">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Administrator
                  </span>
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="roleId"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select
                placeholder="Select role"
                className="h-11 rounded-xl text-sm"
                size="large"
                showSearch
                optionFilterProp="children"
              >
                {roles.map((role) => (
                  <Option key={role.roleId} value={role.roleId}>
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {role.roleName}
                    </span>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Form.Item
              name="status"
              label="Status"
              initialValue="Active"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select
                placeholder="Select status"
                className="h-11 rounded-xl text-sm"
                size="large"
              >
                <Option value="Active">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                </Option>
                <Option value="Inactive">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
                    Inactive
                  </span>
                </Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        {/* Password Section - Create Mode Only */}
        {!isEditMode && (
          <>
            <Divider className="my-6" />
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
                Security
              </h3>

              <Form.Item
                name="password"
                label="Temporary Password"
                rules={[validationRules.strongPassword(8)]}
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter temporary password"
                  className="h-11 rounded-xl text-sm"
                  prefix={<Lock className="w-4 h-4 text-slate-400 mr-2" />}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  }
                  size="large"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <PasswordStrengthIndicator password={password} />

              <p className="text-xs text-slate-500 mt-3">
                User will be prompted to change this on first login.
              </p>
            </div>
          </>
        )}
      </Form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-3">
        <Button
          onClick={onCancel}
          className="h-11 px-6 rounded-xl font-medium text-slate-700 border-slate-200 hover:bg-slate-50"
          size="large"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={createUserMutation.isPending || updateUserMutation.isPending}
          className="h-11 px-8 rounded-xl font-medium border-none text-white"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
          }}
          size="large"
        >
          {isEditMode ? "Update User" : "Create User"}
        </Button>
      </div>
    </div>
  );
};

export default UserForm;

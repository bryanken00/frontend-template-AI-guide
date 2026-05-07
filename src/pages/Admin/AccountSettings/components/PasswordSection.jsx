import { Button, Form, Input, message } from "antd";
import { Lock } from "lucide-react";
import { useState } from "react";
import PasswordStrengthIndicator from "../../../../components/PasswordStrengthIndicator";
import { validationRules } from "../../../../utils/validation";

const PasswordSection = () => {
  const [form] = Form.useForm();
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (values) => {
    // TODO: Call change password API
    message.success("Password changed successfully");
    form.resetFields();
    setNewPassword("");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[{ required: true, message: "Current password is required" }]}
      >
        <Input.Password
          prefix={<Lock className="w-4 h-4 text-gray-400" />}
          placeholder="Enter current password"
          size="large"
          className="rounded-xl"
        />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[validationRules.strongPassword(8)]}
      >
        <Input.Password
          prefix={<Lock className="w-4 h-4 text-gray-400" />}
          placeholder="Enter new password"
          size="large"
          className="rounded-xl"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Form.Item>

      <PasswordStrengthIndicator password={newPassword} />

      <Form.Item
        name="confirmPassword"
        label="Confirm New Password"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "Please confirm your new password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<Lock className="w-4 h-4 text-gray-400" />}
          placeholder="Confirm new password"
          size="large"
          className="rounded-xl"
        />
      </Form.Item>

      <div className="flex justify-end pt-2">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="rounded-xl"
          style={{
            background: "var(--gradient-primary)",
            border: "none",
            boxShadow:
              "0 4px 12px color-mix(in srgb, var(--color-primary-color) 35%, transparent)",
          }}
        >
          Change Password
        </Button>
      </div>
    </Form>
  );
};

export default PasswordSection;

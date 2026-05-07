import { Button, Form, Input, message } from "antd";
import { Mail, Phone, User } from "lucide-react";
import { useEffect } from "react";
import { useAdminAuthStore } from "../../../../store/authStore";

const ProfileSection = () => {
  const [form] = Form.useForm();
  const { userData } = useAdminAuthStore();

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
      });
    }
  }, [userData, form]);

  const handleSubmit = async (values) => {
    // TODO: Call update profile API
    message.success("Profile updated successfully");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "First name is required" }]}
        >
          <Input
            prefix={<User className="w-4 h-4 text-gray-400" />}
            placeholder="First name"
            size="large"
            className="rounded-xl"
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Last name is required" }]}
        >
          <Input
            prefix={<User className="w-4 h-4 text-gray-400" />}
            placeholder="Last name"
            size="large"
            className="rounded-xl"
          />
        </Form.Item>
      </div>

      <Form.Item
        name="email"
        label="Email Address"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input
          prefix={<Mail className="w-4 h-4 text-gray-400" />}
          placeholder="Email address"
          size="large"
          className="rounded-xl"
          disabled
        />
      </Form.Item>

      <Form.Item name="phone" label="Phone Number">
        <Input
          prefix={<Phone className="w-4 h-4 text-gray-400" />}
          placeholder="Phone number"
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
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default ProfileSection;

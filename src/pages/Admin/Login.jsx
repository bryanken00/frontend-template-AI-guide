import { App, Button, Form, Input, Typography } from "antd";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { useLoginAdminAuth } from "../../services/requests/admin/auth";

const { Text } = Typography;

const Login = () => {
  const currentYear = moment().year();
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { mutate, isPending } = useLoginAdminAuth();

  useEffect(() => {
    form.setFieldsValue({
      email: "",
      password: "",
    });
  }, [form]);

  const onFinish = (values) => {
    mutate(values, {
      onSuccess: () => {
        form.resetFields();
      },
      onError: (error) => {
        message.error(error.response?.data?.message);
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-r from-indigo-200/15 to-blue-200/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/3 w-72 h-72 bg-linear-to-r from-blue-200/10 to-indigo-200/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Admin Badge */}
      <div className="absolute top-8 right-8 z-20">
        <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/80 border border-blue-200 rounded-2xl shadow-lg">
          <Shield className="text-blue-600 w-5 h-5" />
          <Text className="text-blue-900 text-sm font-semibold">
            Admin Portal
          </Text>
        </div>
      </div>

      {/* Main login container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="relative">
          {/* Glassmorphism card */}
          <div className="relative backdrop-blur-xl bg-white/95 border border-blue-200 rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
            {/* Welcome section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-3xl mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to your admin account to continue
              </p>
            </div>

            {/* Login form */}
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size="large"
              disabled={isPending}
              requiredMark={false}
              className="space-y-6"
            >
              {/* Email field */}
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
                getValueFromEvent={(e) => e.target.value.trim()}
                label={
                  <label className="text-gray-700 font-medium">
                    Email Address
                  </label>
                }
              >
                <Input
                  prefix={<Mail className="w-4 h-4 text-blue-500" />}
                  placeholder="Enter your email"
                  className="rounded-2xl border-blue-200 hover:border-blue-400 focus:border-blue-500 transition-colors duration-200 py-3 bg-white/90"
                />
              </Form.Item>

              {/* Password field */}
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
                label={
                  <label className="text-gray-700 font-medium">Password</label>
                }
              >
                <Input.Password
                  prefix={<Lock className="w-4 h-4 text-blue-500" />}
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? (
                      <Eye className="w-4 h-4 text-blue-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-blue-500" />
                    )
                  }
                  className="rounded-2xl border-blue-200 hover:border-blue-400 focus:border-blue-500 transition-colors duration-200 py-3 bg-white/90"
                />
              </Form.Item>

              {/* Forgot password link */}
              <div className="flex justify-end">
                <NavLink to="/forgot-password">
                  <span className="text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200 hover:underline">
                    Forgot your password?
                  </span>
                </NavLink>
              </div>

              {/* Login button */}
              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isPending}
                  className="w-full h-12 rounded-2xl font-semibold text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-white border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
                  }}
                >
                  {isPending ? "Signing In..." : "Sign In"}
                </Button>
              </Form.Item>
            </Form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-100"></div>
              </div>
            </div>

            {/* Security info */}
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <Shield className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Secured admin access</span>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center mt-8 text-gray-600 text-sm font-medium px-2">
          <span>
            {`© ${currentYear} ${import.meta.env.VITE_APP_NAME || "Your Company"}.`}
            <br />
            All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

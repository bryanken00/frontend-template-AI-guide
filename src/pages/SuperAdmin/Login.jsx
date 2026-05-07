import { App, Button, Form, Input, Typography } from "antd";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { useLoginSuperAdminAuth } from "../../services/requests/superadmin/auth";

const { Text } = Typography;

const Login = () => {
  const currentYear = moment().year();
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { mutate, isPending } = useLoginSuperAdminAuth();

  useEffect(() => {
    form.setFieldsValue({
      email: "superadmin@clinic.com",
      password: "Admin123!",
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
    <div className="flex min-h-screen items-center justify-center px-4 relative overflow-hidden bg-linear-to-br from-purple-50 via-white to-pink-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-r from-pink-200/15 to-purple-200/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/3 w-72 h-72 bg-linear-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* SuperAdmin Badge */}
      <div className="absolute top-8 right-8 z-20">
        <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/80 border border-purple-200 rounded-2xl shadow-lg">
          <ShieldCheck className="text-purple-600 w-5 h-5" />
          <Text className="text-purple-900 text-sm font-semibold">
            SuperAdmin Portal
          </Text>
        </div>
      </div>

      {/* Main login container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="relative">
          {/* Glassmorphism card */}
          <div className="relative backdrop-blur-xl bg-white/95 border border-purple-200 rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
            {/* Welcome section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-3xl mb-4 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                SuperAdmin Access
              </h1>
              <p className="text-gray-600">
                Sign in with your superadmin credentials
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
                  prefix={<Mail className="w-4 h-4 text-purple-500" />}
                  placeholder="Enter your email"
                  className="rounded-2xl border-purple-200 hover:border-purple-400 focus:border-purple-500 transition-colors duration-200 py-3 bg-white/90"
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
                  prefix={<Lock className="w-4 h-4 text-purple-500" />}
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? (
                      <Eye className="w-4 h-4 text-purple-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-purple-500" />
                    )
                  }
                  className="rounded-2xl border-purple-200 hover:border-purple-400 focus:border-purple-500 transition-colors duration-200 py-3 bg-white/90"
                />
              </Form.Item>

              {/* Forgot password link */}
              <div className="flex justify-end">
                <NavLink to="/superadmin/forgot-password">
                  <span className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-200 hover:underline">
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
                      "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
                    boxShadow: "0 4px 20px rgba(147, 51, 234, 0.4)",
                  }}
                >
                  {isPending ? "Signing In..." : "Sign In"}
                </Button>
              </Form.Item>
            </Form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-100"></div>
              </div>
            </div>

            {/* Security info */}
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Maximum security access</span>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center mt-8 text-gray-600 text-sm font-medium px-2">
          <span>
            {`© ${currentYear} GoodHeart Life Center Corporation.`}
            <br />
            All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

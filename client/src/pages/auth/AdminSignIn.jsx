import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, notification } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
const { Title } = Typography;

const AdminSignIn = () => {
  const [form] = Form.useForm();
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(signInStart());
      const { data } = await axios.post("/api/auth/admin/signin", values);
      const userData = {
        ...data,
        role: data.role || "ADMIN",
      };
      dispatch(signInSuccess(userData));
      notification.success({
        message: "Sign In Successful",
        description: `Welcome back, ${userData.name || "Admin"}!`,
        placement: "bottomRight",
        duration: 3,
      });
      navigate("/superadmin");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong during sign in.";
      dispatch(signInFailure(errorMessage));
      notification.error({
        message: "Sign In Failed",
        description: errorMessage,
        placement: "bottomRight",
        duration: 4,
      });
      console.error("Sign in error:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-8">
              <div className="flex items-center justify-center gap-2">
                <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2.5 rounded-xl">
                  <span className="text-xl font-bold text-white">HRMS</span>
                </div>
                <span className="text-xl font-bold text-white">by Nex-Gen</span>
              </div>
            </Link>
            <Title level={2} className="!text-white !mb-2">
              Admin Portal
            </Title>
            <p className="text-gray-400">
              Access the admin dashboard to manage your organization
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
            <Form
              form={form}
              name="admin_login"
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-500" />}
                  placeholder="Admin Email"
                  className="rounded-lg py-2 bg-gray-700 border-gray-600 text-white"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-500" />}
                  placeholder="Password"
                  className="rounded-lg py-2 bg-gray-700 border-gray-600 text-white"
                />
              </Form.Item>

              <div className="flex justify-between items-center mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 border-0 hover:from-blue-600 hover:to-purple-600"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-6 text-center">
              <span className="text-gray-400">Need help? </span>
              <Link
                to="/contact"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Secure SSL encrypted connection
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Admin Control Center</h2>
            <p className="text-xl mb-12 text-gray-300">
              Manage your organization's HR operations with advanced tools and
              complete control.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
              {[
                {
                  title: "User Management",
                  description: "Control access and permissions",
                },
                {
                  title: "Analytics Dashboard",
                  description: "Real-time insights and reports",
                },
                {
                  title: "Security Controls",
                  description: "Advanced security features",
                },
                {
                  title: "System Settings",
                  description: "Configure platform options",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-lg rounded-lg p-6 border border-gray-700"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
    </div>
  );
};

export default AdminSignIn;

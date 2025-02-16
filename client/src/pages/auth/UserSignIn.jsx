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

const UserSignIn = () => {
  const [form] = Form.useForm();
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(signInStart());
      const { data } = await axios.post("/api/auth/signin", values);
      const userData = {
        ...data,
        role: data.role || "USER",
      };
      dispatch(signInSuccess(userData));
      notification.success({
        message: "Sign In Successful",
        description: `Welcome back, ${userData.name || "User"}!`,
        placement: "bottomRight",
        duration: 3,
      });
      navigate(`/${userData.role.toLowerCase()}/dashboard`);
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
      {/* Left Section - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
            <p className="text-xl mb-8 text-white/90">
              Access your dashboard to manage tasks, view reports, and stay
              connected with your team.
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
              {[
                { number: "10k+", label: "Active Users" },
                { number: "98%", label: "Satisfaction" },
                { number: "24/7", label: "Support" },
                { number: "100+", label: "Features" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-4"
                >
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Right Section - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-8">
              <div className="flex items-center justify-center gap-2">
                <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2.5 rounded-xl">
                  <span className="text-xl font-bold text-white">HRMS</span>
                </div>
                <span className="text-xl font-bold text-gray-800">by Nex-Gen</span>
              </div>
            </Link>
            <Title level={2} className="!text-gray-800 !mb-2">
              User Sign In
            </Title>
            <p className="text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Form
              form={form}
              name="user_login"
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
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Email Address"
                  className="rounded-lg py-2"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Password"
                  className="rounded-lg py-2"
                />
              </Form.Item>

              <div className="flex justify-between items-center mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:from-blue-700 hover:to-purple-700"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-6 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/contact"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Contact Admin
              </Link>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-gray-600 hover:text-blue-600 mx-4">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 mx-4">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserSignIn;

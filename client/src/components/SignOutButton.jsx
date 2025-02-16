import { Button, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";

const SignOutButton = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signout");

      if (response.data.success) {
        dispatch(signOutSuccess());
        notification.success({
          message: "Sign Out Successful",
          description: "You have been successfully signed out.",
          placement: "bottomRight",
        });
        navigate("/");
      }
    } catch (error) {
      notification.error({
        message: "Sign Out Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong during sign out.",
        placement: "bottomRight",
      });

      console.error("Sign out error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      loading={loading}
      danger
      type="primary"
      className="hover:bg-red-600"
    >
      {loading ? "Signing Out..." : "Sign Out"}
    </Button>
  );
};

export default SignOutButton;

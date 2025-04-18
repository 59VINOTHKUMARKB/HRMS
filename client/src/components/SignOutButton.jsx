import { Button, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
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
        navigate("/");
      }
    } catch (error) {
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
      className="hover:bg-red-600 w-full"
    >
      <FiLogOut className="w-4 h-4 mr-2" />
      {loading ? "Signing Out..." : "Sign Out"}
    </Button>
  );
};

export default SignOutButton;

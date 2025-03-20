import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { USER_SIGNIN_ROUTE } from "../utils/routes";

const PrivateRoute = ({ allowedRoles }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to={USER_SIGNIN_ROUTE} />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to={USER_SIGNIN_ROUTE} />;
  }

  return <Outlet />;
};

export default PrivateRoute;

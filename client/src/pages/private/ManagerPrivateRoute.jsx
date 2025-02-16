import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { USER_SIGNIN_ROUTE } from "../../utils/routes";
function ManagerPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.role === "MANAGER" ? (
    <Outlet />
  ) : (
    <Navigate to={USER_SIGNIN_ROUTE} />
  );
}

export default ManagerPrivateRoute;

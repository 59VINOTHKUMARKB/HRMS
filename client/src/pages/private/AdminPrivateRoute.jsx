import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function AdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/signin/admin" />;
  }

  if (currentUser.role !== "SUPER_ADMIN" && currentUser.role !== "ADMIN") {
    return <Navigate to="/signin/admin" />;
  }

  return <Outlet />;
}

export default AdminPrivateRoute;

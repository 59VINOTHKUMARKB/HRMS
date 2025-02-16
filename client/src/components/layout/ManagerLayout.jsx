import { Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import ManagerSidebar from "./ManagerSidebar";
import Header from "../Header";

const ManagerLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("ManagerLayout - currentUser:", currentUser);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user: currentUser,
    }),
    [currentUser]
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet context={contextValue} />
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;

// Export a helper hook to easily access the user data in child components
export const useUser = () => {
  const context = useOutletContext();
  if (!context) {
    console.warn("useUser hook was called outside of SuperAdminLayout context");
    return { user: null };
  }
  return context;
};

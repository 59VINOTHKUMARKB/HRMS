import { Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import HRSidebar from "./HRSidebar";
import Header from "../Header";

const HRLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const contextValue = useMemo(
    () => ({
      user: currentUser,
    }),
    [currentUser]
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <HRSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet context={contextValue} />
        </main>
      </div>
    </div>
  );
};

export default HRLayout;

// Export a helper hook to easily access the user data in child components
export const useUser = () => {
  const context = useOutletContext();
  if (!context) {
    console.warn("useUser hook was called outside of HRLayout context");
    return { user: null };
  }
  return context;
};

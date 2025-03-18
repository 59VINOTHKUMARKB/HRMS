import { Menu } from "antd";
import { FiBell, FiSearch, FiSettings, FiUser } from "react-icons/fi";
import SignOutButton from "./SignOutButton";

const Header = ({ user }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center flex-1">
          {/* <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div> */}
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <FiBell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {user && <SignOutButton />}

          <div className="flex items-center space-x-3 border-l pl-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <FiUser className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-gray-500">
                {user?.role === "ORG_ADMIN" || user?.role === "SUPER_ADMIN"
                  ? "Super Admin"
                  : user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

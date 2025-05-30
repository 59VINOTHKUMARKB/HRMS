import {
  FiBriefcase,
  FiCalendar,
  FiCheckSquare,
  FiDatabase,
  FiHome,
  FiLayers,
  FiSettings,
  FiUser,
  FiUsers
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import SignOutButton from "./SignOutButton";
const SideBarMenu = ({ user }) => {
  const location = useLocation();
  const allMenuItems = [
    // {
    //   path: "/superadmin/dashboard",
    //   icon: FiHome,
    //   label: "Dashboard",
    //   roles: ["SUPER_ADMIN", "ORG_ADMIN"],
    // },
    {
      path: "/superadmin/organizations",
      icon: FiLayers,
      label: "Organization",
      roles: ["SUPER_ADMIN", "ORG_ADMIN"],
    },
    {
      path: "/superadmin/department",
      icon: FiBriefcase,
      label: "Departments",
      roles: ["SUPER_ADMIN", "ORG_ADMIN"],
    },

    {
      path: "/superadmin/users",
      icon: FiUsers,
      label: "User Management",
      roles: ["SUPER_ADMIN", "ORG_ADMIN"],
    },
    {
      path: "/superadmin/database",
      icon: FiDatabase,
      label: "Database Management",
      roles: ["SUPER_ADMIN"],
    },
    // {
    //   path: "/superadmin/billing",
    //   icon: FiDollarSign,
    //   label: "Billing & Plans",
    //   roles: ["SUPER_ADMIN"],
    // },
    // {
    //   path: "/superadmin/security",
    //   icon: FiShield,
    //   label: "Security Settings",
    //   roles: ["SUPER_ADMIN"],
    // },
    // {
    //   path: "/superadmin/analytics",
    //   icon: FiTrendingUp,
    //   label: "Analytics",
    //   roles: ["SUPER_ADMIN"],
    // },
    // {
    //   path: "/superadmin/integrations",
    //   icon: FiGlobe,
    //   label: "Integrations",
    //   roles: ["SUPER_ADMIN"],
    // },
    // {
    //   path: "/superadmin/audit",
    //   icon: FiFileText,
    //   label: "Audit Logs",
    //   roles: ["SUPER_ADMIN"],
    // },
    // {
    //   path: "/superadmin/alerts",
    //   icon: FiAlertCircle,
    //   label: "System Alerts",
    //   roles: ["SUPER_ADMIN"],
    // },
    {
      path: "/superadmin/settings",
      icon: FiSettings,
      label: "System Settings",
      roles: ["SUPER_ADMIN"],
    },
    // {
    //   path: "/superadmin/maintenance",
    //   icon: FiTool,
    //   label: "Maintenance",
    //   roles: ["SUPER_ADMIN"],
    // },
    {
      path: "/superadmin/org-settings",
      icon: FiLayers,
      label: "Settings",
      roles: ["ORG_ADMIN"],
    },

    {
      path: "/manager/dashboard",
      icon: FiHome,
      label: "Dashboard",
      roles: ["MANAGER"],
    },
    {
      path: "/hr/team",
      icon: FiUsers,
      label: "Teams",
      roles: ["HR"],
    },
    {
      path: "/manager/leave",
      icon: FiCheckSquare,
      label: "Leave Management",
      roles: ["MANAGER"],
    },
    {
      path: "/manager/teams",
      icon: FiUsers,
      label: "My Team",
      roles: ["MANAGER"],
    },
    // {
    //   path: "/manager/performance",
    //   icon: FiTarget,
    //   label: "Performance Reviews",
    //   roles: ["MANAGER"],
    // },
    // {
    //   path: "/manager/expenses",
    //   icon: FiDollarSign,
    //   label: "Expense Approvals",
    //   roles: ["MANAGER"],
    // },
    // {
    //   path: "/manager/training",
    //   icon: FiBook,
    //   label: "Training Management",
    //   roles: ["MANAGER"],
    // },
    // {
    //   path: "/manager/reports",
    //   icon: FiPieChart,
    //   label: "Team Reports",
    //   roles: ["MANAGER"],
    // },
    // {
    //   path: "/manager/feedback",
    //   icon: FiMessageSquare,
    //   label: "Team Feedback",
    //   roles: ["MANAGER"],
    // },
    // {
    //   path: "/manager/tasks",
    //   icon: FiClipboard,
    //   label: "Task Management",
    //   roles: ["MANAGER"],
    // },

    {
      path: "/employee/profile",
      icon: FiUser,
      label: "My Profile",
      roles: ["EMPLOYEE"],
    },
    {
      path: "/employee/dashboard",
      icon: FiHome,
      label: "Dashboard",
      roles: ["EMPLOYEE"],
    },
    {
      path: "/employee/leave",
      icon: FiCalendar,
      label: "Leave Management",
      roles: ["EMPLOYEE"],
    },
    // {
    //   path: "/employee/attendance",
    //   icon: FiClock,
    //   label: "Attendance",
    //   roles: ["EMPLOYEE"],
    // },

    // {
    //   path: "/employee/payroll",
    //   icon: FiDollarSign,
    //   label: "Payroll",
    //   roles: ["EMPLOYEE"],
    // },
    // {
    //   path: "/employee/training",
    //   icon: FiBook,
    //   label: "Training",
    //   roles: ["EMPLOYEE"],
    // },
    // {
    //   path: "/employee/expenses",
    //   icon: FiFileText,
    //   label: "Expense Claims",
    //   roles: ["EMPLOYEE"],
    // },
    // {
    //   path: "/employee/announcements",
    //   icon: FiBell,
    //   label: "Announcements",
    //   roles: ["EMPLOYEE"],
    // },
    // {
    //   path: "/employee/support",
    //   icon: FiHelpCircle,
    //   label: "Support",
    //   roles: ["EMPLOYEE"],
    // },

    { path: "/hr/dashboard", icon: FiHome, label: "Dashboard", roles: ["HR"] },
    { path: "/hr/employees", icon: FiUsers, label: "Employees", roles: ["HR"] },
    {
      path: "/hr/attendance",
      icon: FiCalendar,
      label: "Attendance",
      roles: ["HR"],
    },
    // {
    //   path: "/hr/payroll",
    //   icon: FiDollarSign,
    //   label: "Payroll",
    //   roles: ["HR"],
    // },
    // {
    //   path: "/hr/recruitment",
    //   icon: FiUserPlus,
    //   label: "Recruitment",
    //   roles: ["HR"],
    // },
    // {
    //   path: "/hr/performance",
    //   icon: FiTarget,
    //   label: "Performance",
    //   roles: ["HR"],
    // },
    // { path: "/hr/training", icon: FiBook, label: "Training", roles: ["HR"] },
    // {
    //   path: "/hr/expenses",
    //   icon: FiFileText,
    //   label: "Expenses",
    //   roles: ["HR"],
    // },
    // { path: "/hr/reports", icon: FiPieChart, label: "Reports", roles: ["HR"] },
    // {
    //   path: "/hr/documents",
    //   icon: FiFolder,
    //   label: "Documents",
    //   roles: ["HR"],
    // },
    // {
    //   path: "/hr/compliance",
    //   icon: FiShield,
    //   label: "Compliance",
    //   roles: ["HR"],
    // },
    // {
    //   path: "/hr/exit",
    //   icon: FiLogOut,
    //   label: "Exit Management",
    //   roles: ["HR"],
    // },
    // {
    //   path: "/hr/organization",
    //   icon: FiGitMerge,
    //   label: "Organization",
    //   roles: ["HR"],
    // },
    // {
    //   path: "/hr/onboarding",
    //   icon: FiUserCheck,
    //   label: "Onboarding",
    //   roles: ["HR"],
    // },
  ];

  const filteredMenuItems = allMenuItems.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <aside className="bg-gray-900 text-gray-100 w-64 min-h-screen flex flex-col shadow-lg">
      {/* Logo / Brand */}
      <div className="py-4 text-center border-b border-gray-700">
        <a href="/">
          <h1 className="text-xl font-semibold text-blue-400">HRMS-NexGen</h1>
        </a>
      </div>

      {/* User Info Section */}
      <div className="flex items-center gap-3 p-3 border-b border-gray-700">
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-semibold">
          {user?.name?.charAt(0)}
        </div>
        <div className="text-sm">
          <p className="font-medium">{user?.name}</p>
          <p className="text-gray-400">{user?.role}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 mt-1">
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 text-sm rounded-md mx-2 transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4 mr-2" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-2 flex items-center justify-center">
        <SignOutButton />
      </div>
    </aside>
  );
};

export default SideBarMenu;

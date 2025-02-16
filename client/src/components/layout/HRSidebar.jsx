import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiCalendar, FiDollarSign, 
  FiUserPlus, FiTarget, FiBook, FiFileText,
  FiPieChart, FiFolder, FiShield, FiLogOut,
  FiGitMerge, FiUserCheck
} from 'react-icons/fi';

const menuItems = [
  { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
  { path: '/employees', icon: FiUsers, label: 'Employees' },
  { path: '/attendance', icon: FiCalendar, label: 'Attendance' },
  { path: '/payroll', icon: FiDollarSign, label: 'Payroll' },
  { path: '/recruitment', icon: FiUserPlus, label: 'Recruitment' },
  { path: '/performance', icon: FiTarget, label: 'Performance' },
  { path: '/training', icon: FiBook, label: 'Training' },
  { path: '/expenses', icon: FiFileText, label: 'Expenses' },
  { path: '/reports', icon: FiPieChart, label: 'Reports' },
  { path: '/documents', icon: FiFolder, label: 'Documents' },
  { path: '/compliance', icon: FiShield, label: 'Compliance' },
  { path: '/exit', icon: FiLogOut, label: 'Exit Management' },
  { path: '/organization', icon: FiGitMerge, label: 'Organization' },
  { path: '/onboarding', icon: FiUserCheck, label: 'Onboarding' }
];

const HRSidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold text-blue-600">HRMS</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default HRSidebar; 
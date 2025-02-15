import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiUser, FiCalendar, FiDollarSign, 
  FiBook, FiFileText, FiBell, FiHelpCircle,
  FiClock
} from 'react-icons/fi';

const menuItems = [
  { path: '/employee/dashboard', icon: FiHome, label: 'Dashboard' },
  { path: '/employee/profile', icon: FiUser, label: 'My Profile' },
  { path: '/employee/attendance', icon: FiClock, label: 'Attendance' },
  { path: '/employee/leave', icon: FiCalendar, label: 'Leave Management' },
  { path: '/employee/payroll', icon: FiDollarSign, label: 'Payroll' },
  { path: '/employee/training', icon: FiBook, label: 'Training' },
  { path: '/employee/expenses', icon: FiFileText, label: 'Expense Claims' },
  { path: '/employee/announcements', icon: FiBell, label: 'Announcements' },
  { path: '/employee/support', icon: FiHelpCircle, label: 'Support' }
];

const EmployeeSidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold text-blue-600">Employee Portal</h2>
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

export default EmployeeSidebar; 
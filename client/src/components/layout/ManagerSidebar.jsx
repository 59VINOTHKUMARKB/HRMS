import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiCalendar, FiTarget,
  FiDollarSign, FiBook, FiPieChart, FiCheckSquare,
  FiMessageSquare, FiClipboard
} from 'react-icons/fi';

const menuItems = [
  { path: '/manager/dashboard', icon: FiHome, label: 'Dashboard' },
  { path: '/manager/team', icon: FiUsers, label: 'My Team' },
  { path: '/manager/attendance', icon: FiCalendar, label: 'Team Attendance' },
  { path: '/manager/leave', icon: FiCheckSquare, label: 'Leave Management' },
  { path: '/manager/performance', icon: FiTarget, label: 'Performance Reviews' },
  { path: '/manager/expenses', icon: FiDollarSign, label: 'Expense Approvals' },
  { path: '/manager/training', icon: FiBook, label: 'Training Management' },
  { path: '/manager/reports', icon: FiPieChart, label: 'Team Reports' },
  { path: '/manager/feedback', icon: FiMessageSquare, label: 'Team Feedback' },
  { path: '/manager/tasks', icon: FiClipboard, label: 'Task Management' }
];

const ManagerSidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold text-blue-600">Manager Portal</h2>
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

export default ManagerSidebar; 
import DashboardStats from '../../components/dashboard/DashboardStats';
import { FiTrendingUp, FiClock, FiCalendar, FiUser } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      <DashboardStats />

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[
              {
                icon: FiUser,
                title: 'New Employee Onboarded',
                description: 'John Doe joined as Software Developer',
                time: '2 hours ago',
              },
              {
                icon: FiClock,
                title: 'Leave Request',
                description: 'Sarah approved Mark\'s leave request',
                time: '3 hours ago',
              },
              {
                icon: FiCalendar,
                title: 'Upcoming Review',
                description: 'Performance review scheduled for Team A',
                time: '5 hours ago',
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <activity.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Add Employee', icon: FiUser },
              { title: 'Process Payroll', icon: FiTrendingUp },
              { title: 'Approve Leave', icon: FiCalendar },
              { title: 'Schedule Interview', icon: FiClock },
            ].map((action, index) => (
              <button
                key={index}
                className="p-4 border rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
              >
                <action.icon className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
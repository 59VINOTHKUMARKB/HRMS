import { useState } from "react";
import { useUser } from "../../components/layout/SuperAdminLayout";
import {
  FiUsers,
  FiDollarSign,
  FiUserPlus,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiBarChart2,
  FiTrendingUp,
} from "react-icons/fi";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const { user } = useUser();

  const organizationStats = {
    totalEmployees: "245",
    activePositions: "12",
    departments: "8",
    avgAttendance: "94%",
    totalPayroll: "$425,000",
    leaveRequests: "15",
    openTickets: "8",
    trainingPrograms: "6",
  };

  const recentActivities = [
    {
      id: 1,
      type: "New Hire",
      description: "Sarah Wilson joined as UI/UX Designer",
      department: "Design",
      date: "2024-03-20",
      status: "Completed",
    },
    {
      id: 2,
      type: "Leave Request",
      description: "John Doe requested annual leave",
      department: "Engineering",
      date: "2024-03-19",
      status: "Pending",
    },
    {
      id: 3,
      type: "Training",
      description: "New Security Compliance Training launched",
      department: "All",
      date: "2024-03-18",
      status: "Active",
    },
  ];

  const departmentMetrics = [
    {
      name: "Engineering",
      headcount: 85,
      openPositions: 4,
      attendance: 96,
      performance: 92,
    },
    {
      name: "Design",
      headcount: 32,
      openPositions: 2,
      attendance: 94,
      performance: 88,
    },
    {
      name: "Marketing",
      headcount: 28,
      openPositions: 1,
      attendance: 92,
      performance: 90,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || "Admin"}</p>
        </div>
        <div className="flex space-x-4">
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* Organization Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <h3 className="text-2xl font-bold mt-1">
                {organizationStats.totalEmployees}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Payroll</p>
              <h3 className="text-2xl font-bold mt-1">
                {organizationStats.totalPayroll}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiDollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Open Positions</p>
              <h3 className="text-2xl font-bold mt-1">
                {organizationStats.activePositions}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiUserPlus className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Attendance</p>
              <h3 className="text-2xl font-bold mt-1">
                {organizationStats.avgAttendance}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FiCalendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Department Overview</h2>
            <div className="space-y-6">
              {departmentMetrics.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{dept.name}</h3>
                    <span className="text-sm text-gray-500">
                      {dept.headcount} employees
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Open Positions</p>
                      <p className="font-medium">{dept.openPositions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Attendance</p>
                      <p className="font-medium">{dept.attendance}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Performance</p>
                      <p className="font-medium">{dept.performance}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${dept.performance}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div
                  className={`p-2 rounded-full ${
                    activity.status === "Completed"
                      ? "bg-green-100"
                      : activity.status === "Pending"
                      ? "bg-yellow-100"
                      : "bg-blue-100"
                  }`}
                >
                  {activity.status === "Completed" ? (
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                  ) : activity.status === "Pending" ? (
                    <FiClock className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <FiAlertCircle className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">{activity.type}</h3>
                    <span className="text-xs text-gray-500">
                      {activity.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                  <span className="text-xs text-gray-500">
                    {activity.department}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center space-x-2">
          <FiUserPlus className="w-5 h-5 text-blue-600" />
          <span>Add Employee</span>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center space-x-2">
          <FiDollarSign className="w-5 h-5 text-green-600" />
          <span>Process Payroll</span>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center space-x-2">
          <FiBarChart2 className="w-5 h-5 text-purple-600" />
          <span>View Reports</span>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center space-x-2">
          <FiTrendingUp className="w-5 h-5 text-yellow-600" />
          <span>Performance Review</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

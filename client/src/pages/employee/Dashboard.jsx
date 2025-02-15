import { useState } from "react";
import {
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiBook,
  FiFileText,
  FiAlertCircle,
  FiBell,
  FiCheckCircle,
} from "react-icons/fi";

const EmployeeDashboard = () => {
  const quickActions = [
    { title: "Apply Leave", icon: FiCalendar, color: "blue" },
    { title: "Mark Attendance", icon: FiClock, color: "green" },
    { title: "Download Payslip", icon: FiDollarSign, color: "yellow" },
    { title: "Submit Expense", icon: FiFileText, color: "purple" },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "Leave Request",
      status: "Approved",
      date: "2024-03-20",
      description: "Annual leave request approved",
    },
    {
      id: 2,
      type: "Training",
      status: "Assigned",
      date: "2024-03-19",
      description: "New training course assigned: React Advanced",
    },
    {
      id: 3,
      type: "Payslip",
      status: "Generated",
      date: "2024-03-15",
      description: "March 2024 payslip available",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Employee Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Leave Balance",
            value: "12 days",
            icon: FiCalendar,
            color: "blue",
          },
          {
            label: "Pending Tasks",
            value: "3",
            icon: FiClock,
            color: "yellow",
          },
          {
            label: "Training Progress",
            value: "75%",
            icon: FiBook,
            color: "green",
          },
          {
            label: "Announcements",
            value: "2 New",
            icon: FiBell,
            color: "red",
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="p-4 border rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
                >
                  <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                  <span className="text-sm font-medium">{action.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiCheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{activity.type}</h3>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                    <span className="text-xs text-gray-500">
                      {activity.date}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ml-auto ${
                      activity.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : activity.status === "Assigned"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

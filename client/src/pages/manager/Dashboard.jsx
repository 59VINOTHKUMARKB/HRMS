import { useState } from "react";
import {
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiTrendingUp,
} from "react-icons/fi";

const ManagerDashboard = () => {
  const stats = [
    { label: "Team Members", value: "12", icon: FiUsers, color: "blue" },
    {
      label: "Present Today",
      value: "10",
      icon: FiCheckCircle,
      color: "green",
    },
    { label: "On Leave", value: "2", icon: FiCalendar, color: "yellow" },
    { label: "Pending Requests", value: "5", icon: FiClock, color: "red" },
  ];

  const pendingActions = [
    {
      id: 1,
      type: "Leave Request",
      employee: "John Doe",
      status: "Pending Approval",
      date: "2024-03-20",
      priority: "High",
    },
    {
      id: 2,
      type: "Expense Claim",
      employee: "Sarah Wilson",
      status: "Review Required",
      date: "2024-03-19",
      priority: "Medium",
    },
    {
      id: 3,
      type: "Performance Review",
      employee: "Mike Johnson",
      status: "Due",
      date: "2024-03-25",
      priority: "High",
    },
  ];

  const teamPerformance = [
    {
      id: 1,
      name: "Project Completion",
      value: "85%",
      trend: "up",
      change: "+5%",
    },
    {
      id: 2,
      name: "Team Productivity",
      value: "92%",
      trend: "up",
      change: "+3%",
    },
    {
      id: 3,
      name: "Task Completion",
      value: "78%",
      trend: "down",
      change: "-2%",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Pending Actions</h2>
          <div className="space-y-4">
            {pendingActions.map((action) => (
              <div
                key={action.id}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{action.type}</h3>
                  <p className="text-sm text-gray-600">
                    {action.employee} - {action.status}
                  </p>
                  <span className="text-xs text-gray-500">{action.date}</span>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    action.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {action.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Team Performance</h2>
          <div className="space-y-4">
            {teamPerformance.map((metric) => (
              <div key={metric.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{metric.name}</h3>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  </div>
                  <div
                    className={`flex items-center ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <FiTrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">{metric.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

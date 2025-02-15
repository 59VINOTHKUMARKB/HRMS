import { useState } from "react";
import {
  FiHelpCircle,
  FiPlus,
  FiMessageCircle,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const EmployeeSupport = () => {
  const [activeTab, setActiveTab] = useState("active");

  const tickets = [
    {
      id: 1,
      subject: "Access to Development Server",
      category: "IT Support",
      priority: "High",
      status: "In Progress",
      createdAt: "2024-03-20",
      lastUpdate: "2024-03-21",
      description: "Need access credentials for the new development server.",
    },
    {
      id: 2,
      subject: "Salary Slip Discrepancy",
      category: "HR Support",
      priority: "Medium",
      status: "Open",
      createdAt: "2024-03-19",
      lastUpdate: "2024-03-19",
      description: "Found a discrepancy in my March salary slip.",
    },
  ];

  const stats = [
    { label: "Total Tickets", value: "5", icon: FiMessageCircle },
    { label: "Active", value: "2", icon: FiClock },
    { label: "Resolved", value: "3", icon: FiCheckCircle },
    { label: "Pending", value: "0", icon: FiXCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Support Requests</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlus className="mr-2" /> New Request
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">My Tickets</h2>
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "active"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("active")}
              >
                Active
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "resolved"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("resolved")}
              >
                Resolved
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{ticket.subject}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {ticket.description}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      ticket.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : ticket.status === "Open"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>{ticket.category}</span>
                    <span>Priority: {ticket.priority}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>Created: {ticket.createdAt}</span>
                    <span>Last Update: {ticket.lastUpdate}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSupport; 
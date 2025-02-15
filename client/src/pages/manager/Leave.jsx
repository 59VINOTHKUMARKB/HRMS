import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const ManagerLeave = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const leaveRequests = [
    {
      id: 1,
      employee: "John Doe",
      type: "Annual Leave",
      startDate: "2024-04-01",
      endDate: "2024-04-05",
      days: 5,
      reason: "Family vacation",
      status: "Pending",
      appliedOn: "2024-03-15",
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      type: "Sick Leave",
      startDate: "2024-03-25",
      endDate: "2024-03-26",
      days: 2,
      reason: "Medical appointment",
      status: "Approved",
      appliedOn: "2024-03-20",
    },
  ];

  const stats = [
    { label: "Total Requests", value: "8", icon: FiCalendar },
    { label: "Pending", value: "3", icon: FiClock },
    { label: "Approved", value: "4", icon: FiCheckCircle },
    { label: "Rejected", value: "1", icon: FiXCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Management</h1>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "approved"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("approved")}
          >
            Approved
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "rejected"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("rejected")}
          >
            Rejected
          </button>
        </div>
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

      {/* Leave Requests */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium">Leave Requests</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{request.employee}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {request.type} ({request.days} days)
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {request.startDate} to {request.endDate}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Reason: {request.reason}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      Applied: {request.appliedOn}
                    </span>
                  </div>
                </div>
                {request.status === "Pending" && (
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerLeave; 
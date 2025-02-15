import { useState } from "react";
import {
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
} from "react-icons/fi";

const ManagerExpenses = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const expenseClaims = [
    {
      id: 1,
      employee: "John Doe",
      date: "2024-03-20",
      category: "Travel",
      amount: 250.00,
      description: "Client meeting travel expenses",
      status: "Pending",
      attachments: 2,
      submittedDate: "2024-03-21",
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      date: "2024-03-15",
      category: "Office Supplies",
      amount: 75.50,
      description: "Stationery and printer cartridge",
      status: "Approved",
      attachments: 1,
      submittedDate: "2024-03-16",
    },
  ];

  const stats = [
    { label: "Total Claims", value: "$1,250", icon: FiDollarSign },
    { label: "Pending", value: "5", icon: FiClock },
    { label: "Approved", value: "12", icon: FiCheckCircle },
    { label: "Rejected", value: "2", icon: FiXCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expense Approvals</h1>
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

      {/* Expense Claims */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium">Expense Claims</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {expenseClaims.map((claim) => (
              <div
                key={claim.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{claim.employee}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {claim.category} - ${claim.amount}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Date: {claim.date}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {claim.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Attachments: {claim.attachments} files
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        claim.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : claim.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {claim.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      Submitted: {claim.submittedDate}
                    </span>
                  </div>
                </div>
                {claim.status === "Pending" && (
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

export default ManagerExpenses; 
import { useState } from "react";
import {
  FiDollarSign,
  FiPlus,
  FiFileText,
  FiCalendar,
  FiDownload,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const EmployeeExpenses = () => {
  const [activeTab, setActiveTab] = useState("claims");

  const expenseClaims = [
    {
      id: 1,
      date: "2024-03-20",
      category: "Travel",
      amount: 250.0,
      description: "Client meeting travel expenses",
      status: "Pending",
      attachments: 2,
    },
    {
      id: 2,
      date: "2024-03-15",
      category: "Office Supplies",
      amount: 75.5,
      description: "Stationery and printer cartridge",
      status: "Approved",
      attachments: 1,
    },
  ];

  const stats = [
    { label: "Total Claims", value: "$1,250", icon: FiDollarSign },
    { label: "Pending", value: "$250", icon: FiClock },
    { label: "Approved", value: "$1,000", icon: FiCheckCircle },
    { label: "Rejected", value: "$0", icon: FiXCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expense Claims</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlus className="mr-2" /> New Claim
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

      {/* Claims List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium">Recent Claims</h2>
        </div>
        <div className="p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attachments
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenseClaims.map((claim) => (
                <tr key={claim.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {claim.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {claim.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {claim.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${claim.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        claim.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : claim.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {claim.attachments} files
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeExpenses;

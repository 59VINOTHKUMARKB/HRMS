import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiFileText,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmployeeLeave = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const leaveBalance = [
    { type: "Annual Leave", total: 21, used: 12, remaining: 9 },
    { type: "Sick Leave", total: 10, used: 3, remaining: 7 },
    { type: "Personal Leave", total: 5, used: 2, remaining: 3 },
    { type: "Unpaid Leave", total: "-", used: 1, remaining: "-" },
  ];

  const leaveRequests = [
    {
      id: 1,
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
      type: "Sick Leave",
      startDate: "2024-03-10",
      endDate: "2024-03-11",
      days: 2,
      reason: "Medical appointment",
      status: "Approved",
      appliedOn: "2024-03-08",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Management</h1>
        <button
          onClick={() => navigate("/test/leaveForm")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FiPlus className="mr-2" /> Apply Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {leaveBalance.map((leave, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">{leave.type}</h3>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold">{leave.remaining}</p>
                <p className="text-sm text-gray-500">Remaining</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Used: {leave.used}/{leave.total}
                </p>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${(leave.used / leave.total) * 100}%` }}
              ></div>
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.startDate} to {request.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.days}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.appliedOn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        request.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
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

export default EmployeeLeave;

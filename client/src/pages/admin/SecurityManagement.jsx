import { useState } from "react";
import {
  FiShield,
  FiLock,
  FiUsers,
  FiAlertTriangle,
  FiActivity,
  FiKey,
  FiRefreshCw,
  FiEye,
} from "react-icons/fi";

const SecurityManagement = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const securityStats = {
    activeUsers: "245",
    failedLogins: "12",
    securityAlerts: "3",
    lastAudit: "2024-03-15",
  };

  const recentActivities = [
    {
      id: 1,
      type: "Login Attempt",
      user: "John Doe",
      ip: "192.168.1.1",
      location: "New York, US",
      status: "Success",
      timestamp: "2024-03-20 09:30 AM",
    },
    {
      id: 2,
      type: "Password Change",
      user: "Sarah Wilson",
      ip: "192.168.1.2",
      location: "London, UK",
      status: "Success",
      timestamp: "2024-03-20 08:15 AM",
    },
    {
      id: 3,
      type: "Login Attempt",
      user: "Mike Johnson",
      ip: "192.168.1.3",
      location: "Unknown",
      status: "Failed",
      timestamp: "2024-03-20 07:45 AM",
    },
  ];

  const securityPolicies = [
    {
      id: 1,
      name: "Password Policy",
      status: "Active",
      lastUpdated: "2024-03-01",
      settings: {
        minLength: 8,
        requireSpecialChar: true,
        requireNumber: true,
        expiryDays: 90,
      },
    },
    {
      id: 2,
      name: "Two-Factor Authentication",
      status: "Active",
      lastUpdated: "2024-03-15",
      settings: {
        required: true,
        methods: ["SMS", "Email", "Authenticator App"],
      },
    },
    {
      id: 3,
      name: "Session Management",
      status: "Active",
      lastUpdated: "2024-03-10",
      settings: {
        timeout: 30,
        maxConcurrent: 2,
        enforceSignout: true,
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Security Management</h1>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
          <FiAlertTriangle className="mr-2" /> Security Alerts
        </button>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <h3 className="text-2xl font-bold mt-1">
                {securityStats.activeUsers}
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
              <p className="text-sm text-gray-500">Failed Logins (24h)</p>
              <h3 className="text-2xl font-bold mt-1">
                {securityStats.failedLogins}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FiLock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Security Alerts</p>
              <h3 className="text-2xl font-bold mt-1">
                {securityStats.securityAlerts}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiAlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Last Security Audit</p>
              <h3 className="text-2xl font-bold mt-1">
                {securityStats.lastAudit}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiShield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Security Policies */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Security Policies</h2>
        <div className="space-y-4">
          {securityPolicies.map((policy) => (
            <div
              key={policy.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{policy.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Last updated: {policy.lastUpdated}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    policy.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {policy.status}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {Object.entries(policy.settings).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>{" "}
                    <span className="text-gray-900">
                      {Array.isArray(value) ? value.join(", ") : value.toString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100">
                  Edit Policy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Recent Security Activities</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.status === "Success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.timestamp}
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

export default SecurityManagement; 
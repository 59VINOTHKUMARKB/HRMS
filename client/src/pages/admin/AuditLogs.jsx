import { useState } from "react";
import {
  FiFileText,
  FiUser,
  FiCalendar,
  FiSearch,
  FiFilter,
  FiDownload,
  FiActivity,
} from "react-icons/fi";

const AuditLogs = () => {
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const auditLogs = [
    {
      id: 1,
      action: "User Login",
      user: "John Doe",
      userRole: "Admin",
      ip: "192.168.1.1",
      timestamp: "2024-03-20 10:30:15",
      details: "Successful login from Chrome browser",
      severity: "info",
      module: "Authentication",
    },
    {
      id: 2,
      action: "Permission Modified",
      user: "Sarah Wilson",
      userRole: "Super Admin",
      ip: "192.168.1.2",
      timestamp: "2024-03-20 09:45:22",
      details: "Modified role permissions for Marketing team",
      severity: "warning",
      module: "User Management",
    },
    {
      id: 3,
      action: "Database Backup",
      user: "System",
      userRole: "System",
      ip: "internal",
      timestamp: "2024-03-20 03:00:00",
      details: "Automated daily backup completed",
      severity: "info",
      module: "Database",
    },
    {
      id: 4,
      action: "Failed Login Attempt",
      user: "Unknown",
      userRole: "N/A",
      ip: "203.45.67.89",
      timestamp: "2024-03-19 23:15:45",
      details: "Multiple failed login attempts detected",
      severity: "critical",
      module: "Security",
    },
  ];

  const modules = [
    "All Modules",
    "Authentication",
    "User Management",
    "Database",
    "Security",
    "Billing",
    "API",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
          <FiDownload className="mr-2" /> Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
          >
            <option value="all">All Severity</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            {modules.map((module) => (
              <option key={module} value={module.toLowerCase()}>
                {module}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {log.action}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <FiUser className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {log.user}
                        </div>
                        <div className="text-sm text-gray-500">
                          {log.userRole}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.module}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        log.severity === "critical"
                          ? "bg-red-100 text-red-800"
                          : log.severity === "warning"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-white px-4 py-3 rounded-lg">
        <div className="flex items-center text-sm text-gray-500">
          Showing 1 to 10 of 50 entries
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-lg bg-indigo-50 text-indigo-600">
            1
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs; 
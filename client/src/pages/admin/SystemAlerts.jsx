import { useState } from "react";
import {
  FiAlertTriangle,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiFilter,
  FiBell,
  FiX,
  FiEye,
} from "react-icons/fi";

const SystemAlerts = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const alerts = [
    {
      id: 1,
      title: "High CPU Usage Detected",
      description:
        "Server CPU utilization exceeded 90% for more than 5 minutes",
      timestamp: "2024-03-20 10:30:15",
      priority: "critical",
      status: "active",
      source: "System Monitor",
      affectedSystem: "Production Server",
      metric: "CPU: 92%",
    },
    {
      id: 2,
      title: "Database Backup Warning",
      description: "Last backup attempt failed due to insufficient storage",
      timestamp: "2024-03-20 09:45:22",
      priority: "high",
      status: "active",
      source: "Backup System",
      affectedSystem: "Database Server",
      metric: "Storage: 95% full",
    },
    {
      id: 3,
      title: "SSL Certificate Expiring",
      description: "SSL certificate will expire in 15 days",
      timestamp: "2024-03-20 08:15:00",
      priority: "medium",
      status: "acknowledged",
      source: "Security Monitor",
      affectedSystem: "Web Server",
      metric: "Expires: 2024-04-05",
    },
    {
      id: 4,
      title: "API Response Time Degradation",
      description: "Average response time increased by 50%",
      timestamp: "2024-03-19 23:30:45",
      priority: "low",
      status: "resolved",
      source: "API Monitor",
      affectedSystem: "API Gateway",
      metric: "Latency: 500ms",
    },
  ];

  const alertStats = {
    total: 12,
    critical: 2,
    high: 3,
    medium: 4,
    low: 3,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Alerts</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
            <FiAlertTriangle className="mr-2" /> Critical Alerts (
            {alertStats.critical})
          </button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Alerts</p>
              <h3 className="text-2xl font-bold mt-1">{alertStats.total}</h3>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <FiBell className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Critical</p>
              <h3 className="text-2xl font-bold mt-1">{alertStats.critical}</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FiAlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">High</p>
              <h3 className="text-2xl font-bold mt-1">{alertStats.high}</h3>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <FiAlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Medium</p>
              <h3 className="text-2xl font-bold mt-1">{alertStats.medium}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiAlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low</p>
              <h3 className="text-2xl font-bold mt-1">{alertStats.low}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiAlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex space-x-4">
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    alert.priority === "critical"
                      ? "bg-red-100"
                      : alert.priority === "high"
                      ? "bg-orange-100"
                      : alert.priority === "medium"
                      ? "bg-yellow-100"
                      : "bg-blue-100"
                  }`}
                >
                  <FiAlertTriangle
                    className={`w-6 h-6 ${
                      alert.priority === "critical"
                        ? "text-red-600"
                        : alert.priority === "high"
                        ? "text-orange-600"
                        : alert.priority === "medium"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{alert.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {alert.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">
                      Source: {alert.source}
                    </span>
                    <span className="text-sm text-gray-500">
                      System: {alert.affectedSystem}
                    </span>
                    <span className="text-sm text-gray-500">
                      {alert.metric}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    alert.status === "active"
                      ? "bg-red-100 text-red-800"
                      : alert.status === "acknowledged"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {alert.status}
                </span>
                <span className="text-xs text-gray-500">{alert.timestamp}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 flex items-center">
                <FiEye className="w-4 h-4 mr-1" /> View Details
              </button>
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 flex items-center">
                <FiClock className="w-4 h-4 mr-1" /> Acknowledge
              </button>
              <button className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-full hover:bg-green-100 flex items-center">
                <FiCheckCircle className="w-4 h-4 mr-1" /> Resolve
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Rules Preview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Active Alert Rules</h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm">
            Manage Rules
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FiAlertTriangle className="text-red-600" />
              <span>CPU Usage {">"} 90% for 5 minutes</span>
            </div>
            <span className="text-sm text-gray-500">Critical</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FiAlertCircle className="text-orange-600" />
              <span>Memory Usage {">"} 85% for 10 minutes</span>
            </div>
            <span className="text-sm text-gray-500">High</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FiAlertCircle className="text-yellow-600" />
              <span>API Response Time {">"} 500ms</span>
            </div>
            <span className="text-sm text-gray-500">Medium</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAlerts;

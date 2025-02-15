import { useState } from "react";
import {
  FiDatabase,
  FiHardDrive,
  FiClock,
  FiRefreshCw,
  FiAlertTriangle,
  FiDownload,
  FiUpload,
  FiServer,
} from "react-icons/fi";

const DatabaseManagement = () => {
  const [selectedInstance, setSelectedInstance] = useState("production");

  const databaseStats = {
    totalSize: "1.2 TB",
    activeConnections: "156",
    avgResponseTime: "45ms",
    lastBackup: "2024-03-20 03:00 AM",
    uptime: "99.99%",
    replicationLag: "1.2s",
  };

  const databaseInstances = [
    {
      id: 1,
      name: "Production DB",
      type: "Primary",
      status: "Healthy",
      version: "PostgreSQL 14.5",
      size: "850 GB",
      connections: 120,
      performance: 95,
    },
    {
      id: 2,
      name: "Replica DB-1",
      type: "Read Replica",
      status: "Healthy",
      version: "PostgreSQL 14.5",
      size: "850 GB",
      connections: 36,
      performance: 92,
    },
    {
      id: 3,
      name: "Analytics DB",
      type: "Warehouse",
      status: "Warning",
      version: "PostgreSQL 14.5",
      size: "1.5 TB",
      connections: 15,
      performance: 78,
    },
  ];

  const recentOperations = [
    {
      id: 1,
      operation: "Automated Backup",
      timestamp: "2024-03-20 03:00 AM",
      status: "Completed",
      duration: "25 mins",
      size: "850 GB",
    },
    {
      id: 2,
      operation: "Index Optimization",
      timestamp: "2024-03-19 11:30 PM",
      status: "Completed",
      duration: "45 mins",
      size: "N/A",
    },
    {
      id: 3,
      operation: "Data Migration",
      timestamp: "2024-03-19 08:15 PM",
      status: "Failed",
      duration: "15 mins",
      size: "25 GB",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Database Management</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
            <FiDownload className="mr-2" /> Backup Now
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center">
            <FiRefreshCw className="mr-2" /> Maintenance Mode
          </button>
        </div>
      </div>

      {/* Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Size</p>
              <h3 className="text-2xl font-bold mt-1">{databaseStats.totalSize}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiHardDrive className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Connections</p>
              <h3 className="text-2xl font-bold mt-1">
                {databaseStats.activeConnections}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiServer className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Response Time</p>
              <h3 className="text-2xl font-bold mt-1">
                {databaseStats.avgResponseTime}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiClock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Last Backup</p>
              <h3 className="text-lg font-bold mt-1">{databaseStats.lastBackup}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FiDatabase className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Uptime</p>
              <h3 className="text-2xl font-bold mt-1">{databaseStats.uptime}</h3>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <FiRefreshCw className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Replication Lag</p>
              <h3 className="text-2xl font-bold mt-1">
                {databaseStats.replicationLag}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <FiClock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Database Instances */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Database Instances</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {databaseInstances.map((instance) => (
            <div
              key={instance.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{instance.name}</h3>
                  <p className="text-sm text-gray-500">{instance.type}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    instance.status === "Healthy"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {instance.status}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Version:</span>
                  <span>{instance.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Size:</span>
                  <span>{instance.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Connections:</span>
                  <span>{instance.connections}</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Performance</span>
                    <span>{instance.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`rounded-full h-2 ${
                        instance.performance >= 90
                          ? "bg-green-600"
                          : instance.performance >= 80
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                      style={{ width: `${instance.performance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Operations */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Recent Operations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOperations.map((operation) => (
                <tr key={operation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {operation.operation}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {operation.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        operation.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {operation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {operation.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {operation.size}
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

export default DatabaseManagement; 
import { useState, useEffect } from "react";
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
import axios from "axios";
import { notification, Spin } from "antd";

const DatabaseManagement = () => {
  const [loading, setLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [stats, setStats] = useState(null);
  const [operations, setOperations] = useState([]);

  const fetchDatabaseStats = async () => {
    try {
      const [statsResponse, operationsResponse] = await Promise.all([
        axios.get("/api/db/stats"),
        axios.get("/api/db/operations"),
      ]);

      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }

      if (operationsResponse.data.success) {
        setOperations(operationsResponse.data.data);
      }
    } catch (error) {
      notification.error({
        message: "Error Fetching Database Stats",
        description:
          error.response?.data?.message ||
          "Could not fetch database statistics",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchDatabaseStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleBackup = async () => {
    try {
      setLoading(true);

      // Request backup with download parameter
      const response = await axios.post(
        "/api/db/backup?download=true",
        {},
        {
          responseType: "blob", // Important for handling the file download
        }
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const filename = `backup-${new Date().toISOString()}.json`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      notification.success({
        message: "Backup Successful",
        description: "Database backup has been downloaded successfully",
        placement: "bottomRight",
      });
    } catch (error) {
      notification.error({
        message: "Backup Failed",
        description:
          error.response?.data?.message || "Could not perform backup",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMaintenance = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/db/maintenance", {
        enable: !maintenanceMode,
      });

      if (response.data.success) {
        setMaintenanceMode(response.data.data.maintenance);
        notification.success({
          message: "Maintenance Mode Updated",
          description: response.data.message,
          placement: "bottomRight",
        });
      }
    } catch (error) {
      notification.error({
        message: "Operation Failed",
        description:
          error.response?.data?.message || "Could not toggle maintenance mode",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Database Management</h1>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
            onClick={handleBackup}
          >
            <FiDownload className="mr-2" /> Backup Now
          </button>
          <button
            className={`px-4 py-2 ${
              maintenanceMode ? "bg-red-600" : "bg-gray-600"
            } text-white rounded-lg hover:bg-gray-700 flex items-center`}
            onClick={toggleMaintenance}
          >
            <FiRefreshCw className="mr-2" />
            {maintenanceMode ? "Disable" : "Enable"} Maintenance Mode
          </button>
        </div>
      </div>

      {/* Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Size</p>
              <h3 className="text-2xl font-bold mt-1">{stats.totalSize}</h3>
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
                {stats.activeConnections}
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
                {stats.avgResponseTime}
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
              <p className="text-sm text-gray-500">Uptime</p>
              <h3 className="text-2xl font-bold mt-1">{stats.uptime}</h3>
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
                {stats.replicationLag}
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
          {stats.instances.map((instance, index) => (
            <div
              key={index}
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
                  Namespace
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {operations.map((operation) => (
                <tr key={operation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {operation.operation}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {operation.namespace}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        operation.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {operation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {operation.duration}
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

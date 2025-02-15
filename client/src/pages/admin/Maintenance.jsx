import { useState } from "react";
import {
  FiTool,
  FiServer,
  FiHardDrive,
  FiCpu,
  FiDatabase,
  FiRefreshCw,
  FiCalendar,
  FiClock,
  FiAlertTriangle,
  FiCheckCircle,
  FiPlay,
  FiPause,
} from "react-icons/fi";

const Maintenance = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const systemHealth = {
    cpu: {
      usage: "45%",
      temperature: "65°C",
      status: "healthy",
    },
    memory: {
      used: "8.5 GB",
      total: "16 GB",
      status: "healthy",
    },
    storage: {
      used: "256 GB",
      total: "512 GB",
      status: "warning",
    },
    database: {
      connections: "24",
      responseTime: "45ms",
      status: "healthy",
    },
  };

  const maintenanceTasks = [
    {
      id: 1,
      name: "Database Optimization",
      description: "Optimize database indexes and cleanup unused data",
      status: "scheduled",
      lastRun: "2024-03-15",
      nextRun: "2024-03-22",
      duration: "2 hours",
      impact: "medium",
    },
    {
      id: 2,
      name: "Cache Clear",
      description: "Clear system cache and temporary files",
      status: "running",
      lastRun: "2024-03-20",
      nextRun: "2024-03-21",
      duration: "30 minutes",
      impact: "low",
    },
    {
      id: 3,
      name: "System Backup",
      description: "Full system backup including database and files",
      status: "completed",
      lastRun: "2024-03-19",
      nextRun: "2024-03-21",
      duration: "4 hours",
      impact: "high",
    },
  ];

  const handleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
    // TODO: Implement maintenance mode toggle functionality
  };

  const handleTaskAction = (taskId) => {
    // TODO: Implement task action functionality
    console.log("Task action:", taskId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Maintenance</h1>
        <button
          onClick={handleMaintenanceMode}
          className={`px-4 py-2 rounded-lg flex items-center ${
            maintenanceMode
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {maintenanceMode ? (
            <>
              <FiPause className="mr-2" /> Disable Maintenance Mode
            </>
          ) : (
            <>
              <FiPlay className="mr-2" /> Enable Maintenance Mode
            </>
          )}
        </button>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">CPU Usage</p>
              <h3 className="text-2xl font-bold mt-1">
                {systemHealth.cpu.usage}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Temp: {systemHealth.cpu.temperature}
              </p>
            </div>
            <div
              className={`p-3 rounded-full ${
                systemHealth.cpu.status === "healthy"
                  ? "bg-green-100"
                  : "bg-yellow-100"
              }`}
            >
              <FiCpu
                className={`w-6 h-6 ${
                  systemHealth.cpu.status === "healthy"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Memory</p>
              <h3 className="text-2xl font-bold mt-1">
                {systemHealth.memory.used}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                of {systemHealth.memory.total}
              </p>
            </div>
            <div
              className={`p-3 rounded-full ${
                systemHealth.memory.status === "healthy"
                  ? "bg-green-100"
                  : "bg-yellow-100"
              }`}
            >
              <FiServer
                className={`w-6 h-6 ${
                  systemHealth.memory.status === "healthy"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Storage</p>
              <h3 className="text-2xl font-bold mt-1">
                {systemHealth.storage.used}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                of {systemHealth.storage.total}
              </p>
            </div>
            <div
              className={`p-3 rounded-full ${
                systemHealth.storage.status === "healthy"
                  ? "bg-green-100"
                  : "bg-yellow-100"
              }`}
            >
              <FiHardDrive
                className={`w-6 h-6 ${
                  systemHealth.storage.status === "healthy"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Database</p>
              <h3 className="text-2xl font-bold mt-1">
                {systemHealth.database.connections}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Response: {systemHealth.database.responseTime}
              </p>
            </div>
            <div
              className={`p-3 rounded-full ${
                systemHealth.database.status === "healthy"
                  ? "bg-green-100"
                  : "bg-yellow-100"
              }`}
            >
              <FiDatabase
                className={`w-6 h-6 ${
                  systemHealth.database.status === "healthy"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Tasks */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FiTool className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium">Maintenance Tasks</h2>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
            <FiCalendar className="mr-2" /> Schedule Task
          </button>
        </div>

        <div className="space-y-4">
          {maintenanceTasks.map((task) => (
            <div
              key={task.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{task.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {task.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">
                      Last Run: {task.lastRun}
                    </span>
                    <span className="text-sm text-gray-500">
                      Next Run: {task.nextRun}
                    </span>
                    <span className="text-sm text-gray-500">
                      Duration: {task.duration}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "running"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.status}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      task.impact === "high"
                        ? "bg-red-100 text-red-800"
                        : task.impact === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {task.impact} impact
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleTaskAction(task.id)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 flex items-center"
                >
                  <FiRefreshCw className="w-4 h-4 mr-1" /> Run Now
                </button>
                <button className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 flex items-center">
                  <FiClock className="w-4 h-4 mr-1" /> Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <FiClock className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Maintenance History</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FiCheckCircle className="text-green-600" />
              <div>
                <p className="font-medium">System Backup</p>
                <p className="text-sm text-gray-500">Completed successfully</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2024-03-19 02:30 AM</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FiAlertTriangle className="text-yellow-600" />
              <div>
                <p className="font-medium">Database Optimization</p>
                <p className="text-sm text-gray-500">Completed with warnings</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2024-03-18 01:15 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;

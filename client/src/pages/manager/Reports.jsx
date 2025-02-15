import { useState } from "react";
import {
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiCalendar,
  FiClock,
  FiDownload,
} from "react-icons/fi";

const ManagerReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("performance");

  const performanceMetrics = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    productivity: [85, 88, 92, 89],
    attendance: [95, 92, 94, 96],
    taskCompletion: [78, 82, 88, 85],
  };

  const teamStats = {
    performance: {
      avgProductivity: "88%",
      avgAttendance: "94%",
      taskCompletionRate: "83%",
      onTimeDelivery: "87%",
    },
    attendance: {
      presentDays: "95%",
      avgWorkHours: "8.5",
      onTimeArrival: "92%",
      leaveUtilization: "12%",
    },
    workload: {
      activeProjects: "5",
      tasksInProgress: "24",
      upcomingDeadlines: "8",
      resourceUtilization: "78%",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Reports</h1>
        <div className="flex space-x-4">
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiDownload className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedReport === "performance"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedReport("performance")}
          >
            Performance Metrics
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedReport === "attendance"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedReport("attendance")}
          >
            Attendance Analysis
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedReport === "workload"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedReport("workload")}
          >
            Workload Distribution
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(teamStats[selectedReport]).map(([key, value]) => (
          <div key={key} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FiBarChart2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Trend Analysis</h2>
        <div className="h-64">
          {/* Chart visualization would go here */}
          <div className="grid grid-cols-4 gap-4 h-full">
            {performanceMetrics.labels.map((label, index) => (
              <div key={label} className="flex flex-col justify-end space-y-2">
                <div className="space-y-2">
                  <div
                    className="bg-blue-600 rounded-t"
                    style={{
                      height: `${performanceMetrics.productivity[index]}%`,
                    }}
                  ></div>
                  <div
                    className="bg-green-500 rounded-t"
                    style={{
                      height: `${performanceMetrics.attendance[index]}%`,
                    }}
                  ></div>
                  <div
                    className="bg-yellow-500 rounded-t"
                    style={{
                      height: `${performanceMetrics.taskCompletion[index]}%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Productivity</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Attendance</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Task Completion</span>
          </div>
        </div>
      </div>

      {/* Team Members Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Individual Performance</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-sm font-medium text-gray-500">
                Employee
              </th>
              <th className="text-left text-sm font-medium text-gray-500">
                Tasks Completed
              </th>
              <th className="text-left text-sm font-medium text-gray-500">
                Attendance
              </th>
              <th className="text-left text-sm font-medium text-gray-500">
                Productivity
              </th>
              <th className="text-left text-sm font-medium text-gray-500">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Sample data rows */}
            <tr>
              <td className="py-4">John Doe</td>
              <td className="py-4">45/50</td>
              <td className="py-4">96%</td>
              <td className="py-4">92%</td>
              <td className="py-4">4.5/5</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerReports; 
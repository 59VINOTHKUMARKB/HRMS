import { useState } from "react";
import {
  FiTrendingUp,
  FiUsers,
  FiActivity,
  FiClock,
  FiGlobe,
  FiDownload,
  FiBarChart2,
  FiPieChart,
} from "react-icons/fi";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("users");

  const analyticsData = {
    summary: {
      totalUsers: "12,458",
      activeOrgs: "245",
      avgDailyActive: "8,234",
      retentionRate: "92%",
    },
    usage: {
      apiCalls: "1.2M",
      storageUsed: "8.5 TB",
      computeHours: "4,562",
      dataProcessed: "15.8 TB",
    },
    trends: [
      { date: "Mar 1", users: 7800, orgs: 230, usage: 85 },
      { date: "Mar 7", users: 8200, orgs: 235, usage: 87 },
      { date: "Mar 14", users: 8900, orgs: 240, usage: 90 },
      { date: "Mar 21", users: 9500, orgs: 245, usage: 92 },
    ],
  };

  const topPerformers = [
    {
      id: 1,
      name: "Tech Solutions Inc",
      users: 450,
      activity: "92%",
      modules: 8,
      growth: "+15%",
    },
    {
      id: 2,
      name: "Global Marketing Group",
      users: 380,
      activity: "88%",
      modules: 6,
      growth: "+12%",
    },
    {
      id: 3,
      name: "Innovate Design Co",
      users: 290,
      activity: "85%",
      modules: 5,
      growth: "+8%",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex space-x-4">
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
            <FiDownload className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold mt-1">
                {analyticsData.summary.totalUsers}
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
              <p className="text-sm text-gray-500">Active Organizations</p>
              <h3 className="text-2xl font-bold mt-1">
                {analyticsData.summary.activeOrgs}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiGlobe className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Daily Active Users</p>
              <h3 className="text-2xl font-bold mt-1">
                {analyticsData.summary.avgDailyActive}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FiActivity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Retention Rate</p>
              <h3 className="text-2xl font-bold mt-1">
                {analyticsData.summary.retentionRate}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiPieChart className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">System Usage</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">API Calls</p>
            <p className="text-2xl font-bold">{analyticsData.usage.apiCalls}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Storage Used</p>
            <p className="text-2xl font-bold">{analyticsData.usage.storageUsed}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 rounded-full h-2"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Compute Hours</p>
            <p className="text-2xl font-bold">
              {analyticsData.usage.computeHours}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 rounded-full h-2"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Data Processed</p>
            <p className="text-2xl font-bold">
              {analyticsData.usage.dataProcessed}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-600 rounded-full h-2"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Trends */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Growth Trends</h2>
        <div className="h-64">
          {/* Chart would go here - using placeholder for now */}
          <div className="grid grid-cols-4 gap-4 h-full">
            {analyticsData.trends.map((point) => (
              <div key={point.date} className="flex flex-col justify-end space-y-2">
                <div className="space-y-2">
                  <div
                    className="bg-blue-600 rounded-t"
                    style={{ height: `${point.usage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 text-center">
                  {point.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Organizations */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Top Performing Organizations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modules Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformers.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {org.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {org.users}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {org.activity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {org.modules}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-green-600 text-sm">{org.growth}</span>
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

export default Analytics; 
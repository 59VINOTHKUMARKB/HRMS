import { useState } from "react";
import {
  FiShield,
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiDownload,
  FiFile,
  FiClock,
  FiBell,
  FiEdit2,
  FiTrash2,
  FiEye,
} from "react-icons/fi";

const ComplianceManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const complianceItems = [
    {
      id: 1,
      title: "Annual Labor Law Compliance",
      category: "Labor Laws",
      dueDate: "2024-06-30",
      status: "In Progress",
      priority: "High",
      assignedTo: "HR Legal Team",
      progress: 65,
    },
    {
      id: 2,
      title: "Data Protection Audit",
      category: "Data Privacy",
      dueDate: "2024-04-15",
      status: "Pending Review",
      priority: "Medium",
      assignedTo: "Compliance Officer",
      progress: 80,
    },
    {
      id: 3,
      title: "Workplace Safety Assessment",
      category: "Safety",
      dueDate: "2024-05-01",
      status: "Completed",
      priority: "High",
      assignedTo: "Safety Committee",
      progress: 100,
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Tax Compliance Report",
      dueDate: "2024-03-31",
      daysLeft: 5,
    },
    {
      id: 2,
      title: "Employee Benefits Review",
      dueDate: "2024-04-15",
      daysLeft: 20,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Compliance Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiFile className="mr-2" /> New Compliance Task
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <FiDownload className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Tasks", value: "24", icon: FiShield, color: "blue" },
          {
            label: "Pending Review",
            value: "8",
            icon: FiClock,
            color: "yellow",
          },
          {
            label: "Completed",
            value: "12",
            icon: FiCheckCircle,
            color: "green",
          },
          {
            label: "Upcoming Deadlines",
            value: "4",
            icon: FiBell,
            color: "red",
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex">
            {["overview", "tasks", "documents", "audit"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Compliance Tasks */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-lg font-medium">Active Compliance Tasks</h2>
                {complianceItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.category} • Assigned to {item.assignedTo}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : item.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 rounded-full h-2"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <FiCalendar className="inline mr-1" />
                        Due: {item.dueDate}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-900">
                          <FiEye className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-blue-600 hover:text-blue-900">
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upcoming Deadlines */}
              <div>
                <h2 className="text-lg font-medium mb-4">Upcoming Deadlines</h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div
                      key={deadline.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {deadline.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Due: {deadline.dueDate}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          deadline.daysLeft <= 7
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {deadline.daysLeft} days left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {complianceItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.assignedTo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : item.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiEye className="w-5 h-5" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Other tabs placeholders */}
          {activeTab === "documents" && (
            <div className="text-center py-8 text-gray-500">
              Compliance documents management to be implemented
            </div>
          )}
          {activeTab === "audit" && (
            <div className="text-center py-8 text-gray-500">
              Audit logs and reports to be implemented
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceManagement;

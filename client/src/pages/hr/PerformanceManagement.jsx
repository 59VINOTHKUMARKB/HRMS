import { useState } from "react";
import {
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiCheckCircle,
  FiEdit2,
  FiTrash2,
  FiPlusCircle,
  FiBarChart2,
  FiAward,
  FiThumbsUp,
} from "react-icons/fi";

const PerformanceManagement = () => {
  const [activeTab, setActiveTab] = useState("goals");
  const [selectedPeriod, setSelectedPeriod] = useState("2024-Q1");

  const employeeGoals = [
    {
      id: 1,
      employee: "John Doe",
      title: "Improve Code Quality",
      description: "Reduce bug rate by 30% through better testing",
      category: "Technical",
      progress: 75,
      status: "In Progress",
      dueDate: "2024-03-31",
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      title: "Client Satisfaction",
      description: "Achieve 95% client satisfaction rate",
      category: "Customer Success",
      progress: 85,
      status: "In Progress",
      dueDate: "2024-03-31",
    },
  ];

  const reviews = [
    {
      id: 1,
      employee: "John Doe",
      reviewer: "Mike Johnson",
      type: "360 Feedback",
      status: "Completed",
      submissionDate: "2024-03-15",
      rating: 4.5,
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      reviewer: "Emily Brown",
      type: "Quarterly Review",
      status: "Pending",
      dueDate: "2024-03-25",
      rating: null,
    },
  ];

  const kpis = [
    {
      id: 1,
      name: "Project Delivery",
      target: "90%",
      current: "85%",
      trend: "up",
      category: "Efficiency",
    },
    {
      id: 2,
      name: "Customer Satisfaction",
      target: "95%",
      current: "92%",
      trend: "up",
      category: "Quality",
    },
    {
      id: 3,
      name: "Code Quality",
      target: "95%",
      current: "88%",
      trend: "stable",
      category: "Technical",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Performance Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiPlusCircle className="mr-2" /> Set New Goal
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Average Performance",
            value: "87%",
            icon: FiBarChart2,
            color: "blue",
          },
          {
            label: "Completed Reviews",
            value: "45",
            icon: FiCheckCircle,
            color: "green",
          },
          {
            label: "Pending Reviews",
            value: "12",
            icon: FiStar,
            color: "yellow",
          },
          {
            label: "Top Performers",
            value: "15",
            icon: FiAward,
            color: "purple",
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
            {["goals", "reviews", "kpis"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Goals Tab */}
          {activeTab === "goals" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <select
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="2024-Q1">Q1 2024</option>
                  <option value="2024-Q2">Q2 2024</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {employeeGoals.map((goal) => (
                  <div key={goal.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {goal.employee} • {goal.category}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-4">{goal.description}</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 rounded-full h-2"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center text-sm">
                      <span className="text-gray-500">Due: {goal.dueDate}</span>
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {goal.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Review Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviewer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {review.employee}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {review.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {review.reviewer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            review.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {review.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {review.rating ? (
                          <div className="flex items-center">
                            <FiStar className="w-5 h-5 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-900">
                              {review.rating}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* KPIs Tab */}
          {activeTab === "kpis" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {kpi.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {kpi.category}
                      </p>
                    </div>
                    <div
                      className={`p-2 rounded-full ${
                        kpi.trend === "up" ? "bg-green-100" : "bg-yellow-100"
                      }`}
                    >
                      <FiTrendingUp
                        className={`w-5 h-5 ${
                          kpi.trend === "up"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Target</span>
                      <span className="font-medium">{kpi.target}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Current</span>
                      <span className="font-medium">{kpi.current}</span>
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2"
                        style={{ width: kpi.current }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceManagement;

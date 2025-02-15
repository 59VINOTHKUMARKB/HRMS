import { useState } from "react";
import {
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiBarChart2,
} from "react-icons/fi";

const ManagerPerformance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("q1-2024");

  const teamPerformance = [
    {
      id: 1,
      employee: "John Doe",
      position: "Senior Developer",
      goals: 12,
      completed: 10,
      rating: 4.5,
      status: "On Track",
      keyMetrics: {
        productivity: 92,
        quality: 95,
        teamwork: 88,
        innovation: 85,
      },
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      position: "UI/UX Designer",
      goals: 10,
      completed: 7,
      rating: 4.2,
      status: "Needs Attention",
      keyMetrics: {
        productivity: 85,
        quality: 90,
        teamwork: 92,
        innovation: 88,
      },
    },
  ];

  const stats = [
    { label: "Team Members", value: "12", icon: FiUsers },
    { label: "Avg Performance", value: "87%", icon: FiBarChart2 },
    { label: "Goals Completed", value: "85%", icon: FiTarget },
    { label: "Avg Rating", value: "4.3", icon: FiStar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Performance Reviews</h1>
        <div className="flex space-x-4">
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="q1-2024">Q1 2024</option>
            <option value="q4-2023">Q4 2023</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Start Review
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamPerformance.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{member.employee}</h3>
                <p className="text-sm text-gray-500">{member.position}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  member.status === "On Track"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {member.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Goals Progress</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">
                    {member.completed}/{member.goals}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{
                      width: `${(member.completed / member.goals) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Performance Rating</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">{member.rating}</span>
                  <FiStar className="w-5 h-5 text-yellow-400 ml-1" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">
                Key Metrics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(member.keyMetrics).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{key}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
                View Details
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700">
                Start Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerPerformance; 
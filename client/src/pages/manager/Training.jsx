import { useState } from "react";
import {
  FiBook,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiPlus,
} from "react-icons/fi";

const ManagerTraining = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  const trainings = [
    {
      id: 1,
      title: "React Advanced Concepts",
      instructor: "John Smith",
      type: "Technical",
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      enrolled: 5,
      totalSeats: 8,
      status: "In Progress",
      progress: 60,
      participants: [
        { name: "John Doe", progress: 75 },
        { name: "Sarah Wilson", progress: 60 },
        { name: "Mike Johnson", progress: 45 },
      ],
    },
    {
      id: 2,
      title: "Leadership Skills Workshop",
      instructor: "Emily Brown",
      type: "Soft Skills",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      enrolled: 4,
      totalSeats: 10,
      status: "Upcoming",
      progress: 0,
      participants: [
        { name: "Alice Smith", progress: 0 },
        { name: "Bob Wilson", progress: 0 },
      ],
    },
  ];

  const stats = [
    { label: "Active Trainings", value: "4", icon: FiBook },
    { label: "Total Participants", value: "15", icon: FiUsers },
    { label: "Completed", value: "8", icon: FiCheckCircle },
    { label: "Upcoming", value: "3", icon: FiCalendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Training Management</h1>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "ongoing"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "upcoming"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiPlus className="mr-2" /> New Training
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

      {/* Training Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainings.map((training) => (
          <div key={training.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{training.title}</h3>
                <p className="text-sm text-gray-500">{training.type}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  training.status === "In Progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {training.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <FiCalendar className="w-4 h-4 mr-2" />
                {training.startDate}
              </div>
              <div className="flex items-center">
                <FiUsers className="w-4 h-4 mr-2" />
                {training.enrolled}/{training.totalSeats} Enrolled
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">
                Participant Progress
              </h4>
              <div className="space-y-3">
                {training.participants.map((participant, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{participant.name}</span>
                      <span>{participant.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2"
                        style={{ width: `${participant.progress}%` }}
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
                Manage Participants
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerTraining; 
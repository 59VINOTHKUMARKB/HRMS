import { useState } from "react";
import {
  FiBook,
  FiPlay,
  FiCheckCircle,
  FiClock,
  FiAward,
  FiCalendar,
} from "react-icons/fi";

const EmployeeTraining = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  const trainings = [
    {
      id: 1,
      title: "React Advanced Concepts",
      type: "Technical",
      instructor: "John Smith",
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      progress: 60,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Leadership Skills Workshop",
      type: "Soft Skills",
      instructor: "Sarah Johnson",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      progress: 0,
      status: "Upcoming",
    },
  ];

  const completedTrainings = [
    {
      id: 3,
      title: "JavaScript Fundamentals",
      type: "Technical",
      completedDate: "2024-02-28",
      score: "95%",
      certificate: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Training</h1>
        <div className="flex space-x-2">
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
              activeTab === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {activeTab === "ongoing" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainings.map((training) => (
            <div key={training.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{training.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{training.type}</p>
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
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Instructor: {training.instructor}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Duration: {training.startDate} to {training.endDate}
                </p>
              </div>
              {training.status === "In Progress" && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{training.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${training.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
                <FiPlay className="mr-2" /> Continue Training
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedTrainings.map((training) => (
            <div key={training.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{training.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{training.type}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <FiCheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Completed: {training.completedDate}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Score: {training.score}
                </p>
              </div>
              {training.certificate && (
                <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
                  <FiAward className="mr-2" /> View Certificate
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeTraining; 
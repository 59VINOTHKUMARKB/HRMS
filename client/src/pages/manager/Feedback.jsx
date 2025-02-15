import { useState } from "react";
import {
  FiMessageSquare,
  FiStar,
  FiCalendar,
  FiUser,
  FiPlus,
} from "react-icons/fi";

const ManagerFeedback = () => {
  const [activeTab, setActiveTab] = useState("given");

  const feedbackData = [
    {
      id: 1,
      employee: "John Doe",
      position: "Senior Developer",
      type: "Performance Review",
      date: "2024-03-15",
      rating: 4.5,
      feedback:
        "Excellent work on the recent project. Shows great leadership and technical skills. Areas for improvement include documentation and knowledge sharing.",
      status: "Acknowledged",
      goals: [
        "Improve documentation practices",
        "Mentor junior team members",
        "Lead technical discussions",
      ],
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      position: "UI/UX Designer",
      type: "Monthly Review",
      date: "2024-03-10",
      rating: 4.0,
      feedback:
        "Demonstrates strong design skills and creativity. Need to focus more on meeting project deadlines and team communication.",
      status: "Pending",
      goals: [
        "Enhance time management",
        "Participate more in team discussions",
        "Document design decisions",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Feedback</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlus className="mr-2" /> New Feedback
        </button>
      </div>

      {/* Feedback Navigation */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "given"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("given")}
          >
            Given Feedback
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "draft"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("draft")}
          >
            Draft Feedback
          </button>
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-6">
        {feedbackData.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium">{feedback.employee}</h3>
                  <span className="text-sm text-gray-500">
                    ({feedback.position})
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="w-4 h-4 mr-1" />
                    {feedback.date}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <FiMessageSquare className="w-4 h-4 mr-1" />
                    {feedback.type}
                  </span>
                  <span className="flex items-center text-sm text-yellow-500">
                    <FiStar className="w-4 h-4 mr-1" />
                    {feedback.rating}/5
                  </span>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  feedback.status === "Acknowledged"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {feedback.status}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">{feedback.feedback}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Development Goals
              </h4>
              <ul className="space-y-2">
                {feedback.goals.map((goal, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700">
                Follow Up
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerFeedback; 
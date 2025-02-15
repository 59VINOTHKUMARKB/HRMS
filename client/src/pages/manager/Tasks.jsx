import { useState } from "react";
import {
  FiClipboard,
  FiCalendar,
  FiClock,
  FiUser,
  FiPlus,
  FiFlag,
} from "react-icons/fi";

const ManagerTasks = () => {
  const [activeTab, setActiveTab] = useState("active");

  const tasks = [
    {
      id: 1,
      title: "Complete Project Documentation",
      assignee: "John Doe",
      dueDate: "2024-03-25",
      priority: "High",
      status: "In Progress",
      progress: 60,
      description:
        "Prepare comprehensive documentation for the new feature implementation",
      subtasks: [
        { text: "System Architecture", completed: true },
        { text: "API Documentation", completed: true },
        { text: "User Guide", completed: false },
      ],
    },
    {
      id: 2,
      title: "Design Review Meeting",
      assignee: "Sarah Wilson",
      dueDate: "2024-03-22",
      priority: "Medium",
      status: "Pending",
      progress: 0,
      description: "Review and finalize the new UI design components",
      subtasks: [
        { text: "Prepare Mockups", completed: false },
        { text: "Gather Feedback", completed: false },
        { text: "Update Design System", completed: false },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlus className="mr-2" /> New Task
        </button>
      </div>

      {/* Task Navigation */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "active"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active Tasks
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

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{task.title}</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="flex items-center text-sm text-gray-500">
                    <FiUser className="w-4 h-4 mr-1" />
                    {task.assignee}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="w-4 h-4 mr-1" />
                    Due: {task.dueDate}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.priority}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    task.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </div>

            <p className="mt-4 text-gray-600">{task.description}</p>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium">{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Subtasks
              </h4>
              <div className="space-y-2">
                {task.subtasks.map((subtask, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      className="mr-2"
                      readOnly
                    />
                    <span
                      className={subtask.completed ? "line-through" : ""}
                    >
                      {subtask.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700">
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerTasks; 
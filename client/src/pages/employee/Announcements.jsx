import { useState } from "react";
import {
  FiBell,
  FiCalendar,
  FiMessageCircle,
  FiStar,
  FiEye,
} from "react-icons/fi";

const EmployeeAnnouncements = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const announcements = [
    {
      id: 1,
      title: "Company Town Hall Meeting",
      category: "Events",
      date: "2024-03-25",
      content:
        "Join us for our quarterly town hall meeting to discuss company updates and future plans.",
      priority: "High",
      isRead: false,
    },
    {
      id: 2,
      title: "New Health Insurance Policy",
      category: "Policy",
      date: "2024-03-20",
      content:
        "Important updates to our health insurance coverage. Please review the changes.",
      priority: "High",
      isRead: true,
    },
    {
      id: 3,
      title: "Office Maintenance Schedule",
      category: "General",
      date: "2024-03-18",
      content:
        "Scheduled maintenance work in the office premises this weekend.",
      priority: "Low",
      isRead: true,
    },
  ];

  const categories = [
    { label: "All", value: "all" },
    { label: "Events", value: "Events" },
    { label: "Policy", value: "Policy" },
    { label: "General", value: "General" },
  ];

  const filteredAnnouncements = activeCategory === "all"
    ? announcements
    : announcements.filter(a => a.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              onClick={() => setActiveCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className={`bg-white rounded-lg shadow-sm p-6 ${
              !announcement.isRead ? "border-l-4 border-blue-600" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{announcement.title}</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="w-4 h-4 mr-1" />
                    {announcement.date}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <FiMessageCircle className="w-4 h-4 mr-1" />
                    {announcement.category}
                  </span>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  announcement.priority === "High"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {announcement.priority}
              </span>
            </div>
            <p className="mt-4 text-gray-600">{announcement.content}</p>
            <div className="mt-4 flex justify-end">
              <button className="text-blue-600 hover:text-blue-800 flex items-center">
                <FiEye className="w-4 h-4 mr-1" /> View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeAnnouncements; 
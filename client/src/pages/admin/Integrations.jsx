import { useState } from "react";
import {
  FiGlobe,
  FiGrid,
  FiToggleLeft,
  FiPlus,
  FiSettings,
  FiRefreshCw,
  FiCheck,
  FiX,
} from "react-icons/fi";

const Integrations = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const integrations = [
    {
      id: 1,
      name: "Slack",
      category: "Communication",
      status: "Active",
      lastSync: "2024-03-20 10:30 AM",
      connectedUsers: 156,
      description: "Team messaging and notifications integration",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/slack.svg",
      features: [
        "Real-time notifications",
        "Channel integration",
        "Command support",
      ],
    },
    {
      id: 2,
      name: "Google Workspace",
      category: "Productivity",
      status: "Active",
      lastSync: "2024-03-20 09:45 AM",
      connectedUsers: 245,
      description: "Calendar, email, and document integration",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/google.svg",
      features: [
        "Calendar sync",
        "Email integration",
        "Document sharing",
      ],
    },
    {
      id: 3,
      name: "Salesforce",
      category: "CRM",
      status: "Configuration Required",
      lastSync: "2024-03-19 03:15 PM",
      connectedUsers: 45,
      description: "Customer relationship management integration",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/salesforce.svg",
      features: [
        "Contact sync",
        "Lead management",
        "Opportunity tracking",
      ],
    },
  ];

  const categories = [
    { id: "all", label: "All Integrations" },
    { id: "communication", label: "Communication" },
    { id: "productivity", label: "Productivity" },
    { id: "crm", label: "CRM" },
    { id: "security", label: "Security" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
          <FiPlus className="mr-2" /> Add Integration
        </button>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg p-2">
                  <img
                    src={integration.icon}
                    alt={integration.name}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{integration.name}</h3>
                  <p className="text-sm text-gray-500">{integration.category}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  integration.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {integration.status}
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              {integration.description}
            </p>

            <div className="mt-4 space-y-2">
              {integration.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <FiCheck className="w-4 h-4 text-green-500 mr-2" />
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Connected Users: {integration.connectedUsers}</span>
                <span>Last Sync: {integration.lastSync}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
                <FiSettings className="w-4 h-4" />
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
                <FiRefreshCw className="w-4 h-4" />
              </button>
              <button className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100">
                Configure
              </button>
            </div>
          </div>
        ))}

        {/* Add New Integration Card */}
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors flex flex-col items-center justify-center text-center cursor-pointer">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <FiPlus className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-medium text-gray-900">Add New Integration</h3>
          <p className="mt-1 text-sm text-gray-500">
            Connect with your favorite tools and services
          </p>
        </div>
      </div>

      {/* Integration Logs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Recent Integration Activities</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <FiCheck className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Slack Integration Synced</p>
                <p className="text-xs text-gray-500">2024-03-20 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-yellow-100 rounded-full">
                <FiRefreshCw className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Google Workspace Token Refreshed</p>
                <p className="text-xs text-gray-500">2024-03-20 09:45 AM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-100 rounded-full">
                <FiX className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Salesforce Sync Failed</p>
                <p className="text-xs text-gray-500">2024-03-19 03:15 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations; 
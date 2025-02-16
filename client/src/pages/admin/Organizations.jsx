import { useState } from "react";
import {
  FiUsers,
  FiLayers,
  FiGitBranch,
  FiUserPlus,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiDownload,
  FiChevronRight,
  FiMapPin,
} from "react-icons/fi";
import { useUser } from "../../components/layout/SuperAdminLayout";

const OrganizationManagement = () => {
  const [activeTab, setActiveTab] = useState("structure");
  const { user } = useUser();
  const departments = [
    {
      id: 1,
      name: "Engineering",
      head: "Michael Chen",
      employees: 45,
      teams: [
        { name: "Frontend", lead: "Sarah Wilson", members: 12 },
        { name: "Backend", lead: "John Doe", members: 15 },
        { name: "DevOps", lead: "David Kim", members: 8 },
      ],
    },
    {
      id: 2,
      name: "Marketing",
      head: "Emily Brown",
      employees: 28,
      teams: [
        { name: "Digital Marketing", lead: "Lisa Park", members: 8 },
        { name: "Content", lead: "Mark Johnson", members: 6 },
        { name: "Brand", lead: "Anna Lee", members: 4 },
      ],
    },
  ];

  const locations = [
    {
      id: 1,
      name: "Headquarters",
      city: "New York",
      employees: 120,
      departments: 8,
    },
    {
      id: 2,
      name: "West Coast Office",
      city: "San Francisco",
      employees: 85,
      departments: 5,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organization Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiPlus className="mr-2" /> Add Department
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <FiDownload className="mr-2" /> Export Structure
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Employees",
            value: "248",
            icon: FiUsers,
            color: "blue",
          },
          { label: "Departments", value: "12", icon: FiLayers, color: "green" },
          { label: "Teams", value: "35", icon: FiGitBranch, color: "purple" },
          { label: "Locations", value: "4", icon: FiMapPin, color: "orange" },
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
            {["structure", "locations", "policies"].map((tab) => (
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
          {/* Structure Tab */}
          {activeTab === "structure" && (
            <div className="space-y-6">
              {departments.map((dept) => (
                <div key={dept.id} className="border rounded-lg">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Head: {dept.head} • {dept.employees} Employees
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:text-blue-900">
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-900">
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="border-t bg-gray-50">
                    <div className="p-4 space-y-3">
                      {dept.teams.map((team, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center">
                            <FiChevronRight className="mr-2 text-gray-400" />
                            <span className="font-medium">{team.name}</span>
                            <span className="ml-2 text-gray-500">
                              • Lead: {team.lead}
                            </span>
                          </div>
                          <span className="text-gray-500">
                            {team.members} members
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Locations Tab */}
          {activeTab === "locations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locations.map((location) => (
                <div key={location.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {location.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {location.city}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:text-blue-900">
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-sm text-gray-500">Employees</p>
                      <p className="text-lg font-medium">
                        {location.employees}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-sm text-gray-500">Departments</p>
                      <p className="text-lg font-medium">
                        {location.departments}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Policies Tab */}
          {activeTab === "policies" && (
            <div className="text-center py-8 text-gray-500">
              Organization policies management to be implemented
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationManagement;

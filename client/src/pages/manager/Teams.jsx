import { useState } from "react";
import {
  FiUsers,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiMoreVertical,
} from "react-icons/fi";

const ManagerTeams = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      position: "Senior Developer",
      email: "john.doe@company.com",
      phone: "+1 234-567-8900",
      joinDate: "2023-01-15",
      status: "Active",
      department: "Engineering",
      location: "New York",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      position: "UI/UX Designer",
      email: "sarah.wilson@company.com",
      phone: "+1 234-567-8901",
      joinDate: "2023-03-20",
      status: "Active",
      department: "Design",
      location: "San Francisco",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Team</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Team Overview
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Download Report
          </button>
        </div>
      </div>

      {/* Team Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-sm p-6 flex space-x-4"
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.position}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <FiMoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FiMail className="w-4 h-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiPhone className="w-4 h-4 mr-2" />
                  {member.phone}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  Joined: {member.joinDate}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiMapPin className="w-4 h-4 mr-2" />
                  {member.location}
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
                  View Profile
                </button>
                <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100">
                  Performance
                </button>
                <button className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerTeams; 
import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const ManagerAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const attendanceData = [
    {
      id: 1,
      employee: "John Doe",
      date: "2024-03-20",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
      totalHours: "9h 0m",
      breakTime: "1h 0m",
      overtime: "0h 0m",
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      date: "2024-03-20",
      checkIn: "09:15 AM",
      checkOut: "06:30 PM",
      status: "Late",
      totalHours: "9h 15m",
      breakTime: "1h 0m",
      overtime: "0h 30m",
    },
  ];

  const stats = [
    { label: "Total Employees", value: "12", icon: FiUsers },
    { label: "Present Today", value: "10", icon: FiCheckCircle },
    { label: "Absent Today", value: "2", icon: FiXCircle },
    { label: "Late Arrivals", value: "1", icon: FiClock },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Attendance</h1>
        <div className="flex space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Download Report
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

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium">Daily Attendance Log</h2>
        </div>
        <div className="p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Break Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overtime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {record.employee}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.checkOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.totalHours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.breakTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.overtime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        record.status === "Present"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerAttendance; 
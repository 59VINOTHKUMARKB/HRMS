import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiFilter,
  FiDownload,
  FiPlusCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const AttendanceManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMonth, setSelectedMonth] = useState("March 2024");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const attendanceData = [
    {
      id: 1,
      employee: "John Doe",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
      totalHours: "9h 0m",
      date: "2024-03-20",
    },
    {
      id: 2,
      employee: "Jane Smith",
      checkIn: "09:15 AM",
      checkOut: "05:45 PM",
      status: "Late",
      totalHours: "8h 30m",
      date: "2024-03-20",
    },
    // Add more attendance records
  ];

  const leaveRequests = [
    {
      id: 1,
      employee: "Sarah Johnson",
      type: "Annual Leave",
      startDate: "2024-03-25",
      endDate: "2024-03-28",
      status: "Pending",
      reason: "Family vacation",
    },
    // Add more leave requests
  ];

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Sample attendance data
  const attendanceDataSample = {
    "2024-03-15": { status: "present", timeIn: "09:00", timeOut: "17:30" },
    "2024-03-16": { status: "absent", reason: "Sick Leave" },
    "2024-03-17": { status: "weekend" },
    "2024-03-18": { status: "present", timeIn: "08:45", timeOut: "17:15" },
    // Add more dates as needed
  };

  const getAttendanceStatus = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return attendanceDataSample[dateStr] || { status: "none" };
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiPlusCircle className="mr-2" /> New Leave Request
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <FiDownload className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Present Today",
            value: "45",
            icon: FiCheckCircle,
            color: "green",
          },
          { label: "On Leave", value: "5", icon: FiCalendar, color: "yellow" },
          { label: "Late Arrivals", value: "3", icon: FiClock, color: "red" },
          {
            label: "Pending Requests",
            value: "8",
            icon: FiUser,
            color: "blue",
          },
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

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex">
            {["overview", "calendar", "reports"].map((tab) => (
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

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              {/* Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <select
                    className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:border-blue-500"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option>March 2024</option>
                    <option>February 2024</option>
                    <option>January 2024</option>
                  </select>
                  <FiCalendar className="absolute right-3 top-3 text-gray-400" />
                </div>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                  <FiFilter className="mr-2" /> Filter
                </button>
              </div>

              {/* Attendance Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceData.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            {record.employee.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {record.employee}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkIn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.checkOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === "Present"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.totalHours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "leave-requests" && (
            <div>
              {/* Leave Requests Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leave Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaveRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            {request.employee.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {request.employee}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.startDate} - {request.endDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 mr-3">
                          <FiCheckCircle className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiXCircle className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "calendar" && (
            <div>
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {formatDate(currentMonth)}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                {/* Day Headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
                    >
                      {day}
                    </div>
                  )
                )}

                {/* Calendar Days */}
                {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map(
                  (_, index) => (
                    <div key={`empty-${index}`} className="bg-white h-32" />
                  )
                )}

                {Array.from({ length: getDaysInMonth(currentMonth) }).map(
                  (_, index) => {
                    const day = index + 1;
                    const attendance = getAttendanceStatus(day);

                    return (
                      <div
                        key={day}
                        className="bg-white h-32 p-2 border-t border-l first:border-l-0"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-gray-700">
                            {day}
                          </span>
                          {attendance.status !== "none" && (
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                attendance.status === "present"
                                  ? "bg-green-100 text-green-800"
                                  : attendance.status === "absent"
                                  ? "bg-red-100 text-red-800"
                                  : attendance.status === "weekend"
                                  ? "bg-gray-100 text-gray-800"
                                  : ""
                              }`}
                            >
                              {attendance.status.charAt(0).toUpperCase() +
                                attendance.status.slice(1)}
                            </span>
                          )}
                        </div>
                        {attendance.status === "present" && (
                          <div className="mt-2 text-xs text-gray-500">
                            <div>In: {attendance.timeIn}</div>
                            <div>Out: {attendance.timeOut}</div>
                          </div>
                        )}
                        {attendance.status === "absent" && (
                          <div className="mt-2 text-xs text-gray-500">
                            {attendance.reason}
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>

              {/* Legend */}
              <div className="mt-4 flex space-x-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-100 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600">Present</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-100 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600">Absent</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-gray-100 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600">Weekend/Holiday</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;

import { useState } from 'react';
import { 
  FiClock, FiCalendar, FiCheckCircle, 
  FiXCircle, FiArrowLeft, FiArrowRight 
} from 'react-icons/fi';

const EmployeeAttendance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const attendanceData = [
    {
      date: '2024-03-20',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      status: 'Present',
      workHours: '9h 0m',
      breakTime: '1h 0m'
    },
    {
      date: '2024-03-19',
      checkIn: '09:15 AM',
      checkOut: '06:15 PM',
      status: 'Late',
      workHours: '9h 0m',
      breakTime: '1h 0m'
    }
  ];

  const stats = [
    { label: 'Present Days', value: '18', icon: FiCheckCircle, color: 'green' },
    { label: 'Absent Days', value: '2', icon: FiXCircle, color: 'red' },
    { label: 'Late Arrivals', value: '3', icon: FiClock, color: 'yellow' },
    { label: 'Early Departures', value: '1', icon: FiClock, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Attendance</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiClock className="mr-2" /> Mark Attendance
        </button>
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
              <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Log */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Attendance Log</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <span className="font-medium">March 2024</span>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
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
                  Work Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Break Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.checkOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.workHours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.breakTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      record.status === 'Present'
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'Late'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
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

export default EmployeeAttendance; 
import { useState } from 'react';
import { 
  FiUserMinus, FiCheckSquare, FiClock, FiAlertCircle,
  FiEdit2, FiTrash2, FiEye, FiDownload, FiPlus,
  FiCalendar
} from 'react-icons/fi';

const ExitManagement = () => {
  const [activeTab, setActiveTab] = useState('active');

  const exitRequests = [
    {
      id: 1,
      employee: 'John Doe',
      department: 'Engineering',
      position: 'Senior Developer',
      requestDate: '2024-03-15',
      lastDay: '2024-04-15',
      reason: 'Career Growth',
      status: 'In Progress',
      progress: 60,
    },
    {
      id: 2,
      employee: 'Sarah Wilson',
      department: 'Marketing',
      position: 'Marketing Manager',
      requestDate: '2024-03-10',
      lastDay: '2024-03-31',
      reason: 'Relocation',
      status: 'Pending',
      progress: 30,
    },
  ];

  const checklistItems = [
    { id: 1, task: 'Exit Interview', status: 'Completed' },
    { id: 2, task: 'Knowledge Transfer', status: 'In Progress' },
    { id: 3, task: 'Asset Return', status: 'Pending' },
    { id: 4, task: 'Account Deactivation', status: 'Not Started' },
    { id: 5, task: 'Final Settlement', status: 'Not Started' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Exit Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiPlus className="mr-2" /> New Exit Request
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <FiDownload className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Exits', value: '8', icon: FiUserMinus, color: 'blue' },
          { label: 'Pending Tasks', value: '24', icon: FiClock, color: 'yellow' },
          { label: 'Completed', value: '45', icon: FiCheckSquare, color: 'green' },
          { label: 'Overdue', value: '3', icon: FiAlertCircle, color: 'red' },
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
            {['active', 'completed', 'reports'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'active' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Exit Requests */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-lg font-medium">Active Exit Requests</h2>
                {exitRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{request.employee}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {request.position} • {request.department}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        request.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Exit Process</span>
                        <span>{request.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 rounded-full h-2"
                          style={{ width: `${request.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <FiCalendar className="inline mr-1" />
                        Last Day: {request.lastDay}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-900">
                          <FiEye className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-blue-600 hover:text-blue-900">
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checklist */}
              <div>
                <h2 className="text-lg font-medium mb-4">Exit Checklist</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  {checklistItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-3 ${
                          item.status === 'Completed'
                            ? 'bg-green-500'
                            : item.status === 'In Progress'
                            ? 'bg-blue-500'
                            : item.status === 'Pending'
                            ? 'bg-yellow-500'
                            : 'bg-gray-500'
                        }`}></span>
                        <span className="text-sm text-gray-700">{item.task}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : item.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="text-center py-8 text-gray-500">
              Completed exits history to be implemented
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="text-center py-8 text-gray-500">
              Exit reports and analytics to be implemented
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitManagement; 
import { useState } from 'react';
import { 
  FiBook, FiCalendar, FiUsers, FiAward,
  FiEdit2, FiTrash2, FiPlusCircle, FiCheckCircle,
  FiDownload, FiClock
} from 'react-icons/fi';

const TrainingManagement = () => {
  const [activeTab, setActiveTab] = useState('programs');

  const trainingPrograms = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Mike Johnson',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      participants: 15,
      status: 'Upcoming',
      type: 'Technical',
      progress: 0,
    },
    {
      id: 2,
      title: 'Leadership Skills Workshop',
      instructor: 'Sarah Brown',
      startDate: '2024-03-15',
      endDate: '2024-03-30',
      participants: 12,
      status: 'In Progress',
      type: 'Soft Skills',
      progress: 60,
    },
  ];

  const certifications = [
    {
      id: 1,
      employee: 'John Doe',
      certification: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2024-01-15',
      expiryDate: '2027-01-15',
      status: 'Active',
    },
    {
      id: 2,
      employee: 'Jane Smith',
      certification: 'Project Management Professional',
      issuer: 'PMI',
      issueDate: '2023-12-01',
      expiryDate: '2026-12-01',
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Training Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiPlusCircle className="mr-2" /> New Training Program
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <FiDownload className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Programs', value: '8', icon: FiBook, color: 'blue' },
          { label: 'Total Participants', value: '156', icon: FiUsers, color: 'green' },
          { label: 'Certifications', value: '45', icon: FiAward, color: 'yellow' },
          { label: 'Completion Rate', value: '92%', icon: FiCheckCircle, color: 'purple' },
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
            {['programs', 'certifications', 'calendar'].map((tab) => (
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
          {/* Training Programs Tab */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              {trainingPrograms.map((program) => (
                <div key={program.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {program.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Instructor: {program.instructor} • Type: {program.type}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Start Date</span>
                      <p className="text-sm font-medium">{program.startDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">End Date</span>
                      <p className="text-sm font-medium">{program.endDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Participants</span>
                      <p className="text-sm font-medium">{program.participants}</p>
                    </div>
                  </div>

                  {program.status === 'In Progress' && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{program.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 rounded-full h-2"
                          style={{ width: `${program.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      program.status === 'In Progress' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {program.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issuer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {certifications.map((cert) => (
                  <tr key={cert.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {cert.employee}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cert.certification}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cert.issuer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cert.issueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cert.expiryDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="h-96 flex items-center justify-center text-gray-500">
              Training Calendar View (To be implemented)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingManagement; 
import { useState } from 'react';
import { 
  FiBarChart2, FiPieChart, FiTrendingUp, FiUsers,
  FiDownload, FiFilter, FiCalendar, FiFileText,
  FiPrinter, FiMail
} from 'react-icons/fi';

const ReportsManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const reports = [
    {
      id: 1,
      name: 'Monthly Attendance Report',
      category: 'Attendance',
      lastGenerated: '2024-03-20',
      frequency: 'Monthly',
      status: 'Generated',
    },
    {
      id: 2,
      name: 'Payroll Summary Q1 2024',
      category: 'Payroll',
      lastGenerated: '2024-03-15',
      frequency: 'Quarterly',
      status: 'Generated',
    },
    {
      id: 3,
      name: 'Employee Performance Review',
      category: 'Performance',
      lastGenerated: '2024-03-10',
      frequency: 'Quarterly',
      status: 'Pending',
    },
  ];

  const metrics = [
    {
      category: 'Workforce',
      metrics: [
        { name: 'Total Employees', value: '248', trend: '+5%' },
        { name: 'Turnover Rate', value: '4.2%', trend: '-0.8%' },
        { name: 'Average Tenure', value: '3.2 years', trend: '+0.3' },
      ]
    },
    {
      category: 'Performance',
      metrics: [
        { name: 'Average Rating', value: '4.2/5', trend: '+0.3' },
        { name: 'Goals Completed', value: '85%', trend: '+5%' },
        { name: 'Training Completion', value: '92%', trend: '+3%' },
      ]
    },
    {
      category: 'Attendance',
      metrics: [
        { name: 'Attendance Rate', value: '96%', trend: '+1%' },
        { name: 'Leave Utilization', value: '45%', trend: '-2%' },
        { name: 'Overtime Hours', value: '120hrs', trend: '-10%' },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <select 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiDownload className="mr-2" /> Export Reports
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Reports', value: '24', icon: FiFileText, color: 'blue' },
          { label: 'Generated This Month', value: '12', icon: FiBarChart2, color: 'green' },
          { label: 'Scheduled Reports', value: '8', icon: FiCalendar, color: 'yellow' },
          { label: 'Custom Reports', value: '15', icon: FiPieChart, color: 'purple' },
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
            {['overview', 'reports', 'metrics'].map((tab) => (
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.map((section, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {section.category} Metrics
                  </h3>
                  <div className="space-y-4">
                    {section.metrics.map((metric, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{metric.name}</span>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{metric.value}</span>
                          <span className={`text-xs ${
                            metric.trend.startsWith('+') 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {metric.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                  <FiFilter className="mr-2" /> Filter
                </button>
              </div>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Generated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Frequency
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
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {report.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.lastGenerated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.frequency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          report.status === 'Generated'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiDownload className="w-5 h-5" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiPrinter className="w-5 h-5" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <FiMail className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="text-gray-500 text-center py-8">
              Detailed metrics and analytics dashboard to be implemented
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement; 
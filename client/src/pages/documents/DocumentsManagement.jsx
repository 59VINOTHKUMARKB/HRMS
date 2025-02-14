import { useState } from 'react';
import { 
  FiFolder, FiFile, FiUpload, FiDownload,
  FiSearch, FiEdit2, FiTrash2, FiShare2,
  FiLock, FiClock
} from 'react-icons/fi';

const DocumentsManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState('All Documents');

  const documents = [
    {
      id: 1,
      name: 'Employee Handbook 2024',
      type: 'PDF',
      category: 'Policies',
      size: '2.5 MB',
      lastModified: '2024-03-15',
      owner: 'HR Admin',
      access: 'All Employees',
    },
    {
      id: 2,
      name: 'Performance Review Template',
      type: 'DOCX',
      category: 'Templates',
      size: '500 KB',
      lastModified: '2024-03-10',
      owner: 'HR Manager',
      access: 'Managers',
    },
    {
      id: 3,
      name: 'Onboarding Checklist',
      type: 'XLSX',
      category: 'Forms',
      size: '750 KB',
      lastModified: '2024-03-18',
      owner: 'HR Admin',
      access: 'HR Team',
    },
  ];

  const folders = [
    { name: 'Policies', count: 15 },
    { name: 'Templates', count: 8 },
    { name: 'Forms', count: 12 },
    { name: 'Contracts', count: 25 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Document Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiUpload className="mr-2" /> Upload Document
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <FiFolder className="mr-2" /> New Folder
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Documents', value: '156', icon: FiFile, color: 'blue' },
          { label: 'Total Storage', value: '2.5 GB', icon: FiFolder, color: 'green' },
          { label: 'Recent Uploads', value: '12', icon: FiClock, color: 'yellow' },
          { label: 'Shared Files', value: '45', icon: FiShare2, color: 'purple' },
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
            {['all', 'shared', 'recent'].map((tab) => (
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
          <div className="flex">
            {/* Folders Sidebar */}
            <div className="w-64 pr-6 border-r">
              <div className="mb-4">
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedFolder === 'All Documents'
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedFolder('All Documents')}
                >
                  <div className="flex items-center">
                    <FiFolder className="mr-2" />
                    <span>All Documents</span>
                  </div>
                </button>
              </div>
              {folders.map((folder) => (
                <button
                  key={folder.name}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedFolder === folder.name
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedFolder(folder.name)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiFolder className="mr-2" />
                      <span>{folder.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{folder.count}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Documents List */}
            <div className="flex-1 pl-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search documents..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Access
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiFile className="mr-3 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {doc.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {doc.type} • {doc.size}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {doc.lastModified}
                        </div>
                        <div className="text-sm text-gray-500">
                          by {doc.owner}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <FiLock className="mr-1" />
                          {doc.access}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiDownload className="w-5 h-5" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiShare2 className="w-5 h-5" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsManagement; 
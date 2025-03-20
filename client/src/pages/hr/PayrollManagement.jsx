import { useState } from "react";
import {
  FiDollarSign,
  FiDownload,
  FiPrinter,
  FiMail,
  FiFilter,
  FiCalendar,
  FiPieChart,
  FiTrendingUp,
} from "react-icons/fi";

const PayrollManagement = () => {
  const [activeTab, setActiveTab] = useState("payroll");
  const [selectedMonth, setSelectedMonth] = useState("March 2024");

  const payrollData = [
    {
      id: 1,
      employee: "John Doe",
      employeeId: "EMP001",
      designation: "Senior Developer",
      basicSalary: 75000,
      allowances: 15000,
      deductions: 8000,
      netSalary: 82000,
      status: "Paid",
    },
    {
      id: 2,
      employee: "Jane Smith",
      employeeId: "EMP002",
      designation: "Project Manager",
      basicSalary: 85000,
      allowances: 20000,
      deductions: 10000,
      netSalary: 95000,
      status: "Pending",
    },
    // Add more payroll records
  ];

  const salaryComponents = [
    { name: "Basic Salary", percentage: "60%" },
    { name: "House Rent Allowance", percentage: "15%" },
    { name: "Medical Allowance", percentage: "10%" },
    { name: "Transport Allowance", percentage: "5%" },
    { name: "Performance Bonus", percentage: "10%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payroll Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiDollarSign className="mr-2" /> Process Payroll
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <FiDownload className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Payroll",
            value: "$285,500",
            icon: FiDollarSign,
            color: "green",
          },
          {
            label: "Processed",
            value: "45/50",
            icon: FiPieChart,
            color: "blue",
          },
          { label: "Pending", value: "5", icon: FiTrendingUp, color: "yellow" },
          {
            label: "This Month",
            value: "+12.5%",
            icon: FiTrendingUp,
            color: "purple",
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

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex">
            {["payroll", "salary-structure", "deductions", "reports"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </button>
              )
            )}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "payroll" && (
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

              {/* Payroll Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Basic Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Allowances
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deductions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Salary
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
                  {payrollData.map((record) => (
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
                            <div className="text-sm text-gray-500">
                              {record.employeeId} • {record.designation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${record.basicSalary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        +${record.allowances.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        -${record.deductions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${record.netSalary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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

          {activeTab === "salary-structure" && (
            <div>
              <h3 className="text-lg font-medium mb-4">
                Salary Structure Components
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium mb-4">Earnings</h4>
                  {salaryComponents.map((component, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-3"
                    >
                      <span className="text-gray-600">{component.name}</span>
                      <span className="font-medium">
                        {component.percentage}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium mb-4">Deductions</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">As per slab</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Provident Fund</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Insurance</span>
                      <span className="font-medium">2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "deductions" && (
            <div className="text-gray-500 text-center py-8">
              Deductions management interface to be implemented
            </div>
          )}

          {activeTab === "reports" && (
            <div className="text-gray-500 text-center py-8">
              Payroll reports and analytics to be implemented
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;

import { useState } from "react";
import {
  FiDollarSign,
  FiDownload,
  FiCalendar,
  FiFileText,
  FiClock,
} from "react-icons/fi";

const EmployeePayroll = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const payslips = [
    {
      id: 1,
      month: "March 2024",
      basic: 5000,
      allowances: 1000,
      deductions: 800,
      netPay: 5200,
      status: "Paid",
      paymentDate: "2024-03-31",
    },
    {
      id: 2,
      month: "February 2024",
      basic: 5000,
      allowances: 1000,
      deductions: 800,
      netPay: 5200,
      status: "Paid",
      paymentDate: "2024-02-29",
    },
  ];

  const stats = [
    { label: "Annual Salary", value: "$60,000", icon: FiDollarSign },
    { label: "Monthly Gross", value: "$6,000", icon: FiDollarSign },
    { label: "Tax Deductions", value: "$800", icon: FiFileText },
    { label: "Net Pay", value: "$5,200", icon: FiDollarSign },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Payroll</h1>
        <div className="flex space-x-4">
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
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

      {/* Payslips */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium">Payslips</h2>
        </div>
        <div className="p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allowances
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payslips.map((payslip) => (
                <tr key={payslip.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payslip.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${payslip.basic}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${payslip.allowances}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${payslip.deductions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${payslip.netPay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {payslip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FiDownload className="w-5 h-5" />
                    </button>
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

export default EmployeePayroll; 
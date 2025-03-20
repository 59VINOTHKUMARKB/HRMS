import { useState } from "react";
import {
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiFilter,
  FiDownload,
  FiPlusCircle,
  FiPieChart,
  FiTrendingUp,
  FiFileText,
} from "react-icons/fi";

const ExpensesManagement = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedMonth, setSelectedMonth] = useState("March 2024");

  const expenseRequests = [
    {
      id: 1,
      employee: "John Doe",
      category: "Travel",
      amount: 850.0,
      date: "2024-03-15",
      status: "Pending",
      description: "Client meeting travel expenses",
      attachments: 2,
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      category: "Equipment",
      amount: 1200.0,
      date: "2024-03-18",
      status: "Approved",
      description: "New laptop purchase",
      attachments: 1,
    },
  ];

  const categories = [
    { name: "Travel", budget: 10000, spent: 7500, color: "blue" },
    { name: "Equipment", budget: 15000, spent: 8000, color: "green" },
    { name: "Training", budget: 8000, spent: 3000, color: "yellow" },
    { name: "Office Supplies", budget: 5000, spent: 2500, color: "purple" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expenses Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <FiPlusCircle className="mr-2" /> New Expense
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
            label: "Total Expenses",
            value: "$45,250",
            icon: FiDollarSign,
            color: "blue",
          },
          {
            label: "Pending Requests",
            value: "12",
            icon: FiClock,
            color: "yellow",
          },
          {
            label: "Monthly Trend",
            value: "+8.5%",
            icon: FiTrendingUp,
            color: "green",
          },
          {
            label: "Budget Used",
            value: "65%",
            icon: FiPieChart,
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
            {["requests", "categories", "reports"].map((tab) => (
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

        <div className="p-6">
          {/* Expense Requests Tab */}
          {activeTab === "requests" && (
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <select
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option>March 2024</option>
                  <option>February 2024</option>
                  <option>January 2024</option>
                </select>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                  <FiFilter className="mr-2" /> Filter
                </button>
              </div>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
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
                  {expenseRequests.map((expense) => (
                    <tr key={expense.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {expense.employee}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {expense.category}
                        </div>
                        <div className="text-sm text-gray-500">
                          {expense.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${expense.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            expense.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {expense.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiFileText className="w-5 h-5" />
                        </button>
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

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Budget: ${category.budget.toLocaleString()}
                      </p>
                    </div>
                    <div
                      className={`p-2 rounded-full bg-${category.color}-100`}
                    >
                      <FiDollarSign
                        className={`w-5 h-5 text-${category.color}-600`}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Spent</span>
                      <span className="font-medium">
                        ${category.spent.toLocaleString()} (
                        {((category.spent / category.budget) * 100).toFixed(1)}
                        %)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-${category.color}-600 rounded-full h-2`}
                        style={{
                          width: `${(category.spent / category.budget) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="text-gray-500 text-center py-8">
              Expense reports and analytics to be implemented
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpensesManagement;

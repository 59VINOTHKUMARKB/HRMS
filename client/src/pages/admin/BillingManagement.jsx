import { useState } from "react";
import {
  FiDollarSign,
  FiCreditCard,
  FiPieChart,
  FiTrendingUp,
  FiDownload,
  FiCalendar,
  FiAlertCircle,
} from "react-icons/fi";

const BillingManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const billingStats = {
    totalRevenue: "$125,000",
    activeSubscriptions: "15",
    pendingPayments: "3",
    avgRevenuePerOrg: "$8,333",
  };

  const subscriptionPlans = [
    {
      id: 1,
      name: "Enterprise",
      price: "$999/month",
      organizations: 5,
      revenue: "$4,995",
      features: ["All Modules", "Unlimited Users", "24/7 Support", "API Access"],
    },
    {
      id: 2,
      name: "Professional",
      price: "$499/month",
      organizations: 8,
      revenue: "$3,992",
      features: ["Core Modules", "Up to 100 Users", "Business Hours Support"],
    },
    {
      id: 3,
      name: "Standard",
      price: "$299/month",
      organizations: 2,
      revenue: "$598",
      features: ["Basic Modules", "Up to 50 Users", "Email Support"],
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      organization: "Tech Solutions Inc",
      amount: "$999",
      date: "2024-03-20",
      status: "Successful",
      plan: "Enterprise",
      paymentMethod: "Credit Card",
    },
    {
      id: 2,
      organization: "Global Marketing Group",
      amount: "$499",
      date: "2024-03-19",
      status: "Pending",
      plan: "Professional",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 3,
      organization: "Innovate Design Co",
      amount: "$299",
      date: "2024-03-18",
      status: "Failed",
      plan: "Standard",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Billing Management</h1>
        <div className="flex space-x-4">
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
            <FiDownload className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">
                {billingStats.totalRevenue}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiDollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Subscriptions</p>
              <h3 className="text-2xl font-bold mt-1">
                {billingStats.activeSubscriptions}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiCreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Payments</p>
              <h3 className="text-2xl font-bold mt-1">
                {billingStats.pendingPayments}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiAlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Revenue/Org</p>
              <h3 className="text-2xl font-bold mt-1">
                {billingStats.avgRevenuePerOrg}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FiPieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{plan.name}</h3>
                  <p className="text-lg font-bold text-indigo-600 mt-1">
                    {plan.price}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {plan.organizations} orgs
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Features:</p>
                <ul className="mt-2 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-lg font-bold text-gray-900">{plan.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {transaction.organization}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {transaction.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === "Successful"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.paymentMethod}
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

export default BillingManagement; 
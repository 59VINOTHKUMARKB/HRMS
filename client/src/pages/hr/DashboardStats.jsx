import { FiUsers, FiClock, FiDollarSign, FiFileText } from "react-icons/fi";

const stats = [
  {
    id: 1,
    title: "Total Employees",
    value: "248",
    icon: FiUsers,
    change: "+12%",
    color: "blue",
  },
  {
    id: 2,
    title: "On Leave Today",
    value: "12",
    icon: FiClock,
    change: "-2%",
    color: "green",
  },
  {
    id: 3,
    title: "Pending Payroll",
    value: "$45,250",
    icon: FiDollarSign,
    change: "+5%",
    color: "yellow",
  },
  {
    id: 4,
    title: "Open Positions",
    value: "15",
    icon: FiFileText,
    change: "+8%",
    color: "purple",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <span
                className={`text-sm ${
                  stat.change.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stat.change} from last month
              </span>
            </div>
            <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;

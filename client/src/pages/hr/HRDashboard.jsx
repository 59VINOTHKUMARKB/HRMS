import DashboardStats from "./DashboardStats";
import { FiTrendingUp, FiClock, FiCalendar, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import AddEmployeeForm from "../../components/forms/AddEmployeeForm";
import axios from "axios";
import { useSelector } from "react-redux";

const HRDashBoard = () => {
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [hrManagers, setHrManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  console.log("CURRENT USER", currentUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch departments
        const deptResponse = await axios.get("/api/departments");
        if (deptResponse.data.success) {
          setDepartments(deptResponse.data.data);
        }

        // Fetch managers
        const managerResponse = await axios.get("/api/users/getEmployees?role=MANAGER");
        if (managerResponse.data.success) {
          setManagers(managerResponse.data.data);
        }

        // Fetch HR managers
        const hrResponse = await axios.get("/api/users/getEmployees?role=HR");
        if (hrResponse.data.success) {
          setHrManagers(hrResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddEmployee = async (formData) => {
    try {
      const response = await axios.post("/api/users", formData);
      if (response.data.success) {
        setShowAddEmployeeForm(false);
        notification.success({
          message: "User Added Successfully",
          placement: "bottomRight",
          duration: 3,
        });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">HRDashBoard Overview</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddEmployeeForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Add Employee
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      {showAddEmployeeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Employee</h2>
              <button
                onClick={() => setShowAddEmployeeForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <AddEmployeeForm
              onSubmit={handleAddEmployee}
              departments={departments}
              managers={managers}
              hrManagers={hrManagers}
              loading={loading}
            />
          </div>
        </div>
      )}

      <DashboardStats />

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[
              {
                icon: FiUser,
                title: "New Employee Onboarded",
                description: "John Doe joined as Software Developer",
                time: "2 hours ago",
              },
              {
                icon: FiClock,
                title: "Leave Request",
                description: "Sarah approved Mark's leave request",
                time: "3 hours ago",
              },
              {
                icon: FiCalendar,
                title: "Upcoming Review",
                description: "Performance review scheduled for Team A",
                time: "5 hours ago",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <activity.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Add Employee", icon: FiUser },
              { title: "Process Payroll", icon: FiTrendingUp },
              { title: "Approve Leave", icon: FiCalendar },
              { title: "Schedule Interview", icon: FiClock },
            ].map((action, index) => (
              <button
                key={index}
                className="p-4 border rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center justify-center space-y-2"
              >
                <action.icon className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashBoard;

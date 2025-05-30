import { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { useSelector } from "react-redux";
import axios from "axios";
import { notification, Spin } from "antd";

const EmployeeDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [leaveBalance, setLeaveBalance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);

  useEffect(() => {
    fetchLeaveBalance();
    fetchLeaveRequests();
  }, []);

  const fetchLeaveBalance = async () => {
    setLoadingBalance(true);
    try {
      const res = await axios.get(`/api/leave/balance/${currentUser.id}`);
      if (res.data.success) setLeaveBalance(res.data.data);
    } catch (error) {
      notification.error({ message: "Error fetching leave balance" });
    } finally {
      setLoadingBalance(false);
    }
  };

  const fetchLeaveRequests = async () => {
    setLoadingRequests(true);
    try {
      const res = await axios.get(`/api/leave/user/${currentUser.id}`);
      if (res.data.success) setLeaveRequests(res.data.data);
    } catch (error) {
      notification.error({ message: "Error fetching leave requests" });
    } finally {
      setLoadingRequests(false);
    }
  };

  const recentRequests = [...leaveRequests]
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .slice(0, 5);

  const colorMap = {
    ANNUAL: "blue",
    SICK: "green",
    PERSONAL: "yellow",
    UNPAID: "red",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Employee Dashboard</h1>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {loadingBalance ? (
          <div className="flex justify-center py-8">
            <Spin size="large" />
          </div>
        ) : (
          leaveBalance.map((b) => {
            const color = colorMap[b.type] || "blue";
            const label = `${b.type.charAt(0) + b.type.slice(1).toLowerCase()} Leave Remaining`;
            const value = b.remaining === "-" ? "Unlimited" : `${b.remaining} days`;
            return (
              <div key={b.type} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <h3 className="text-2xl font-bold mt-1">{value}</h3>
                  </div>
                  <div className={`p-3 bg-${color}-100 rounded-full`}>
                    <FiCalendar className={`w-6 h-6 text-${color}-600`} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">Recent Leave Requests</h2>
        {loadingRequests ? (
          <div className="flex justify-center py-8">
            <Spin size="large" />
          </div>
        ) : recentRequests.length === 0 ? (
          <div className="text-center text-gray-500">No leave requests found</div>
        ) : (
          <div className="space-y-4">
            {recentRequests.map((lr) => (
              <div key={lr.id} className="flex items-start space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FiCalendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {`${lr.leaveType.charAt(0) + lr.leaveType.slice(1).toLowerCase()} Leave`}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {`${new Date(lr.startDate).toLocaleDateString()} - ${new Date(
                      lr.endDate
                    ).toLocaleDateString()}`}
                  </p>
                  {lr.reason && <p className="text-sm text-gray-600">{lr.reason}</p>}
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ml-auto ${
                    lr.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : lr.status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {lr.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;

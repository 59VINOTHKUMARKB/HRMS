import { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiDownload,
  FiPlusCircle,
} from "react-icons/fi";
import axios from "axios";
import { notification, Spin } from "antd";

const AttendanceManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [lrLoading, setLRLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({ presentToday: 0, onLeave: 0, lateArrivals: 0, pendingRequests: 0 });

  // fetch all leave requests for HR
  const fetchLeaveRequests = async () => {
    setLRLoading(true);
    try {
      const res = await axios.get("/api/leave");
      if (res.data.success) {
        setLeaveRequests(res.data.data);
      }
    } catch (error) {
      notification.error({ message: "Error fetching leave requests" });
    } finally {
      setLRLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/api/users/getEmployees?role=EMPLOYEE');
      if (res.data.success) setEmployees(res.data.data);
    } catch (error) {
      notification.error({ message: 'Error fetching employees' });
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchLeaveRequests();
  }, []);

  useEffect(() => {
    const today = new Date();
    const onLeaveCount = leaveRequests.filter(lr => {
      const start = new Date(lr.startDate);
      const end = new Date(lr.endDate);
      return lr.status === 'APPROVED' && start <= today && end >= today;
    }).length;
    const pendingCount = leaveRequests.filter(lr => lr.status === 'PENDING').length;
    const presentCount = employees.length - onLeaveCount;
    setStats({ presentToday: presentCount, onLeave: onLeaveCount, lateArrivals: 0, pendingRequests: pendingCount });
  }, [employees, leaveRequests]);

  const handleApprove = async (id) => {
    if (!window.confirm("Approve this leave?")) return;
    try {
      await axios.put(`/api/leave/${id}/approve`);
      notification.success({ message: "Leave approved" });
      fetchLeaveRequests();
    } catch {
      notification.error({ message: "Error approving leave" });
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject this leave?")) return;
    try {
      await axios.put(`/api/leave/${id}/reject`);
      notification.success({ message: "Leave rejected" });
      fetchLeaveRequests();
    } catch {
      notification.error({ message: "Error rejecting leave" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Management</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Present Today', value: stats.presentToday, icon: FiCheckCircle, color: 'green' },
          { label: 'On Leave', value: stats.onLeave, icon: FiUser, color: 'yellow' },
          { label: 'Late Arrivals', value: stats.lateArrivals, icon: FiUser, color: 'red' },
          { label: 'Pending Requests', value: stats.pendingRequests, icon: FiUser, color: 'blue' },
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

      {/* Leave Requests Table */}
      <div className="bg-white rounded-lg shadow-sm">
        {lrLoading ? (
          <div className="flex justify-center items-center py-8">
            <Spin size="large" />
          </div>
        ) : leaveRequests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No leave requests found
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
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
              {leaveRequests.map((lr) => (
                <tr key={lr.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {lr.user.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {lr.user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lr.leaveType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lr.startDate).toLocaleDateString()} - {new Date(lr.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      lr.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {lr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {lr.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleApprove(lr.id)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          <FiCheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReject(lr.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiXCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;

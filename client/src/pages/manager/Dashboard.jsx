import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { notification, Spin } from "antd";
import { FiUsers, FiCalendar, FiCheckCircle, FiClock } from "react-icons/fi";

const ManagerDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [teamMembers, setTeamMembers] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        // fetch manager's team
        const teamRes = await axios.get(`/api/teams?managerId=${currentUser.id}`);
        const members = teamRes.data.success && teamRes.data.data.length > 0
          ? teamRes.data.data[0].members
          : [];
        setTeamMembers(members || []);
        // fetch leave requests in org
        const leaveRes = await axios.get('/api/leave');
        if (leaveRes.data.success) {
          const allLeaves = leaveRes.data.data;
          const memberIds = new Set(members.map((m) => m.id));
          const teamLeaves = allLeaves.filter((lr) => memberIds.has(lr.user.id));
          setLeaveRequests(teamLeaves);
        }
      } catch (error) {
        notification.error({ message: 'Error fetching dashboard stats' });
      } finally {
        setLoadingStats(false);
      }
    };
    if (currentUser) fetchStats();
  }, [currentUser]);

  // compute stats
  const teamCount = teamMembers.length;
  const today = new Date();
  const onLeaveCount = leaveRequests.filter((lr) => {
    const start = new Date(lr.startDate);
    const end = new Date(lr.endDate);
    return lr.status === 'APPROVED' && start <= today && end >= today;
  }).length;
  const pendingCount = leaveRequests.filter((lr) => lr.status === 'PENDING').length;
  const presentCount = teamCount - onLeaveCount;
  const statsData = [
    { label: 'Team Members', value: teamCount, icon: FiUsers, color: 'blue' },
    { label: 'Present Today', value: presentCount, icon: FiCheckCircle, color: 'green' },
    { label: 'On Leave', value: onLeaveCount, icon: FiCalendar, color: 'yellow' },
    { label: 'Pending Requests', value: pendingCount, icon: FiClock, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {loadingStats ? (
          <div className="flex justify-center py-8 col-span-4">
            <Spin size="large" />
          </div>
        ) : (
          statsData.map((stat, index) => (
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
          ))
        )}
      </div>

      {/* Additional dashboard sections removed pending real data */}
    </div>
  );
};

export default ManagerDashboard;

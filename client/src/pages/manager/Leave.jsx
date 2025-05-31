import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { Row, Col, Card, Statistic, Table, Button, Space, Spin, notification } from "antd";

const ManagerLeave = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [teamMembers, setTeamMembers] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // fetch team members: for manager only employees; for HR include managers and employees
        let members = [];
        if (currentUser.role === 'MANAGER') {
          const empRes = await axios.get('/api/users/getEmployees?role=EMPLOYEE');
          members = empRes.data.success ? empRes.data.data : [];
        } else if (currentUser.role === 'HR') {
          const deptId = currentUser.departmentId;
          const empRes = await axios.get(
            `/api/users/getEmployees?role=EMPLOYEE&departmentId=${deptId}`
          );
          const mgrRes = await axios.get(
            `/api/users/getEmployees?role=MANAGER&departmentId=${deptId}`
          );
          members = [
            ...(empRes.data.success ? empRes.data.data : []),
            ...(mgrRes.data.success ? mgrRes.data.data : []),
          ];
        }
        setTeamMembers(members);
        // fetch all leave requests
        const leaveRes = await axios.get('/api/leave');
        const all = leaveRes.data.success ? leaveRes.data.data : [];
        // filter to this manager's team
        const filtered = all.filter((lr) => members.some((m) => m.id === lr.userId));
        setLeaveRequests(filtered);
      } catch (error) {
        notification.error({ message: 'Error loading leave data' });
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) loadData();
  }, [currentUser]);

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this leave?')) return;
    try {
      await axios.put(`/api/leave/${id}/approve`);
      notification.success({ message: 'Leave approved' });
      // refresh
      const leaveRes = await axios.get('/api/leave');
      const all = leaveRes.data.success ? leaveRes.data.data : [];
      setLeaveRequests(all.filter((lr) => teamMembers.some((m) => m.id === lr.userId)));
    } catch {
      notification.error({ message: 'Error approving leave' });
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this leave?')) return;
    try {
      await axios.put(`/api/leave/${id}/reject`);
      notification.success({ message: 'Leave rejected' });
      const leaveRes = await axios.get('/api/leave');
      const all = leaveRes.data.success ? leaveRes.data.data : [];
      setLeaveRequests(all.filter((lr) => teamMembers.some((m) => m.id === lr.userId)));
    } catch {
      notification.error({ message: 'Error rejecting leave' });
    }
  };

  const totalRequests = leaveRequests.length;
  const pendingCount = leaveRequests.filter((lr) => lr.status === 'PENDING').length;
  const approvedCount = leaveRequests.filter((lr) => lr.status === 'APPROVED').length;
  const rejectedCount = leaveRequests.filter((lr) => lr.status === 'REJECTED').length;
  const avgDays = totalRequests
    ? (leaveRequests.reduce((sum, lr) => sum + (lr.totalDays || 0), 0) / totalRequests).toFixed(1)
    : 0;

  // enhanced stats with colors
  const stats = [
    { title: 'Total', value: totalRequests, icon: FiCalendar, color: '#1890ff', bg: '#e6f7ff' },
    { title: 'Pending', value: pendingCount, icon: FiClock, color: '#faad14', bg: '#fffbe6' },
    { title: 'Approved', value: approvedCount, icon: FiCheckCircle, color: '#52c41a', bg: '#f6ffed' },
    { title: 'Rejected', value: rejectedCount, icon: FiXCircle, color: '#f5222d', bg: '#fff1f0' },
    { title: 'Avg Days', value: avgDays, icon: FiUsers, color: '#722ed1', bg: '#f9f0ff' },
  ];

  const columns = [
    { title: 'Employee', dataIndex: ['user', 'name'], key: 'employee' },
    { title: 'Type', dataIndex: 'leaveType', key: 'type' },
    {
      title: 'Duration',
      key: 'duration',
      render: (_, lr) =>
        `${new Date(lr.startDate).toLocaleDateString()} - ${new Date(
          lr.endDate
        ).toLocaleDateString()}`,
    },
    { title: 'Days', dataIndex: 'totalDays', key: 'days' },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, lr) =>
        lr.status === 'PENDING' && (
          <Space>
            <Button type="link" onClick={() => handleApprove(lr.id)}>
              <FiCheckCircle size={20}/>
            </Button>
            <Button type="link" danger onClick={() => handleReject(lr.id)}>
              <FiXCircle size={20}/>
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Management</h1>
      </div>
      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
          <Col key={stat.title} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card style={{ backgroundColor: stat.bg, borderColor: stat.color }}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={<stat.icon style={{ color: stat.color }} />}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <div className="bg-white rounded-lg shadow-sm p-4">
        {loading ? (
          <div className="flex justify-center p-8">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={leaveRequests}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </div>
    </div>
  );
};

export default ManagerLeave; 
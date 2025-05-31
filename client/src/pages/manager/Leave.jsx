import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
  FiFilter,
} from "react-icons/fi";
import { Row, Col, Card, Statistic, Table, Button, Space, Spin, notification, Tag, DatePicker, Select, Tooltip } from "antd";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { CSVLink } from "react-csv";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ManagerLeave = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [teamMembers, setTeamMembers] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState(undefined);
  const [filterLeaveType, setFilterLeaveType] = useState(undefined);
  const [filterDateRange, setFilterDateRange] = useState([]);
  const [sortField, setSortField] = useState(undefined);
  const [sortOrder, setSortOrder] = useState(undefined);

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

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      let query = '';
      if (filterDateRange && filterDateRange.length === 2) {
        query += `startDate=${filterDateRange[0].toISOString()}&endDate=${filterDateRange[1].toISOString()}`;
      }
      if (filterStatus) {
        query += `${query ? '&' : ''}status=${filterStatus}`;
      }
      if (filterLeaveType) {
        query += `${query ? '&' : ''}leaveType=${filterLeaveType}`;
      }
      if (sortField && sortOrder) {
        query += `${query ? '&' : ''}sortField=${sortField}&sortOrder=${sortOrder}`;
      }

      const res = await axios.get(`/api/leave?${query}`);
      if (res.data.success) setLeaveRequests(res.data.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      notification.error({ message: 'Error loading leave data' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchLeaveRequests();
  }, [currentUser, filterDateRange, filterStatus, filterLeaveType, sortField, sortOrder]);

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this leave?')) return;
    try {
      await axios.put(`/api/leave/${id}/approve`);
      notification.success({ message: 'Leave approved' });
      fetchLeaveRequests();
    } catch (err) {
      console.error("Error approving leave:", err);
      notification.error({ message: 'Error approving leave' });
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this leave?')) return;
    try {
      await axios.put(`/api/leave/${id}/reject`);
      notification.success({ message: 'Leave rejected' });
      fetchLeaveRequests();
    } catch (err) {
      console.error("Error rejecting leave:", err);
      notification.error({ message: 'Error rejecting leave' });
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this leave?')) return;
    try {
      await axios.put(`/api/leave/${id}/cancel`);
      notification.success({ message: 'Leave cancelled' });
      fetchLeaveRequests();
    } catch (err) {
      console.error("Error cancelling leave:", err);
      notification.error({ message: 'Error cancelling leave' });
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
    { title: 'Avg Days', value: avgDays, icon: FiUsers, color: '#722ed1', bg: '#f9f0ff', suffix: 'days' },
  ];

  const columns = [
    { title: 'Employee', dataIndex: ['user', 'name'], key: 'employee' },
    {
      title: 'Type',
      dataIndex: 'leaveType',
      key: 'type',
      render: (type) => <Tag color="blue">{type}</Tag>
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (_, lr) =>
        `${dayjs(lr.startDate).format('MMM D, YYYY')} - ${dayjs(lr.endDate).format('MMM D, YYYY')}`,
    },
    { title: 'Days', dataIndex: 'totalDays', key: 'days' },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        if (status === 'PENDING') color = 'yellow';
        else if (status === 'APPROVED') color = 'green';
        else if (status === 'REJECTED') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, lr) => (
        <Space>
          {lr.status === 'PENDING' ? (
            <>
              <Tooltip title="Approve Leave">
                <Button type="primary" icon={<FiCheckCircle />} onClick={() => handleApprove(lr.id)} size="small" />
              </Tooltip>
              <Tooltip title="Reject Leave">
                <Button type="primary" danger icon={<FiXCircle />} onClick={() => handleReject(lr.id)} size="small" />
              </Tooltip>
              {currentUser.id === lr.userId && (
                <Tooltip title="Cancel Leave">
                  <Button type="default" icon={<FiXCircle />} onClick={() => handleCancel(lr.id)} size="small" />
                </Tooltip>
              )}
            </>
          ) : (
            currentUser.id === lr.userId && (
              <Tooltip title="Cancel Leave">
                <Button type="default" icon={<FiXCircle />} onClick={() => handleCancel(lr.id)} size="small" />
              </Tooltip>
            )
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Management</h1>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <RangePicker value={filterDateRange} onChange={setFilterDateRange} />
        <Select
          placeholder="Filter by Status"
          style={{ width: 180 }}
          onChange={setFilterStatus}
          value={filterStatus}
          allowClear
        >
          <Option value="PENDING">Pending</Option>
          <Option value="APPROVED">Approved</Option>
          <Option value="REJECTED">Rejected</Option>
        </Select>
        <Select
          placeholder="Filter by Leave Type"
          style={{ width: 180 }}
          onChange={setFilterLeaveType}
          value={filterLeaveType}
          allowClear
        >
          <Option value="ANNUAL">Annual</Option>
          <Option value="SICK">Sick</Option>
          <Option value="PERSONAL">Personal</Option>
          <Option value="UNPAID">Unpaid</Option>
        </Select>
        <Select
          placeholder="Sort by"
          style={{ width: 180 }}
          onChange={setSortField}
          value={sortField}
          allowClear
        >
          <Option value="startDate">Start Date</Option>
          <Option value="employee">Employee Name</Option>
          <Option value="leaveType">Leave Type</Option>
          <Option value="status">Status</Option>
        </Select>
        <Select
          placeholder="Sort Order"
          style={{ width: 180 }}
          onChange={setSortOrder}
          value={sortOrder}
          allowClear
        >
          <Option value="asc">Ascending</Option>
          <Option value="desc">Descending</Option>
        </Select>
        <Button type="primary" icon={<FiFilter />} onClick={fetchLeaveRequests}>Apply Filters</Button>
      </div>
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={4} xl={4} style={{ flex: '1 0 20%' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between">
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.icon && <stat.icon style={{ color: stat.color }} />}
                  valueStyle={{ color: stat.color }}
                  suffix={stat.suffix}
                />
              </Card>
            </motion.div>
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
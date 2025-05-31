import { FiClock, FiCalendar, FiUser, FiCheckCircle, FiXCircle, FiUsers, FiDownload } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Row, Col, Card, Statistic, Spin, notification, Button, Space, DatePicker } from "antd";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CSVLink } from "react-csv";

const { RangePicker } = DatePicker;

const ManagerDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [teamMembers, setTeamMembers] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [reportDateRange, setReportDateRange] = useState([dayjs().startOf('month'), dayjs().endOf('month')]);

  // Function to fetch team members (employees under this manager)
  const fetchTeamMembers = async () => {
    try {
      const teamRes = await axios.get(`/api/users/getEmployees?managerId=${currentUser.id}`);
      setTeamMembers(teamRes.data.success ? teamRes.data.data : []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      notification.error({ message: 'Error fetching team members' });
    }
  };

  // Function to fetch report data (attendance and leave) based on date range
  const fetchReportData = async (startDate, endDate) => {
      setLoadingStats(true);
      try {
      const start = startDate ? startDate.toISOString() : '';
      const end = endDate ? endDate.toISOString() : '';

      // Fetch leave requests for the manager's team (backend handles filtering)
      const leaveRes = await axios.get(`/api/leave?startDate=${start}&endDate=${end}`);
      const teamLeaves = leaveRes.data.success ? leaveRes.data.data : [];
          setLeaveRequests(teamLeaves);

      // Fetch attendance records for the manager's team (frontend filters by teamMembers)
      const attRes = await axios.get(`/api/attendance?startDate=${start}&endDate=${end}`);
      const allAttendance = attRes.data.success ? attRes.data.data : [];

      // Filter attendance records to only include team members
      const teamMemberIds = new Set(teamMembers.map(member => member.id));
      const filteredAttendance = allAttendance.filter(record => teamMemberIds.has(record.userId));
      setAttendanceRecords(filteredAttendance);

      } catch (error) {
      console.error("Error fetching report data:", error);
      notification.error({ message: 'Error fetching report data' });
      } finally {
        setLoadingStats(false);
      }
    };

  // Initial data fetch (team members and then reports for default range)
  useEffect(() => {
    if (currentUser) {
      fetchTeamMembers();
    }
  }, [currentUser]);

  // Fetch report data when team members are loaded or date range changes
  useEffect(() => {
    if (teamMembers.length > 0) {
      fetchReportData(reportDateRange[0], reportDateRange[1]);
    }
  }, [teamMembers, reportDateRange]);

  // Compute statistics
  const totalTeamMembers = teamMembers.length;

  const presentCount = attendanceRecords.filter((r) => r.status === 'PRESENT').length;
  const lateCount = attendanceRecords.filter((r) => r.status === 'LATE').length;
  const absentCount = attendanceRecords.filter((r) => r.status === 'ABSENT').length;

  const totalLeaveRequests = leaveRequests.length;
  const pendingLeaveCount = leaveRequests.filter((lr) => lr.status === 'PENDING').length;
  const approvedLeaveCount = leaveRequests.filter((lr) => lr.status === 'APPROVED').length;
  const rejectedLeaveCount = leaveRequests.filter((lr) => lr.status === 'REJECTED').length;
  const avgLeaveDays = totalLeaveRequests
    ? (leaveRequests.reduce((sum, lr) => sum + (lr.totalDays || 0), 0) / totalLeaveRequests).toFixed(1)
    : 0;

  const mainStats = [
    { title: 'Total Team Members', value: totalTeamMembers, icon: FiUsers, color: '#1890ff', bg: '#e6f7ff' },
    { title: 'Present', value: presentCount, icon: FiCheckCircle, color: '#52c41a', bg: '#f6ffed' },
    { title: 'Late', value: lateCount, icon: FiClock, color: '#faad14', bg: '#fffbe6' },
    { title: 'Absent', value: absentCount, icon: FiXCircle, color: '#f5222d', bg: '#fff1f0' },
  ];

  const leaveSummaryStats = [
    { title: 'Total Leave Requests', value: totalLeaveRequests, icon: FiCalendar, color: '#1890ff', bg: '#e6f7ff' },
    { title: 'Pending Leaves', value: pendingLeaveCount, icon: FiClock, color: '#faad14', bg: '#fffbe6' },
    { title: 'Approved Leaves', value: approvedLeaveCount, icon: FiCheckCircle, color: '#52c41a', bg: '#f6ffed' },
    { title: 'Rejected Leaves', value: rejectedLeaveCount, icon: FiXCircle, color: '#f5222d', bg: '#fff1f0' },
    { title: 'Avg Leave Days', value: avgLeaveDays, icon: FiUsers, color: '#722ed1', bg: '#f9f0ff', suffix: 'days' },
  ];

  // Data for charts
  const attendanceChartData = [
    { name: 'Present', value: presentCount, color: '#52c41a' },
    { name: 'Late', value: lateCount, color: '#faad14' },
    { name: 'Absent', value: absentCount, color: '#f5222d' },
  ].filter(data => data.value > 0);

  const leaveChartData = [
    { name: 'Pending', value: pendingLeaveCount, color: '#faad14' },
    { name: 'Approved', value: approvedLeaveCount, color: '#52c41a' },
    { name: 'Rejected', value: rejectedLeaveCount, color: '#f5222d' },
  ].filter(data => data.value > 0);

  // prepare CSV data
  const attendanceCsvData = attendanceRecords.map((rec) => ({
    Name: teamMembers.find(member => member.id === rec.userId)?.name || 'N/A',
    Status: rec.status,
    Date: dayjs(rec.date).format('YYYY-MM-DD'),
  }));
  const leaveCsvData = leaveRequests.map((lr) => ({
    Name: lr.user?.name || 'N/A',
    Type: lr.leaveType,
    Start: dayjs(lr.startDate).format('YYYY-MM-DD'),
    End: dayjs(lr.endDate).format('YYYY-MM-DD'),
    Days: lr.totalDays,
    Status: lr.status,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>
        <Space>
          <CSVLink data={attendanceCsvData} filename={`attendance_report_${dayjs().format('YYYY-MM-DD')}.csv`}>
            <Button icon={<FiDownload />}>Download Attendance</Button>
          </CSVLink>
          <CSVLink data={leaveCsvData} filename={`leave_report_${dayjs().format('YYYY-MM-DD')}.csv`}>
            <Button icon={<FiDownload />}>Download Leaves</Button>
          </CSVLink>
        </Space>
      </div>

      <div className="mb-6 flex justify-end">
        <Space>
          <span className="font-medium">Report Date Range: </span>
          <RangePicker
            value={reportDateRange}
            onChange={(dates) => setReportDateRange(dates)}
            onOpenChange={(open) => {
              if (!open && reportDateRange[0] && reportDateRange[1]) {
                fetchReportData(reportDateRange[0], reportDateRange[1]);
              }
            }}
          />
          <Button onClick={() => fetchReportData(reportDateRange[0], reportDateRange[1])}>Refresh Reports</Button>
        </Space>
      </div>

        {loadingStats ? (
        <div className="flex justify-center py-8">
            <Spin size="large" />
          </div>
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-8"
        >
          {/* Overview Statistics */}
          <h2 className="text-xl font-semibold">Overview</h2>
          <Row gutter={[16, 16]}>
            {mainStats.map((stat, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={6} xl={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{stat.title}</p>
                        <h3 className="text-2xl font-bold mt-1" style={{ color: stat.color }}>
                          {stat.value} {stat.suffix}
                        </h3>
                      </div>
                      <div className={`p-3 rounded-full`} style={{ backgroundColor: stat.bg }}>
                        <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Attendance Breakdown Chart */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Attendance Breakdown">
                {attendanceChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={attendanceChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {attendanceChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} records`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-4 text-gray-500">No attendance data for this period.</div>
                )}
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Leave Status Breakdown">
                {leaveChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={leaveChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {leaveChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} requests`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-4 text-gray-500">No leave data for this period.</div>
                )}
              </Card>
            </Col>
          </Row>

          {/* Leave Summary Statistics */}
          <h2 className="text-xl font-semibold">Leave Summary</h2>
          <Row gutter={[16, 16]}>
            {leaveSummaryStats.slice(0, 4).map((stat, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={6} xl={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                        <p className="text-sm text-gray-500">{stat.title}</p>
                        <h3 className="text-2xl font-bold mt-1" style={{ color: stat.color }}>
                          {stat.value} {stat.suffix}
                        </h3>
                </div>
                      <div className={`p-3 rounded-full`} style={{ backgroundColor: stat.bg }}>
                        <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
          {leaveSummaryStats.length > 4 && (
            <Row gutter={[16, 16]} justify="center">
              <Col key={4} xs={24} sm={12} md={12} lg={6} xl={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 4 * 0.1 }} // Adjust delay for the 5th item
                >
                  <Card className="h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{leaveSummaryStats[4].title}</p>
                        <h3 className="text-2xl font-bold mt-1" style={{ color: leaveSummaryStats[4].color }}>
                          {leaveSummaryStats[4].value} {leaveSummaryStats[4].suffix}
                        </h3>
            </div>
                      <div className={`p-3 rounded-full`} style={{ backgroundColor: leaveSummaryStats[4].bg }}>
                        {(() => {
                          const IconComponent = leaveSummaryStats[4].icon;
                          return <IconComponent className="w-6 h-6" style={{ color: leaveSummaryStats[4].color }} />;
                        })()}
      </div>
    </div>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ManagerDashboard;

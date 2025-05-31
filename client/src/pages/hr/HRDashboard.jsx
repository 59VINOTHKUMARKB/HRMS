import { FiClock, FiCalendar, FiUser, FiCheckCircle, FiXCircle, FiUsers, FiDownload, FiLayers } from "react-icons/fi";
import { CSVLink } from "react-csv";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Row, Col, Card, Statistic, Spin, notification, Button, Space, DatePicker } from "antd";
import dayjs from "dayjs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const { RangePicker } = DatePicker;

const HRDashBoard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [employeesUnderHR, setEmployeesUnderHR] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportDateRange, setReportDateRange] = useState([dayjs().startOf('month'), dayjs().endOf('month')]);

  // Fetch data for HR dashboard
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch all employees and managers within HR's department or organization
        let allUsers = [];
        if (currentUser.departmentId) {
          const [employeesRes, managersRes] = await Promise.all([
            axios.get(`/api/users/getEmployees?role=EMPLOYEE&departmentId=${currentUser.departmentId}`),
            axios.get(`/api/users/getEmployees?role=MANAGER&departmentId=${currentUser.departmentId}`),
          ]);
          allUsers = [
            ...(employeesRes.data.success ? employeesRes.data.data : []),
            ...(managersRes.data.success ? managersRes.data.data : []),
          ];
        } else {
          // If HR is not assigned to a department, fetch all employees/managers in the organization
          const [employeesRes, managersRes] = await Promise.all([
            axios.get(`/api/users/getEmployees?role=EMPLOYEE`),
            axios.get(`/api/users/getEmployees?role=MANAGER`),
          ]);
          allUsers = [
            ...(employeesRes.data.success ? employeesRes.data.data : []),
            ...(managersRes.data.success ? managersRes.data.data : []),
          ];
        }
        setEmployeesUnderHR(allUsers);

        // Fetch teams for the organization
        const teamsRes = await axios.get('/api/teams');
        setTeams(teamsRes.data.success ? teamsRes.data.data : []);

        // Leave requests for all relevant users
        const leaveRes = await axios.get("/api/leave");
        const relevantUserIds = new Set(allUsers.map(u => u.id));
        const hrLeaves = leaveRes.data.success
          ? leaveRes.data.data.filter((lr) => relevantUserIds.has(lr.userId))
          : [];
        setLeaveRequests(hrLeaves);

        // Attendance for today for all relevant users
        const todayISO = dayjs().startOf('day').toISOString();
        const attRes = await axios.get(`/api/attendance?date=${todayISO}`);
        const hrAttendance = attRes.data.success
          ? attRes.data.data.filter((rec) => relevantUserIds.has(rec.userId))
          : [];
        setAttendanceRecords(hrAttendance);
      } catch (error) {
        console.error("Error fetching HR stats:", error);
        notification.error({
          message: "Error loading HR data",
          description: error.message,
          placement: "bottomRight",
        });
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) fetchStats();
  }, [currentUser]);

  // Fetch data for reports based on date range
  const fetchReportData = async () => {
    setLoading(true);
    try {
      const start = reportDateRange[0] ? reportDateRange[0].toISOString() : '';
      const end = reportDateRange[1] ? reportDateRange[1].toISOString() : '';

      // Fetch attendance records within the date range
      const attRes = await axios.get(`/api/attendance?startDate=${start}&endDate=${end}`);
      setAttendanceRecords(attRes.data.success ? attRes.data.data : []);

      // Fetch leave requests within the date range
      const leaveRes = await axios.get(`/api/leave?startDate=${start}&endDate=${end}`);
      setLeaveRequests(leaveRes.data.success ? leaveRes.data.data : []);

    } catch (error) {
      notification.error({ message: "Error fetching report data" });
    } finally {
      setLoading(false);
    }
  };

  // compute statistics
  const totalEmployees = employeesUnderHR.filter(u => u.role === 'EMPLOYEE').length;
  const totalManagers = employeesUnderHR.filter(u => u.role === 'MANAGER').length;
  const totalUsers = employeesUnderHR.length; // Includes both employees and managers

  const employeeAttendanceRecords = attendanceRecords.filter(rec => 
    employeesUnderHR.some(user => user.id === rec.userId && user.role === 'EMPLOYEE')
  );
  const totalActiveEmployeesForAttendance = employeesUnderHR.filter(u => u.role === 'EMPLOYEE').length;

  const presentCount = employeeAttendanceRecords.filter((r) => r.status === 'PRESENT').length;
  const lateCount = employeeAttendanceRecords.filter((r) => r.status === 'LATE').length;
  const absentCount = employeeAttendanceRecords.filter((r) => r.status === 'ABSENT').length;
  const notMarkedCount = totalActiveEmployeesForAttendance - employeeAttendanceRecords.length; // Total employees minus those with attendance records

  const totalLeaveRequests = leaveRequests.length;
  const pendingLeaveCount = leaveRequests.filter((lr) => lr.status === 'PENDING').length;
  const approvedLeaveCount = leaveRequests.filter((lr) => lr.status === 'APPROVED').length;
  const rejectedLeaveCount = leaveRequests.filter((lr) => lr.status === 'REJECTED').length;
  const avgLeaveDays = totalLeaveRequests
    ? (leaveRequests.reduce((sum, lr) => sum + (lr.totalDays || 0), 0) / totalLeaveRequests).toFixed(1)
    : 0;

  const totalTeams = teams.length;
  const employeesInTeams = employeesUnderHR.filter(u => u.teamId && u.role === 'EMPLOYEE').length;
  const managersInTeams = employeesUnderHR.filter(u => u.teamId && u.role === 'MANAGER').length;

  // Data for charts
  const attendanceChartData = [
    { name: 'Present', value: presentCount, color: '#52c41a' },
    { name: 'Absent', value: absentCount, color: '#f5222d' },
    { name: 'Late', value: lateCount, color: '#faad14' },
    { name: 'Not Marked', value: notMarkedCount, color: '#1890ff' },
  ].filter(data => data.value > 0);

  const leaveChartData = [
    { name: 'Pending', value: pendingLeaveCount, color: '#faad14' },
    { name: 'Approved', value: approvedLeaveCount, color: '#52c41a' },
    { name: 'Rejected', value: rejectedLeaveCount, color: '#f5222d' },
  ].filter(data => data.value > 0);

  // consolidated stats with colors
  const mainStats = [
    { title: 'Total Users', value: totalUsers, icon: FiUsers, color: '#1890ff', bg: '#e6f7ff' },
    { title: 'Total Employees', value: totalEmployees, icon: FiUser, color: '#52c41a', bg: '#f6ffed' },
    { title: 'Total Managers', value: totalManagers, icon: FiUsers, color: '#faad14', bg: '#fffbe6' },
    { title: 'Total Teams', value: totalTeams, icon: FiLayers, color: '#722ed1', bg: '#f9f0ff' },
    { title: 'Employees in Teams', value: employeesInTeams, icon: FiUsers, color: '#13c2c2', bg: '#e6fffb' },
    { title: 'Managers in Teams', value: managersInTeams, icon: FiUsers, color: '#eb2f96', bg: '#fff0f6' },
  ];

  const leaveSummaryStats = [
    { title: 'Total Leave Requests', value: totalLeaveRequests, icon: FiCalendar, color: '#1890ff', bg: '#e6f7ff' },
    { title: 'Avg Leave Days', value: avgLeaveDays, icon: FiCalendar, color: '#722ed1', bg: '#f9f0ff', suffix: 'days' },
  ];

  // prepare CSV data
  const attendanceCsvData = attendanceRecords.map((rec) => ({
    Name: rec.user.name,
    Status: rec.status,
    Date: new Date(rec.date).toLocaleDateString(),
    RecordedBy: rec.recordedBy?.name || '',
  }));
  const leaveCsvData = leaveRequests.map((lr) => ({
    Name: lr.user.name,
    Type: lr.leaveType,
    Start: new Date(lr.startDate).toLocaleDateString(),
    End: new Date(lr.endDate).toLocaleDateString(),
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
        <h1 className="text-2xl font-bold">HR Dashboard</h1>
        <Space>
          <CSVLink data={attendanceCsvData} filename={`attendance_report_${dayjs().format('YYYY-MM-DD')}.csv`}>
            <Button icon={<FiDownload />}>Download Attendance</Button>
          </CSVLink>
          <CSVLink data={leaveCsvData} filename={`leave_report_${dayjs().format('YYYY-MM-DD')}.csv`}>
            <Button icon={<FiDownload />}>Download Leaves</Button>
          </CSVLink>
        </Space>
      </div>

      <div className="mb-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24} lg={24} xl={24} className="flex justify-end">
            <Space>
              <span className="font-medium">Report Date Range: </span>
              <RangePicker
                value={reportDateRange}
                onChange={(dates) => setReportDateRange(dates)}
                onOpenChange={(open) => {
                  if (!open && reportDateRange[0] && reportDateRange[1]) {
                    fetchReportData();
                  }
                }}
              />
              <Button onClick={fetchReportData} icon={<FiDownload />}>Refresh Reports</Button>
            </Space>
          </Col>
        </Row>
      </div>

      {loading ? (
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
          <Row gutter={[16, 16]} justify="center">
            {mainStats.map((stat, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
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
              </Col>
            ))}
          </Row>

          {/* Attendance and Leave Breakdown */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Today's Attendance Breakdown">
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
          <Row gutter={[16, 16]} justify="center">
            {leaveSummaryStats.map((stat, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
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
              </Col>
            ))}
          </Row>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HRDashBoard;

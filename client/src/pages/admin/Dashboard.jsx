import { useState, useEffect } from "react";
import {
  FiAlertCircle,
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiLayers,
  FiTrendingUp,
  FiUserPlus,
  FiUsers,
  FiXCircle,
  FiDownload,
} from "react-icons/fi";
import { useUser } from "../../components/Layout";
import axios from "axios";
import { notification, Row, Col, Card, Statistic, DatePicker, Space, Button, Spin } from "antd";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const { RangePicker } = DatePicker;

const AdminDashboard = () => {
  const { user } = useUser();
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(user.role === "ORG_ADMIN" ? user.organizationId : "");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportDateRange, setReportDateRange] = useState([dayjs().startOf("month"), dayjs().endOf("month")]);

  const organizationStats = {
    totalEmployees: "245",
    activePositions: "12",
    departments: "8",
    avgAttendance: "94%",
    totalPayroll: "$425,000",
    leaveRequests: "15",
    openTickets: "8",
    trainingPrograms: "6",
  };

  // Load organizations for SUPER_ADMIN or default for ORG_ADMIN
  useEffect(() => {
    if (user.role === "SUPER_ADMIN") {
      axios
        .get("/api/organizations")
        .then((res) => { if (res.data.success) setOrganizations(res.data.data); })
        .catch((error) => { notification.error({ message: "Error fetching organizations", description: error.message, placement: "bottomRight" }); });
    } else if (user.role === "ORG_ADMIN") {
      axios
        .get(`/api/organizations/${user.organizationId}`)
        .then((res) => { if (res.data.success) setOrganizations([res.data.data]); })
        .catch((error) => { notification.error({ message: "Error fetching organization", description: error.message, placement: "bottomRight" }); });
    }
  }, [user]);

  // Load departments when selectedOrg changes
  useEffect(() => {
    if (selectedOrg) {
      axios
        .get(`/api/departments?organizationId=${selectedOrg}`)
        .then((res) => { if (res.data.success) setDepartments(res.data.data); })
        .catch((error) => { notification.error({ message: "Error fetching departments", description: error.message, placement: "bottomRight" }); });
    } else {
      setDepartments([]);
      setSelectedDepartment("");
    }
  }, [selectedOrg]);

  // Load teams and employees when org/department changes
  useEffect(() => {
    if (selectedDepartment) {
      axios
        .get(`/api/teams?departmentId=${selectedDepartment}`)
        .then((res) => { if (res.data.success) setTeams(res.data.data); })
        .catch((error) => { notification.error({ message: "Error fetching teams", description: error.message, placement: "bottomRight" }); });
    } else {
      setTeams([]);
      setSelectedTeam("");
    }
    let url = `/api/users/getEmployees?role=EMPLOYEE`;
    if (selectedOrg) url += `&organizationId=${selectedOrg}`;
    if (selectedDepartment) url += `&departmentId=${selectedDepartment}`;
    axios
      .get(url)
      .then((res) => { if (res.data.success) setEmployees(res.data.data); })
      .catch((error) => { notification.error({ message: "Error fetching employees", description: error.message, placement: "bottomRight" }); });
  }, [selectedOrg, selectedDepartment]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const start = reportDateRange[0]?.toISOString() || "";
      const end = reportDateRange[1]?.toISOString() || "";
      let attUrl = `/api/attendance?startDate=${start}&endDate=${end}`;
      if (user.role === "SUPER_ADMIN" && selectedOrg) attUrl += `&organizationId=${selectedOrg}`;
      const attRes = await axios.get(attUrl);
      let attData = attRes.data.success ? attRes.data.data : [];
      const contextIds = new Set(
        selectedTeam
          ? employees.filter((e) => e.teamId === selectedTeam).map((e) => e.id)
          : employees.map((e) => e.id)
      );
      attData = attData.filter((rec) => contextIds.has(rec.userId));
      setAttendanceRecords(attData);

      let leaveUrl = `/api/leave?startDate=${start}&endDate=${end}`;
      if (user.role === "SUPER_ADMIN" && selectedOrg) leaveUrl += `&organizationId=${selectedOrg}`;
      const leaveRes = await axios.get(leaveUrl);
      let leaveData = leaveRes.data.success ? leaveRes.data.data : [];
      leaveData = leaveData.filter((lr) => contextIds.has(lr.userId));
      setLeaveRequests(leaveData);
    } catch (error) {
      notification.error({ message: "Error fetching reports", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      employees.length > 0 &&
      (user.role !== "SUPER_ADMIN" || selectedOrg)
    ) {
      fetchReportData();
    }
  }, [employees, selectedTeam, selectedOrg]);

  // Statistics
  const totalDepartments = departments.length;
  const totalTeams = teams.length;
  const totalEmployees = employees.length;
  const presentCount = attendanceRecords.filter((r) => r.status === "PRESENT").length;
  const lateCount = attendanceRecords.filter((r) => r.status === "LATE").length;
  const absentCount = attendanceRecords.filter((r) => r.status === "ABSENT").length;
  const notMarkedCount = totalEmployees - attendanceRecords.length;
  const pendingLeave = leaveRequests.filter((lr) => lr.status === "PENDING").length;
  const approvedLeave = leaveRequests.filter((lr) => lr.status === "APPROVED").length;
  const rejectedLeave = leaveRequests.filter((lr) => lr.status === "REJECTED").length;

  const mainStats = [
    { title: "Departments", value: totalDepartments, icon: FiLayers, color: "#722ed1", bg: "#f9f0ff" },
    { title: "Teams", value: totalTeams, icon: FiUsers, color: "#13c2c2", bg: "#e6fffb" },
    { title: "Employees", value: totalEmployees, icon: FiUsers, color: "#1890ff", bg: "#e6f7ff" },
    { title: "Present", value: presentCount, icon: FiCheckCircle, color: "#52c41a", bg: "#f6ffed" },
    { title: "Late", value: lateCount, icon: FiClock, color: "#faad14", bg: "#fffbe6" },
    { title: "Absent", value: absentCount, icon: FiXCircle, color: "#f5222d", bg: "#fff1f0" },
  ];

  const attendanceChartData = [
    { name: "Present", value: presentCount, color: "#52c41a" },
    { name: "Late", value: lateCount, color: "#faad14" },
    { name: "Absent", value: absentCount, color: "#f5222d" },
    { name: "Not Marked", value: notMarkedCount, color: "#1890ff" },
  ].filter((d) => d.value > 0);

  const leaveChartData = [
    { name: "Pending", value: pendingLeave, color: "#faad14" },
    { name: "Approved", value: approvedLeave, color: "#52c41a" },
    { name: "Rejected", value: rejectedLeave, color: "#f5222d" },
  ].filter((d) => d.value > 0);

  const attendanceCsvData = attendanceRecords.map((r) => ({
    Name: employees.find((e) => e.id === r.userId)?.name || "",
    Status: r.status,
    Date: dayjs(r.date).format("YYYY-MM-DD"),
  }));
  const leaveCsvData = leaveRequests.map((lr) => ({
    Name: employees.find((e) => e.id === lr.userId)?.name || "",
    Type: lr.leaveType,
    Start: dayjs(lr.startDate).format("YYYY-MM-DD"),
    End: dayjs(lr.endDate).format("YYYY-MM-DD"),
    Days: lr.totalDays,
    Status: lr.status,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <div className="flex justify-between items-center mb-6">
        <Space>
          {user.role === "SUPER_ADMIN" && (
            <select className="border rounded-lg px-4 py-2" value={selectedOrg} onChange={(e) => setSelectedOrg(e.target.value)}>
              <option value="">Select Organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          )}
          {user.role === "ORG_ADMIN" && (
            <span className="px-4 py-2 font-medium">{organizations[0]?.name}</span>
          )}
          <select className="border rounded-lg px-4 py-2" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
          </select>
          <select className="border rounded-lg px-4 py-2" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
            <option value="">All Teams</option>
            {teams.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
          </select>
        </Space>
        <Space>
          <RangePicker value={reportDateRange} onChange={(dates) => setReportDateRange(dates)} onOpenChange={(open) => { if (!open && reportDateRange[0] && reportDateRange[1]) fetchReportData(); }} />
          <Button onClick={fetchReportData} icon={<FiDownload />}>Refresh</Button>
        </Space>
      </div>
      {loading ? (
        <div className="flex justify-center py-8"><Spin size="large" /></div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="space-y-8">
          <h2 className="text-xl font-semibold">Overview</h2>
          <Row gutter={[16, 16]} justify="center">
            {mainStats.map((stat, idx) => (
              <Col key={idx} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</h3>
                    </div>
                    <div className="p-3 rounded-full" style={{ backgroundColor: stat.bg }}>
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Attendance Breakdown">
                {attendanceChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={attendanceChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                        {attendanceChartData.map((e, i) => (<Cell key={`cell-${i}`} fill={e.color} stroke={e.color} strokeWidth={2} />))}
                      </Pie>
                      <Tooltip formatter={(val) => `${val} records`} />
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
                      <Pie data={leaveChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                        {leaveChartData.map((e, i) => (<Cell key={`cell-${i}`} fill={e.color} stroke={e.color} strokeWidth={2} />))}
                      </Pie>
                      <Tooltip formatter={(val) => `${val} requests`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-4 text-gray-500">No leave data for this period.</div>
                )}
              </Card>
            </Col>
          </Row>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;

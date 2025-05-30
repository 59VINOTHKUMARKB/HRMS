import { FiClock, FiCalendar, FiUser, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Row, Col, Card, Statistic, Spin, notification } from "antd";

const HRDashBoard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [employeesUnderHR, setEmployeesUnderHR] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch employees under this HR and their leave requests
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Employees under HR
        const empRes = await axios.get(
          `/api/users/getEmployees?role=EMPLOYEE&hrId=${currentUser.id}`
        );
        if (empRes.data.success) setEmployeesUnderHR(empRes.data.data);

        // Leave requests in HR's org
        const leaveRes = await axios.get("/api/leave");
        if (leaveRes.data.success) {
          // Filter to employees under this HR
          const leaves = leaveRes.data.data.filter((lr) =>
            empRes.data.data.some((e) => e.id === lr.userId)
          );
          setLeaveRequests(leaves);
        }
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
    fetchStats();
  }, [currentUser]);

  // compute statistics
  const totalEmployees = employeesUnderHR.length;
  const onLeaveToday = leaveRequests.filter(
    (lr) => new Date(lr.startDate) <= new Date() && new Date(lr.endDate) >= new Date()
  ).length;
  const totalRequests = leaveRequests.length;
  const pendingCount = leaveRequests.filter((lr) => lr.status === 'PENDING').length;
  const approvedCount = leaveRequests.filter((lr) => lr.status === 'APPROVED').length;
  const rejectedCount = leaveRequests.filter((lr) => lr.status === 'REJECTED').length;
  const avgLeaveDays = totalRequests
    ? (
        leaveRequests.reduce((sum, lr) => sum + (lr.totalDays || 0), 0) /
        totalRequests
      ).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">HR Dashboard</h1>
      </div>

      {/* Dynamic Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Total Employees" value={totalEmployees} prefix={<FiUser />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="On Leave Today"
              value={onLeaveToday}
              prefix={<FiClock />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Leave Requests"
              value={totalRequests}
              prefix={<FiCalendar />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Pending Leaves"
              value={pendingCount}
              prefix={<FiClock />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Approved Leaves"
              value={approvedCount}
              prefix={<FiCheckCircle />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Rejected Leaves"
              value={rejectedCount}
              prefix={<FiXCircle />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Avg Leave Days"
              value={avgLeaveDays}
              suffix="days"
              prefix={<FiCalendar />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HRDashBoard;

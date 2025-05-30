import { FiClock, FiCalendar, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import AddEmployeeForm from "../../components/forms/AddEmployeeForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { Row, Col, Card, Statistic, Spin, notification } from "antd";

const HRDashBoard = () => {
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
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

  const handleAddEmployee = async (formData) => {
    try {
      const response = await axios.post("/api/users", formData);
      if (response.data.success) {
        setShowAddEmployeeForm(false);
        notification.success({ message: "User Added Successfully", placement: "bottomRight" });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">HR Dashboard</h1>
        <button
          onClick={() => setShowAddEmployeeForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      {showAddEmployeeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Employee</h2>
              <button
                onClick={() => setShowAddEmployeeForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >×</button>
            </div>
            <AddEmployeeForm onSubmit={handleAddEmployee} loading={loading} />
          </div>
        </div>
      )}

      {/* Dynamic Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Total Employees" value={employeesUnderHR.length} prefix={<FiUser />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="On Leave Today"
              value={leaveRequests.filter(lr => new Date(lr.startDate) <= new Date() && new Date(lr.endDate) >= new Date()).length}
              prefix={<FiClock />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Leave Requests"
              value={leaveRequests.length}
              prefix={<FiCalendar />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Pending Leaves"
              value={leaveRequests.filter(lr => lr.status === 'PENDING').length}
              prefix={<FiClock />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HRDashBoard;

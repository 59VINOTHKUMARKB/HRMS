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
} from "react-icons/fi";
import { useUser } from "../../components/Layout";
import axios from "axios";
import { notification, Row, Col, Card, Statistic } from "antd";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [orgData, setOrgData] = useState(null);
  const { user } = useUser();

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

  // Load organization list: super-admin sees all, org-admin sees only theirs
  useEffect(() => {
    if (user.role === "SUPER_ADMIN") {
      axios
        .get("/api/organizations")
        .then((res) => {
          if (res.data.success) setOrganizations(res.data.data);
        })
        .catch((error) => {
          notification.error({
            message: "Error Fetching Organizations",
            description: error.response?.data?.message || "Could not fetch organizations",
            placement: "bottomRight",
          });
        });
    } else if (user.role === "ORG_ADMIN") {
      // limit to own org
      axios
        .get(`/api/organizations/${user.organizationId}`)
        .then((res) => {
          if (res.data.success) {
            setOrganizations([res.data.data]);
            setSelectedOrg(user.organizationId);
          }
        });
    }
  }, [user]);

  // Load selected organization details
  useEffect(() => {
    if (selectedOrg) {
      axios
        .get(`/api/organizations/${selectedOrg}`)
        .then((res) => {
          if (res.data.success) setOrgData(res.data.data);
        })
        .catch((error) => {
          notification.error({
            message: "Error Fetching Organization Data",
            description: error.response?.data?.message || "Could not fetch organization data",
            placement: "bottomRight",
          });
        });
    } else {
      setOrgData(null);
    }
  }, [selectedOrg]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold uppercase">Welcome back, {user?.name || "Admin"}</h1>
        </div>
        <div className="flex space-x-4">
          {/* Organization selector: only for super-admin */}
          {user.role === "SUPER_ADMIN" && (
            <select
              className="border rounded-lg px-4 py-2"
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
            >
              <option value="">Select Organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          )}
          {user.role === "ORG_ADMIN" && (
            <span className="px-4 py-2 font-medium">
              {organizations[0]?.name || ""}
            </span>
          )}
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* Organization Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Employees"
              value={orgData ? orgData.users.length : "-"}
              prefix={<FiUsers />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Departments"
              value={orgData ? orgData.departments.length : "-"}
              prefix={<FiLayers />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Admins"
              value={orgData ? orgData.admins.length : "-"}
              prefix={<FiUserPlus />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Avg Attendance"
              value={organizationStats.avgAttendance}
              prefix={<FiCalendar />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Other Pages
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRouting";

// Public Pages
import HomePage from "./pages/HomePage";
import AdminSignIn from "./pages/auth/AdminSignIn";
import UserSignIn from "./pages/auth/UserSignIn";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import DepartmentManagement from "./pages/admin/DepartmentManagement";
import OrganizationManagement from "./pages/admin/OrganizationManagement";
import SystemSettings from "./pages/admin/SystemSettings";
import UserManagement from "./pages/admin/UserManagement";

// Manager Pages
import ManagerDashboard from "./pages/manager/Dashboard";
import ManagerLeave from "./pages/manager/Leave";
import ManagerTeam from "./pages/manager/TeamManagement";
import ManagerTeams from "./pages/manager/Teams";

// Employee Pages
import EmployeeAttendance from "./pages/employee/Attendance";
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeLeave from "./pages/employee/Leave";
import EmployeeProfile from "./pages/employee/Profile";

// Other Management Pages

import AttendanceManagement from "./pages/hr/AttendanceManagement";
import EmployeeList from "./pages/hr/EmployeeList";
import HRDashBoard from "./pages/hr/HRDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin/admin" element={<AdminSignIn />} />
        <Route path="/signin/user" element={<UserSignIn />} />

        {/* HR Private Routes */}
        <Route element={<PrivateRoute allowedRoles={["HR"]} />}>
          <Route path="/hr" element={<Layout />}>
            <Route path="dashboard" element={<HRDashBoard />} />
            <Route path="team" element={<ManagerTeams />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="attendance" element={<AttendanceManagement />} />
            {/* <Route path="payroll" element={<PayrollManagement />} />
            <Route path="recruitment" element={<RecruitmentManagement />} />
            <Route path="performance" element={<PerformanceManagement />} />
            <Route path="training" element={<TrainingManagement />} />
            <Route path="expenses" element={<ExpensesManagement />} />
            <Route path="reports" element={<ReportsManagement />} />
            <Route path="documents" element={<DocumentsManagement />} />
            <Route path="compliance" element={<ComplianceManagement />} />
            <Route path="exit" element={<ExitManagement />} />
            <Route path="department" element={<DepartmentManagement />} />
            <Route path="onboarding" element={<OnboardingManagement />} /> */}
          </Route>
        </Route>

        {/* Employee Private Routes */}
        <Route element={<PrivateRoute allowedRoles={["EMPLOYEE"]} />}>
          <Route path="/employee" element={<Layout />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="profile" element={<EmployeeProfile />} />
            <Route path="attendance" element={<EmployeeAttendance />} />
            <Route path="leave" element={<EmployeeLeave />} />
            {/* <Route path="payroll" element={<EmployeePayroll />} />
            <Route path="training" element={<EmployeeTraining />} />
            <Route path="expenses" element={<EmployeeExpenses />} />
            <Route path="announcements" element={<EmployeeAnnouncements />} />
            <Route path="support" element={<EmployeeSupport />} /> */}
          </Route>
        </Route>

        {/* Manager Private Routes */}
        <Route element={<PrivateRoute allowedRoles={["MANAGER"]} />}>
          <Route path="/manager" element={<Layout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="leave" element={<AttendanceManagement />} />
            <Route path="teams" element={<ManagerTeam />} />
            {/* <Route path="performance" element={<ManagerPerformance />} />
            <Route path="training" element={<ManagerTraining />} />
            <Route path="expenses" element={<ManagerExpenses />} />
            <Route path="reports" element={<ManagerReports />} />
            <Route path="feedback" element={<ManagerFeedback />} />
            <Route path="tasks" element={<ManagerTasks />} /> */}
          </Route>
        </Route>

        {/* Admin Private Routes */}
        <Route
          element={<PrivateRoute allowedRoles={["SUPER_ADMIN", "ORG_ADMIN"]} />}
        >
          <Route path="/superadmin" element={<Layout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="department" element={<DepartmentManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="organizations" element={<OrganizationManagement />} />
            <Route path="settings" element={<SystemSettings />} />
            {/* <Route path="org-settings" element={<OrgSettings />} />
            <Route path="billing" element={<BillingManagement />} />
            <Route path="security" element={<SecurityManagement />} />
            <Route path="database" element={<DatabaseManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="audit" element={<AuditLogs />} />
            <Route path="alerts" element={<SystemAlerts />} />
            <Route path="maintenance" element={<Maintenance />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
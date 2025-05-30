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
import OrganizationManagement from "./pages/admin/OrganizationManagement";
import DepartmentManagement from "./pages/admin/DepartmentManagement";
import UserManagement from "./pages/admin/UserManagement";
import DatabaseManagement from "./pages/admin/DatabaseManagement";
import BillingManagement from "./pages/admin/BillingManagement";
import SecurityManagement from "./pages/admin/SecurityManagement";
import Analytics from "./pages/admin/Analytics";
import AuditLogs from "./pages/admin/AuditLogs";
import SystemAlerts from "./pages/admin/SystemAlerts";
import SystemSettings from "./pages/admin/SystemSettings";
import Integrations from "./pages/admin/Integrations";
import Maintenance from "./pages/admin/Maintenance";
import OrgSettings from "./pages/admin/OrgSettings";

// Manager Pages
import ManagerDashboard from "./pages/manager/Dashboard";
import ManagerAttendance from "./pages/manager/Attendance";
import ManagerExpenses from "./pages/manager/Expenses";
import ManagerFeedback from "./pages/manager/Feedback";
import ManagerLeave from "./pages/manager/Leave";
import ManagerPerformance from "./pages/manager/Performance";
import ManagerReports from "./pages/manager/Reports";
import ManagerTasks from "./pages/manager/Tasks";
import ManagerTeams from "./pages/manager/Teams";
import ManagerTraining from "./pages/manager/Training";

// Employee Pages
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeAttendance from "./pages/employee/Attendance";
import EmployeeLeave from "./pages/employee/Leave";
import EmployeePayroll from "./pages/employee/Payroll";
import EmployeeExpenses from "./pages/employee/Expenses";
import EmployeeTraining from "./pages/employee/Training";
import EmployeeProfile from "./pages/employee/Profile";
import EmployeeSupport from "./pages/employee/Support";
import EmployeeAnnouncements from "./pages/employee/Announcements";

// Other Management Pages

import HRDashBoard from "./pages/hr/HRDashboard";
import EmployeeList from "./pages/hr/EmployeeList";
import AttendanceManagement from "./pages/hr/AttendanceManagement";
import PayrollManagement from "./pages/hr/PayrollManagement";
import PerformanceManagement from "./pages/hr/PerformanceManagement";
import ComplianceManagement from "./pages/hr/ComplianceManagement";
import DocumentsManagement from "./pages/hr/DocumentsManagement";
import ExitManagement from "./pages/hr/ExitManagement";
import ExpensesManagement from "./pages/hr/ExpensesManagement";
import OnboardingManagement from "./pages/hr/OnboardingManagement";
import RecruitmentManagement from "./pages/hr/RecruitmentManagement";
import ReportsManagement from "./pages/hr/ReportsManagement";
import TrainingManagement from "./pages/hr/TrainingManagement";

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
            <Route path="employees" element={<EmployeeList />} />
            <Route path="attendance" element={<AttendanceManagement />} />
            <Route path="payroll" element={<PayrollManagement />} />
            <Route path="recruitment" element={<RecruitmentManagement />} />
            <Route path="performance" element={<PerformanceManagement />} />
            <Route path="training" element={<TrainingManagement />} />
            <Route path="expenses" element={<ExpensesManagement />} />
            <Route path="reports" element={<ReportsManagement />} />
            <Route path="documents" element={<DocumentsManagement />} />
            <Route path="compliance" element={<ComplianceManagement />} />
            <Route path="exit" element={<ExitManagement />} />
            <Route path="department" element={<DepartmentManagement />} />
            <Route path="onboarding" element={<OnboardingManagement />} />
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
            <Route path="payroll" element={<EmployeePayroll />} />
            <Route path="training" element={<EmployeeTraining />} />
            <Route path="expenses" element={<EmployeeExpenses />} />
            <Route path="announcements" element={<EmployeeAnnouncements />} />
            <Route path="support" element={<EmployeeSupport />} />
          </Route>
        </Route>

        {/* Manager Private Routes */}
        <Route element={<PrivateRoute allowedRoles={["MANAGER"]} />}>
          <Route path="/manager" element={<Layout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="team" element={<ManagerTeams />} />
            <Route path="attendance" element={<ManagerAttendance />} />
            <Route path="leave" element={<ManagerLeave />} />
            <Route path="performance" element={<ManagerPerformance />} />
            <Route path="training" element={<ManagerTraining />} />
            <Route path="expenses" element={<ManagerExpenses />} />
            <Route path="reports" element={<ManagerReports />} />
            <Route path="feedback" element={<ManagerFeedback />} />
            <Route path="tasks" element={<ManagerTasks />} />
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
            <Route path="org-settings" element={<OrgSettings />} />
            <Route path="billing" element={<BillingManagement />} />
            <Route path="security" element={<SecurityManagement />} />
            <Route path="database" element={<DatabaseManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="audit" element={<AuditLogs />} />
            <Route path="alerts" element={<SystemAlerts />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="maintenance" element={<Maintenance />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
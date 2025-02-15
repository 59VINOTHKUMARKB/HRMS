import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/DashboardStats";
import HomePage from "./pages/HomePage";
import EmployeeList from "./pages/employees/EmployeeList";
import AttendanceManagement from "./pages/attendance/AttendanceManagement";
import PayrollManagement from "./pages/payroll/PayrollManagement";
import RecruitmentManagement from "./pages/recruitment/RecruitmentManagement";
import PerformanceManagement from "./pages/performance/PerformanceManagement";
import TrainingManagement from "./pages/training/TrainingManagement";
import ExpensesManagement from "./pages/expenses/ExpensesManagement";
import ReportsManagement from "./pages/reports/ReportsManagement";
import DocumentsManagement from "./pages/documents/DocumentsManagement";
import ComplianceManagement from "./pages/compliance/ComplianceManagement";
import ExitManagement from "./pages/exit/ExitManagement";
import OrganizationManagement from "./pages/organization/OrganizationManagement";
import OnboardingManagement from "./pages/onboarding/OnboardingManagement";
import EmployeeLayout from "./components/layout/EmployeeLayout";
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeProfile from "./pages/employee/Profile";
import EmployeeAttendance from "./pages/employee/Attendance";
import EmployeeLeave from "./pages/employee/Leave";
import EmployeePayroll from "./pages/employee/Payroll";
import EmployeeTraining from "./pages/employee/Training";
import EmployeeExpenses from "./pages/employee/Expenses";
import EmployeeAnnouncements from "./pages/employee/Announcements";
import EmployeeSupport from "./pages/employee/Support";
import ManagerDashboard from "./pages/manager/Dashboard";
import ManagerLayout from "./components/layout/ManagerLayout";
import ManagerAttendance from "./pages/manager/Attendance";
import ManagerTeams from "./pages/manager/Teams";
import ManagerPerformance from "./pages/manager/Performance";
import ManagerLeave from "./pages/manager/Leave";
import ManagerExpenses from "./pages/manager/Expenses";
import ManagerTraining from "./pages/manager/Training";
import ManagerReports from "./pages/manager/Reports";
import ManagerFeedback from "./pages/manager/Feedback";
import ManagerTasks from "./pages/manager/Tasks";
import SuperAdminLayout from "./components/layout/SuperAdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import BillingManagement from "./pages/admin/BillingManagement";
import SecurityManagement from "./pages/admin/SecurityManagement";
import DatabaseManagement from "./pages/admin/DatabaseManagement";
import Analytics from "./pages/admin/Analytics";
import Integrations from "./pages/admin/Integrations";
import AuditLogs from "./pages/admin/AuditLogs";
import SystemAlerts from "./pages/admin/SystemAlerts";
import SystemSettings from "./pages/admin/SystemSettings";
import Maintenance from "./pages/admin/Maintenance";
// import EmployeePayroll from "./pages/employee/Payroll";
// import EmployeeTraining from "./pages/employee/Training";
// import EmployeeExpenses from "./pages/employee/Expenses";
// import EmployeeAnnouncements from "./pages/employee/Announcements";
// import EmployeeSupport from "./pages/employee/Support";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard/*"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/employees"
          element={
            <Layout>
              <EmployeeList />
            </Layout>
          }
        />
        <Route
          path="/attendance"
          element={
            <Layout>
              <AttendanceManagement />
            </Layout>
          }
        />
        <Route
          path="/payroll"
          element={
            <Layout>
              <PayrollManagement />
            </Layout>
          }
        />
        <Route
          path="/recruitment"
          element={
            <Layout>
              <RecruitmentManagement />
            </Layout>
          }
        />
        <Route
          path="/performance"
          element={
            <Layout>
              <PerformanceManagement />
            </Layout>
          }
        />
        <Route
          path="/training"
          element={
            <Layout>
              <TrainingManagement />
            </Layout>
          }
        />
        <Route
          path="/expenses"
          element={
            <Layout>
              <ExpensesManagement />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <ReportsManagement />
            </Layout>
          }
        />
        <Route
          path="/documents"
          element={
            <Layout>
              <DocumentsManagement />
            </Layout>
          }
        />
        <Route
          path="/compliance"
          element={
            <Layout>
              <ComplianceManagement />
            </Layout>
          }
        />
        <Route
          path="/exit"
          element={
            <Layout>
              <ExitManagement />
            </Layout>
          }
        />
        <Route
          path="/organization"
          element={
            <Layout>
              <OrganizationManagement />
            </Layout>
          }
        />
        <Route
          path="/onboarding"
          element={
            <Layout>
              <OnboardingManagement />
            </Layout>
          }
        />
        <Route
          path="/employee/dashboard"
          element={
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <EmployeeLayout>
              <EmployeeProfile />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/attendance"
          element={
            <EmployeeLayout>
              <EmployeeAttendance />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/leave"
          element={
            <EmployeeLayout>
              <EmployeeLeave />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/payroll"
          element={
            <EmployeeLayout>
              <EmployeePayroll />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/training"
          element={
            <EmployeeLayout>
              <EmployeeTraining />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/expenses"
          element={
            <EmployeeLayout>
              <EmployeeExpenses />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/announcements"
          element={
            <EmployeeLayout>
              <EmployeeAnnouncements />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/support"
          element={
            <EmployeeLayout>
              <EmployeeSupport />
            </EmployeeLayout>
          }
        />
        <Route
          path="/manager/dashboard"
          element={
            <ManagerLayout>
              <ManagerDashboard />
            </ManagerLayout>
          }
        />
        <Route
          path="/manager/team"
          element={
            <ManagerLayout>
              <ManagerTeams />
            </ManagerLayout>
          }
        />
        <Route
          path="/manager/attendance"
          element={
            <ManagerLayout>
              <ManagerAttendance />
            </ManagerLayout>
          }
        />
        <Route
          path="/manager/leave"
          element={
            <ManagerLayout>
              <ManagerLeave />
            </ManagerLayout>
          }
        />
        <Route
          path="/manager/performance"
          element={
            <ManagerLayout>
              <ManagerPerformance />
            </ManagerLayout>
          }
        />
        <Route
          path="/manager/training"
          element={
            <ManagerLayout>
              <ManagerTraining />
            </ManagerLayout>
          }
        />
        <Route
          path="/manager/expenses"
          element={
            <ManagerLayout>
              <ManagerExpenses />
            </ManagerLayout>
          }
        />
        <Route
          path="/manager/reports"
          element={
            <ManagerLayout>
              <ManagerReports />
            </ManagerLayout>
          }
        />
        <Route
          path="/manager/feedback"
          element={
            <ManagerLayout>
              <ManagerFeedback />
            </ManagerLayout>
          }
        />
        <Route
          path="/manager/tasks"
          element={
            <ManagerLayout>
              <ManagerTasks />
            </ManagerLayout>
          }
        />
        <Route
          path="/superadmin/dashboard"
          element={
            <SuperAdminLayout>
              <AdminDashboard />
            </SuperAdminLayout>
          }
        />
        <Route
          path="/superadmin/organizations"
          element={
            <SuperAdminLayout>
              <OrganizationManagement />
            </SuperAdminLayout>
          }
        />
        <Route
          path="/superadmin/Users"
          element={
            <SuperAdminLayout>
              <UserManagement />
            </SuperAdminLayout>
          }
        />
        <Route
          path="/superadmin/billing"
          element={
            <SuperAdminLayout>
              <BillingManagement />
            </SuperAdminLayout>
          }
        />
        <Route
          path="superadmin/security"
          element={
            <SuperAdminLayout>
              <SecurityManagement />
            </SuperAdminLayout>
          }
        />
        <Route
          path="superadmin/database"
          element={
            <SuperAdminLayout>
              <DatabaseManagement />
            </SuperAdminLayout>
          }
        />
        <Route
          path="/superadmin/analytics"
          element={
            <SuperAdminLayout>
              <Analytics />
            </SuperAdminLayout>
          }
        />
        <Route
          path="/superadmin/integrations"
          element={
            <SuperAdminLayout>
              <Integrations />
            </SuperAdminLayout>
          }
        />
        <Route
          path="/superadmin/audit"
          element={
            <SuperAdminLayout>
              <AuditLogs />
            </SuperAdminLayout>
          }
        />
        <Route
          path="/superadmin/alerts"
          element={
            <SuperAdminLayout>
              <SystemAlerts />
            </SuperAdminLayout>
          }
        />
        <Route
          path="/superadmin/settings"
          element={
            <SuperAdminLayout>
              <SystemSettings />
            </SuperAdminLayout>
          }
        />
        <Route
          path="/superadmin/maintenance"
          element={
            <SuperAdminLayout>
              <Maintenance />
            </SuperAdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

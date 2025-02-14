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
      </Routes>
    </BrowserRouter>
  );
};

export default App;

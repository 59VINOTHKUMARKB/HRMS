import EmployeeSidebar from './EmployeeSidebar';
import Header from './Header';

const EmployeeLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <EmployeeSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout; 
import SuperAdminSidebar from './SuperAdminSidebar';
import Header from './Header';

const SuperAdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout; 
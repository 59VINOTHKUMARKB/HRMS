import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiDownload } from 'react-icons/fi';
import axios from 'axios';
import { Modal, Form, Input, Select, Button, notification } from 'antd';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

const { Option } = Select;

const EmployeeList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/users/getEmployees?hrId=${currentUser.id}`
        );
        if (res.data.success) setEmployees(res.data.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [currentUser]);

  const showAddModal = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleAddCancel = () => {
    setModalVisible(false);
  };

  const handleAddSubmit = async (values) => {
    setAddLoading(true);
    try {
      const payload = {
        ...values,
        organizationId: currentUser.organizationId,
        departmentId: currentUser.departmentId,
        hrAssignedId: currentUser.id,
      };
      const res = await axios.post('/api/users', payload);
      if (res.data.success) {
        notification.success({ message: 'User added successfully' });
        setModalVisible(false);
        form.resetFields();
        // refresh list
        const listRes = await axios.get(
          `/api/users/getEmployees?hrId=${currentUser.id}`
        );
        if (listRes.data.success) setEmployees(listRes.data.data);
      }
    } catch (err) {
      notification.error({ message: 'Error adding user' });
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <div className="flex space-x-3 p-4">
          <Button type="primary" icon={<FiPlus />} onClick={showAddModal}>
            Add User
          </Button>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal
        title="Add User"
        open={modalVisible}
        onCancel={handleAddCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddSubmit}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please input full name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Enter valid email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}> 
            <Select>
              <Option value="MANAGER">Manager</Option>
              <Option value="EMPLOYEE">Employee</Option>
            </Select>
          </Form.Item>
          <div className="flex justify-end">
            <Button onClick={handleAddCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={addLoading}>
              Add
            </Button>
          </div>
        </Form>
      </Modal>

      {/* TODO: add filters/search if needed */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {/* empty for now */}
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow-sm">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Spin size="large" />
          </div>
        ) : employees.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No employees found</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {employee.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                        {employee.email && (
                          <div className="text-sm text-gray-500">
                            {employee.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {employee.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {employee.department?.name || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeList; 
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
  const [formLoading, setFormLoading] = useState(false);
  const [form] = Form.useForm();
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch employees list
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const hrIdParam = currentUser.role === 'HR' ? `?hrId=${currentUser.id}` : '';
      const res = await axios.get(`/api/users/getEmployees${hrIdParam}`);
      if (res.data.success) setEmployees(res.data.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
      notification.error({ message: 'Error fetching employees' });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { if (currentUser) fetchEmployees(); }, [currentUser]);

  const showAddModal = () => {
    form.resetFields();
    setEditingEmployee(null);
    setModalVisible(true);
  };

  const handleAddCancel = () => {
    setModalVisible(false);
    setEditingEmployee(null);
  };

  const handleFormSubmit = async (values) => {
    setFormLoading(true);
    try {
      if (editingEmployee) {
        // Update existing employee
        const res = await axios.put(`/api/users/${editingEmployee.id}`, values);
        if (res.data.success) notification.success({ message: 'User updated successfully' });
      } else {
        // Create new employee
        const payload = {
          ...values,
          organizationId: currentUser.organizationId,
          departmentId: currentUser.departmentId,
          hrAssignedId: currentUser.id,
        };
        const res = await axios.post('/api/users', payload);
        if (res.data.success) notification.success({ message: 'User added successfully' });
      }
      setModalVisible(false);
      form.resetFields();
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      notification.error({ message: editingEmployee ? 'Error updating user' : 'Error adding user' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setLoading(true);
    try {
      const res = await axios.delete(`/api/users/${id}`);
      if (res.data.success) {
        notification.success({ message: 'User deleted successfully' });
        fetchEmployees();
      }
    } catch (err) {
      notification.error({ message: 'Error deleting user' });
    } finally {
      setLoading(false);
    }
  };

  const showEditModal = (employee) => {
    form.setFieldsValue({ name: employee.name, email: employee.email, role: employee.role });
    setEditingEmployee(employee);
    setModalVisible(true);
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
        title={editingEmployee ? 'Edit User' : 'Add User'}
        open={modalVisible}
        onCancel={handleAddCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
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
          {!editingEmployee && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: !editingEmployee, message: 'Please input password' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
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
            <Button type="primary" htmlType="submit" loading={formLoading}>
              {editingEmployee ? 'Update' : 'Add'}
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
                    <button
                      onClick={() => showEditModal(employee)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
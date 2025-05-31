import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { Modal, Form, Input, Select, Button, notification, Table, Spin, Tooltip, Card, Row, Col, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { CSVLink } from "react-csv";

const { Option } = Select;

const EmployeeList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [form] = Form.useForm();
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  console.log(currentUser.departmentId);

  // Fetch employees list
    const fetchEmployees = async () => {
      setLoading(true);
      try {
      const res = await axios.get(`/api/users/getEmployees`);
        if (res.data.success) setEmployees(res.data.data); // Assuming data includes team and department
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

  const showViewModal = (employee) => {
    setViewingEmployee(employee);
    setViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setViewModalVisible(false);
    setViewingEmployee(null);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.department?.name.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.team?.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'name',
      key: 'employee',
      render: (text, record) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold capitalize">
            {record.name.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {record.name}
            </div>
            {record.email && (
              <div className="text-sm text-gray-500">
                {record.email}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color={role === 'MANAGER' ? 'blue' : 'green'}>{role}</Tag>,
    },
    {
      title: 'Team',
      dataIndex: ['team', 'name'],
      key: 'team',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'createdAt',
      key: 'joinDate',
      render: (date) => (date ? new Date(date).toLocaleDateString() : '-'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => showViewModal(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Edit Employee">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => showEditModal(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete Employee">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(record.id)}
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const csvData = employees.map(employee => ({
    Name: employee.name,
    Email: employee.email,
    Role: employee.role,
    Department: employee.department?.name || 'N/A',
    Team: employee.team?.name || 'N/A',
    Status: employee.isActive ? 'Active' : 'Inactive',
    JoinDate: employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : '-',
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search employees..."
            prefix={<SearchOutlined />}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <CSVLink data={csvData} filename={"employees.csv"}>
            <Button type="default" icon={<DownloadOutlined />}>Export CSV</Button>
          </CSVLink>
          <Button type="primary" icon={<FiPlus />} onClick={showAddModal}>
            Add User
          </Button>
        </div>
      </div>

      {/* Employee Table */}
      <Table
        columns={columns}
        dataSource={filteredEmployees}
        rowKey="id"
        loading={loading}
        className="shadow-lg rounded-lg overflow-hidden"
        rowClassName={(record, index) => (index % 2 === 0 ? 'bg-gray-50' : 'bg-white')}
      />

      {/* Add/Edit User Modal */}
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

      {/* View Employee Modal */}
      <Modal
        title="Employee Details"
        open={viewModalVisible}
        onCancel={handleViewModalCancel}
        footer={null}
      >
        {viewingEmployee && (
          <div className="space-y-4">
            <p><strong>Name:</strong> {viewingEmployee.name}</p>
            <p><strong>Email:</strong> {viewingEmployee.email}</p>
            <p><strong>Role:</strong> {viewingEmployee.role}</p>
            <p><strong>Department:</strong> {viewingEmployee.department?.name || 'N/A'}</p>
            <p><strong>Team:</strong> {viewingEmployee.team?.name || 'N/A'}</p>
            <p><strong>Status:</strong> {viewingEmployee.isActive ? 'Active' : 'Inactive'}</p>
            <p><strong>Join Date:</strong> {viewingEmployee.createdAt ? new Date(viewingEmployee.createdAt).toLocaleDateString() : '-'}</p>
            {/* Add more employee details here as needed */}
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default EmployeeList; 
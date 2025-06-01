import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Table,
  Button,
  notification,
  Spin,
  Modal,
  Form,
  Input,
  Space,
  Card,
  Row,
  Col,
  Statistic,
} from "antd";
import { FiPlus, FiUsers, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const ManagerTeam = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      // Fetch team members directly using the managerId filter
      const res = await axios.get(`/api/users/getEmployees?managerId=${currentUser.id}`);
      if (res.data.success) {
        setTeamMembers(res.data.data);
      } else {
        setTeamMembers([]);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      notification.error({ message: 'Error fetching team members' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.id) {
      fetchTeamMembers();
    }
  }, [currentUser]);

  const showAddMemberModal = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleAddEmployee = async (values) => {
    setAddLoading(true);
    console.log(currentUser);
    try {
      const payload = {
        ...values,
        role: 'EMPLOYEE',
        organizationId: currentUser.organizationId,
        // The backend `createUser` handles setting `managerAssignedId` if role is EMPLOYEE and managerId is passed.
        // We don't need to pass departmentId explicitly if the user is being added under a manager in their team.
        // The user should automatically inherit the manager's department if not explicitly set.
        managerAssignedId: currentUser.id,
        departmentId: currentUser.departmentId,
        teamId: currentUser.teamId,
      };
      const res = await axios.post('/api/users', payload);
      if (res.data.success) {
        notification.success({ message: 'Employee added to team' });
        form.resetFields();
        setModalVisible(false);
        fetchTeamMembers(); // Refresh team members after adding
      } else {
        notification.error({ message: res.data.message || 'Error adding employee' });
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      notification.error({ message: error.response?.data?.message || 'Error adding employee' });
    } finally {
      setAddLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove this member?')) return;
    try {
      await axios.delete(`/api/users/${id}`);
      notification.success({ message: 'Member removed from team' });
      fetchTeamMembers(); // Refresh team members after removing
    } catch (error) {
      console.error("Error removing member:", error);
      notification.error({ message: error.response?.data?.message || 'Error removing member' });
    }
  };

  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMembers = filteredTeamMembers.length;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <span className="capitalize">{role.toLowerCase()}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button danger onClick={() => handleRemove(record.id)} loading={loading}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Team</h1>
        <Button type="primary" icon={<FiPlus />} onClick={showAddMemberModal}>Add Members</Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={6}>
          <Card className="h-full flex flex-col justify-between">
            <Statistic
              title="Total Team Members"
              value={totalMembers}
              prefix={<FiUsers style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Team Members List</h2>
          <Input.Search
            placeholder="Search by name or email"
            allowClear
            onSearch={setSearchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 250 }}
          />
        </div>
        {loading ? (
          <div className="flex justify-center p-8">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={filteredTeamMembers}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="shadow-lg rounded-lg overflow-hidden"
            rowClassName={(record, index) => (index % 2 === 0 ? 'bg-gray-50' : 'bg-white')}
          />
        )}
      </div>

      <Modal
        title="Add New Team Member"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleAddEmployee} className="mt-4">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please input full name!' }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input password!' }, { min: 6, message: 'Password must be at least 6 characters!' }]}          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <div className="mt-6 flex justify-end gap-3">
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={addLoading}>
              Add Member
            </Button>
          </div>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default ManagerTeam; 
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, notification, Spin } from 'antd';

const ManagerTeam = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [form] = Form.useForm();

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/teams?managerId=${currentUser.id}`);
      if (res.data.success && res.data.data.length > 0) {
        const team = res.data.data[0];
        setTeamId(team.id);
        setTeamName(team.name);
        setTeamMembers(team.members);
      } else {
        setTeamId(null);
        setTeamMembers([]);
      }
    } catch (error) {
      notification.error({ message: 'Error fetching team members' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchTeam();
  }, [currentUser]);

  const showModal = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleAddEmployee = async (values) => {
    if (!teamId) {
      notification.error({ message: 'No team found to add employees' });
      return;
    }
    setAddLoading(true);
    try {
      const payload = {
        ...values,
        role: 'EMPLOYEE',
        organizationId: currentUser.organizationId,
        departmentId: currentUser.departmentId,
        managerAssignedId: currentUser.id,
      };
      const res = await axios.post('/api/users', payload);
      if (res.data.success) {
        const newMemberIds = [...teamMembers.map((m) => m.id), res.data.data.id];
        await axios.put(`/api/teams/${teamId}`, {
          name: teamName,
          managerId: currentUser.id,
          memberIds: newMemberIds,
        });
        notification.success({ message: 'Employee added to team' });
        form.resetFields();
        setModalVisible(false);
        fetchTeam();
      }
    } catch {
      notification.error({ message: 'Error adding employee' });
    } finally {
      setAddLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (!teamId) return;
    const newMemberIds = teamMembers.filter((m) => m.id !== id).map((m) => m.id);
    try {
      await axios.put(`/api/teams/${teamId}`, {
        name: teamName,
        managerId: currentUser.id,
        memberIds: newMemberIds,
      });
      notification.success({ message: 'Member removed from team' });
      fetchTeam();
    } catch {
      notification.error({ message: 'Error removing member' });
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button danger onClick={() => handleRemove(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Team</h1>
        <Button type="primary" onClick={showModal}>
          Add Members
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        {loading ? (
          <div className="flex justify-center p-8">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={teamMembers}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </div>
      <Modal
        title="Add Employee"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddEmployee}>
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
          <div className="mt-4 text-right">
            <Button onClick={() => setModalVisible(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={addLoading}>
              Add Employee
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerTeam; 
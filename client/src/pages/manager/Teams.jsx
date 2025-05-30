import { useState, useEffect } from "react";
import { FiUsers, FiMail, FiPhone, FiCalendar, FiMapPin } from "react-icons/fi";
import { useUser } from "../../components/Layout";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  Spin,
} from "antd";

const ManagerTeams = () => {
  const { user } = useUser();
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user.role !== "HR") return;
    fetchTeams();
    fetchUsers();
  }, [user]);

  const fetchTeams = async () => {
    setTableLoading(true);
    try {
      const res = await axios.get(`/api/teams?departmentId=${user.departmentId}`);
      if (res.data.success) setTeams(res.data.data);
    } catch (err) {
      notification.error({ message: "Error fetching teams" });
    } finally {
      setTableLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      if (res.data.success) setUsers(res.data.data);
    } catch (err) {
      notification.error({ message: "Error fetching users" });
    }
  };

  const showModal = (team) => {
    setEditMode(!!team);
    setSelectedTeam(team);
    form.resetFields();
    if (team) {
      form.setFieldsValue({
        name: team.name,
        managerId: team.manager?.id,
        memberIds: team.members.map((m) => m.id),
      });
    }
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedTeam(null);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = { ...values, departmentId: user.departmentId };
      let res;
      if (editMode) {
        res = await axios.put(`/api/teams/${selectedTeam.id}`, payload);
      } else {
        res = await axios.post(`/api/teams`, payload);
      }
      if (res.data.success) {
        notification.success({ message: `Team ${editMode ? "updated" : "created"}` });
        fetchTeams();
        handleCancel();
      }
    } catch (err) {
      notification.error({ message: "Error saving team" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team?")) return;
    try {
      await axios.delete(`/api/teams/${id}`);
      notification.success({ message: "Team deleted" });
      fetchTeams();
    } catch {
      notification.error({ message: "Error deleting team" });
    }
  };

  const managerOptions = users.filter(u => u.role === "MANAGER" && u.organizationId === user.organizationId && u.departmentId === user.departmentId);
  const memberOptions = users.filter(u => u.role === "EMPLOYEE" && u.organizationId === user.organizationId && u.departmentId === user.departmentId);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Manager", dataIndex: ["manager","name"], key: "manager" },
    { title: "Members", dataIndex: "members", key: "members", render: m => m.length },
    { title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} size="small">Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)} size="small" style={{ marginLeft:8 }}>Delete</Button>
        </>
      )
    }
  ];

  if (user.role !== "HR") {
    return <div className="text-center py-8 text-gray-500">Access Denied</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <Button type="primary" onClick={() => showModal(null)}>Add Team</Button>
      </div>
      <Table
        columns={columns}
        dataSource={teams}
        rowKey="id"
        loading={tableLoading}
      />
      <Modal title={editMode ? "Edit Team" : "Add Team"} open={modalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Team Name" rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="managerId" label="Manager" rules={[{ required: true }]}
          >
            <Select options={managerOptions.map(u=>({label:u.name,value:u.id}))} />
          </Form.Item>
          <Form.Item name="memberIds" label="Members">
            <Select mode="multiple" options={memberOptions.map(u=>({label:u.name,value:u.id}))} />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button onClick={handleCancel} style={{ marginRight:8 }}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>{editMode?"Update":"Add"}</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerTeams; 
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
  Card,
  Row,
  Col,
  Tooltip,
} from "antd";
import { motion } from "framer-motion";
import { EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";

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
  const [viewTeamModalVisible, setViewTeamModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (user.role === "EMPLOYEE") return;
    fetchTeams();
    fetchUsers();
  }, [user]);

  const fetchTeams = async () => {
    setTableLoading(true);
    try {
      const res = await axios.get(
        `/api/teams?${user.role === "HR" ? `departmentId=${user.departmentId}` : `managerId=${user.id}`}`
      );
      if (res.data.success) setTeams(res.data.data);
    } catch (err) {
      notification.error({ message: "Error fetching teams" });
    } finally {
      setTableLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `/api/users?${user.role === "HR" ? `departmentId=${user.departmentId}` : `teamManagerId=${user.id}`}`
      );
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

  const showViewTeamModal = (team) => {
    setSelectedTeam(team);
    setViewTeamModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedTeam(null);
  };

  const handleViewTeamModalCancel = () => {
    setViewTeamModalVisible(false);
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
        notification.success({
          message: `Team ${editMode ? "updated" : "created"}`,
        });
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

  const managerOptions = users.filter(
    (u) =>
      u.role === "MANAGER" &&
      u.organizationId === user.organizationId &&
      u.departmentId === user.departmentId
  );
  const memberOptions = users.filter(
    (u) =>
      u.role === "EMPLOYEE" &&
      u.organizationId === user.organizationId &&
      u.departmentId === user.departmentId
  );

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Manager", dataIndex: ["manager", "name"], key: "manager" },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members) => (
        <Tooltip title={members.map(m => m.name).join(', ')}>
          <span>{members.length} members</span>
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Tooltip title="View Team">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => showViewTeamModal(record)}
              size="small"
            />
          </Tooltip>
          {user.role === "HR" && (
            <>
              <Tooltip title="Edit Team">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => showModal(record)}
                  size="small"
                  style={{ marginLeft: 8 }}
                />
              </Tooltip>
              <Tooltip title="Delete Team">
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(record.id)}
                  size="small"
                  style={{ marginLeft: 8 }}
                />
              </Tooltip>
            </>
          )}
        </>
      ),
    },
  ];

  if (user.role === "EMPLOYEE") {
    return <div className="text-center py-8 text-gray-500">Access Denied</div>;
  }

  const stats = [
    {
      title: "Total Teams",
      value: teams.length,
      color: "bg-blue-500",
      icon: <FiUsers className="text-3xl" />,
    },
    {
      title: "Total Managers",
      value: new Set(teams.map((t) => t.manager?.id)).size,
      color: "bg-green-500",
      icon: <FiMail className="text-3xl" />,
    },
    {
      title: "Total Members",
      value: teams.reduce((acc, team) => acc + team.members.length, 0),
      color: "bg-yellow-500",
      icon: <FiPhone className="text-3xl" />,
    },
  ];

  const csvData = teams.map(team => ({
    Name: team.name,
    Manager: team.manager?.name || "N/A",
    Members: team.members.map(m => m.name).join(', '),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search teams..."
            prefix={<SearchOutlined />}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <CSVLink data={csvData} filename={"teams.csv"}>
            <Button type="default" icon={<DownloadOutlined />}>Export CSV</Button>
          </CSVLink>
          {user.role === "HR" && (
            <Button type="primary" onClick={() => showModal(null)}>
              Add Team
            </Button>
          )}
        </div>
      </div>
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`text-white ${stat.color}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg">{stat.title}</div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </div>
                  <div>{stat.icon}</div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <Table
        columns={columns}
        dataSource={filteredTeams}
        rowKey="id"
        loading={tableLoading}
        className="shadow-lg rounded-lg overflow-hidden"
        rowClassName={(record, index) => (index % 2 === 0 ? 'bg-gray-50' : 'bg-white')}
      />
      <Modal
        title={editMode ? "Edit Team" : "Add Team"}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Team Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="managerId" label="Manager" rules={[{ required: true }]}>
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={managerOptions.map((u) => ({
                label: u.name,
                value: u.id,
              }))}
            />
          </Form.Item>
          <Form.Item name="memberIds" label="Members">
            <Select
              mode="multiple"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={memberOptions.map((u) => ({
                label: u.name,
                value: u.id,
              }))}
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editMode ? "Update" : "Add"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Team Details"
        open={viewTeamModalVisible}
        onCancel={handleViewTeamModalCancel}
        footer={null}
      >
        {selectedTeam && (
          <div className="space-y-4">
            <p>
              <strong className="text-gray-700">Team Name:</strong> <span className="text-gray-900">{selectedTeam.name}</span>
            </p>
            <p>
              <strong className="text-gray-700">Manager:</strong> <span className="text-gray-900">{selectedTeam.manager?.name || "N/A"}</span>
            </p>
            <div>
              <strong className="text-gray-700">Members:</strong>
              {selectedTeam.members.length > 0 ? (
                <ul className="list-disc list-inside ml-4 mt-2 text-gray-900">
                  {selectedTeam.members.map((member) => (
                    <li key={member.id}>{member.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No members in this team.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default ManagerTeams; 
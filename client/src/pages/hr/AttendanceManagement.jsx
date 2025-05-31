import { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { DatePicker, notification, Spin, Table, Tag, Tooltip, Button, Card, Row, Col, Statistic } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const AttendanceManagement = () => {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dayjs().startOf("day"));

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/getEmployees");
      if (res.data.success) setUsers(res.data.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      notification.error({ message: "Error fetching users" });
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/attendance?date=${date.toISOString()}`
      );
      if (res.data.success) setAttendance(res.data.data);
    } catch (err) {
      console.error("Error fetching attendance records:", err);
      notification.error({ message: "Error fetching attendance records" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length) fetchAttendance();
  }, [users, date]);

  const relevantUsers = users.filter(user => user.role === 'EMPLOYEE' || user.role === 'MANAGER');

  const presentCount = attendance.filter((r) => r.status === "PRESENT").length;
  const absentCount = attendance.filter((r) => r.status === "ABSENT").length;
  const lateCount = attendance.filter((r) => r.status === "LATE").length;
  const notMarkedCount = relevantUsers.length - attendance.length;

  const handleMark = async (userId, status) => {
    if (!window.confirm(`Mark ${status.toLowerCase()} for this user?`)) return;
    try {
      await axios.post("/api/attendance", {
        userId,
        status,
        date: date.toISOString(),
      });
      notification.success({ message: "Attendance marked" });
      fetchAttendance();
    } catch (err) {
      console.error("Error marking attendance:", err);
      notification.error({ message: "Error marking attendance" });
    }
  };

  const handleUpdate = async (id, status) => {
    if (!window.confirm(`Update status to ${status.toLowerCase()}?`)) return;
    try {
      await axios.put(`/api/attendance/${id}`, { status });
      notification.success({ message: "Attendance updated" });
      fetchAttendance();
    } catch (err) {
      console.error("Error updating attendance:", err);
      notification.error({ message: "Error updating attendance" });
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'user',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const currentStatus = attendance.find(a => a.userId === record.id)?.status || "NOT_MARKED";
        let color = 'gray';
        let displayText = 'Not Marked';
        if (currentStatus === 'PRESENT') { color = 'green'; displayText = 'Present'; }
        else if (currentStatus === 'ABSENT') { color = 'red'; displayText = 'Absent'; }
        else if (currentStatus === 'LATE') { color = 'yellow'; displayText = 'Late'; }
        return <Tag color={color}>{displayText}</Tag>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        const rec = attendance.find((a) => a.userId === record.id);
        return (
          <div className="flex items-center space-x-2">
            {!rec ? (
              <>
                <Tooltip title="Mark Present">
                  <Button
                    type="primary"
                    icon={<FiCheckCircle />}
                    onClick={() => handleMark(record.id, "PRESENT")}
                    size="small"
                  />
                </Tooltip>
                <Tooltip title="Mark Absent">
                  <Button
                    type="primary"
                    danger
                    icon={<FiXCircle />}
                    onClick={() => handleMark(record.id, "ABSENT")}
                    size="small"
                  />
                </Tooltip>
                <Tooltip title="Mark Late">
                  <Button
                    type="primary"
                    style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
                    icon={<FiClock />}
                    onClick={() => handleMark(record.id, "LATE")}
                    size="small"
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Update to Present">
                  <Button
                    type="primary"
                    icon={<FiCheckCircle />}
                    onClick={() => handleUpdate(rec.id, "PRESENT")}
                    size="small"
                  />
                </Tooltip>
                <Tooltip title="Update to Absent">
                  <Button
                    type="primary"
                    danger
                    icon={<FiXCircle />}
                    onClick={() => handleUpdate(rec.id, "ABSENT")}
                    size="small"
                  />
                </Tooltip>
                <Tooltip title="Update to Late">
                  <Button
                    type="primary"
                    style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
                    icon={<FiClock />}
                    onClick={() => handleUpdate(rec.id, "LATE")}
                    size="small"
                  />
                </Tooltip>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <DatePicker
          value={date}
          onChange={(val) => {
            if (val) setDate(val.startOf("day"));
          }}
        />
      </div>

      <Row gutter={[16, 16]}>
        {[
          {
            label: "Present",
            value: presentCount,
            icon: FiCheckCircle,
            color: "#52c41a",
            bgColor: "#f6ffed",
          },
          {
            label: "Absent",
            value: absentCount,
            icon: FiXCircle,
            color: "#f5222d",
            bgColor: "#fff1f0",
          },
          { label: "Late", value: lateCount, icon: FiClock, color: "#faad14", bgColor: "#fffbe6" },
          {
            label: "Not Marked",
            value: notMarkedCount,
            icon: FiUser,
            color: "#1890ff",
            bgColor: "#e6f7ff",
          },
        ].map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full">
            <div className="flex items-center justify-between">
              <div>
                    <Statistic title={stat.label} value={stat.value} valueStyle={{ color: stat.color }} />
              </div>
                  <div className={`p-3 rounded-full`} style={{ backgroundColor: stat.bgColor }}>
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <Table
        columns={columns}
        dataSource={relevantUsers}
        rowKey="id"
        loading={loading}
        className="shadow-lg rounded-lg overflow-hidden"
        rowClassName={(record, index) => (index % 2 === 0 ? 'bg-gray-50' : 'bg-white')}
      />
    </motion.div>
  );
};

export default AttendanceManagement;

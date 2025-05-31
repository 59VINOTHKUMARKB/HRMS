import { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { DatePicker, notification, Spin } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const AttendanceManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dayjs().startOf("day"));

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "/api/users/getEmployees?role=EMPLOYEE"
      );
      if (res.data.success) setEmployees(res.data.data);
    } catch {
      notification.error({ message: "Error fetching employees" });
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
    } catch {
      notification.error({ message: "Error fetching attendance records" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (employees.length) fetchAttendance();
  }, [employees, date]);

  const presentCount = attendance.filter((r) => r.status === "PRESENT").length;
  const absentCount = attendance.filter((r) => r.status === "ABSENT").length;
  const lateCount = attendance.filter((r) => r.status === "LATE").length;
  const notMarkedCount = employees.length - attendance.length;

  const handleMark = async (userId, status) => {
    if (!window.confirm(`Mark ${status.toLowerCase()} for this employee?`)) return;
    try {
      await axios.post("/api/attendance", {
        userId,
        status,
        date: date.toISOString(),
      });
      notification.success({ message: "Attendance marked" });
      fetchAttendance();
    } catch {
      notification.error({ message: "Error marking attendance" });
    }
  };

  const handleUpdate = async (id, status) => {
    if (!window.confirm(`Update status to ${status.toLowerCase()}?`)) return;
    try {
      await axios.put(`/api/attendance/${id}`, { status });
      notification.success({ message: "Attendance updated" });
      fetchAttendance();
    } catch {
      notification.error({ message: "Error updating attendance" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <DatePicker
          value={date}
          onChange={(val) => {
            if (val) setDate(val.startOf("day"));
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Present",
            value: presentCount,
            icon: FiCheckCircle,
            color: "green",
          },
          {
            label: "Absent",
            value: absentCount,
            icon: FiXCircle,
            color: "red",
          },
          { label: "Late", value: lateCount, icon: FiClock, color: "yellow" },
          {
            label: "Not Marked",
            value: notMarkedCount,
            icon: FiUser,
            color: "blue",
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-full`}>            
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Spin size="large" />
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((emp) => {
                const rec = attendance.find((a) => a.userId === emp.id);
                return (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          rec?.status === "PRESENT"
                            ? "bg-green-100 text-green-800"
                            : rec?.status === "LATE"
                            ? "bg-yellow-100 text-yellow-800"
                            : rec?.status === "ABSENT"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {rec?.status || "Not Marked"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!rec ? (
                        <>
                          <button
                            onClick={() => handleMark(emp.id, "PRESENT")}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            <FiCheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleMark(emp.id, "ABSENT")}
                            className="text-red-600 hover:text-red-900 mr-3"
                          >
                            <FiXCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleMark(emp.id, "LATE")}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            <FiClock className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleUpdate(rec.id, "PRESENT")}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            <FiCheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleUpdate(rec.id, "ABSENT")}
                            className="text-red-600 hover:text-red-900 mr-3"
                          >
                            <FiXCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleUpdate(rec.id, "LATE")}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            <FiClock className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;

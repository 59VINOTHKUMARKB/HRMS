import { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { DatePicker, notification, Spin } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const EmployeeAttendance = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [attendanceData, setAttendanceData] = useState([]);
  const [stats, setStats] = useState({ present: 0, absent: 0, late: 0 });
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dayjs().startOf('day'));

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/attendance/user/${currentUser.id}?date=${date.toISOString()}`
      );
      if (res.data.success) setAttendanceData(res.data.data);
    } catch {
      notification.error({ message: 'Error fetching attendance' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchAttendance();
  }, [currentUser, date]);

  useEffect(() => {
    const present = attendanceData.filter((r) => r.status === 'PRESENT').length;
    const absent = attendanceData.filter((r) => r.status === 'ABSENT').length;
    const late = attendanceData.filter((r) => r.status === 'LATE').length;
    setStats({ present, absent, late });
  }, [attendanceData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Attendance</h1>
        <DatePicker
          value={date}
          onChange={(val) => {
            if (val) setDate(val.startOf('day'));
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Present Days', value: stats.present, icon: FiCheckCircle, color: 'green' },
          { label: 'Absent Days', value: stats.absent, icon: FiXCircle, color: 'red' },
          { label: 'Late Arrivals', value: stats.late, icon: FiClock, color: 'yellow' },
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
        ) : attendanceData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No attendance records found
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.map((rec) => (
                <tr key={rec.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(rec.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        rec.status === 'PRESENT'
                          ? 'bg-green-100 text-green-800'
                          : rec.status === 'LATE'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                      {rec.status}
                    </span>
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

export default EmployeeAttendance; 
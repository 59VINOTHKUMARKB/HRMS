import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Select,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useUser } from "../../components/Layout";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const EmployeeLeave = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const navigate = useNavigate();
  const leaveBalance = [
    { type: "Annual Leave", total: 21, used: 12, remaining: 9 },
    { type: "Sick Leave", total: 10, used: 3, remaining: 7 },
    { type: "Personal Leave", total: 6, used: 2, remaining: 3 },
    { type: "Unpaid Leave", total: "No Limit", used: 1, remaining: "-" },
  ];

  const leaveRequests = [
    {
      id: 1,
      type: "Annual Leave",
      startDate: "2024-04-01",
      endDate: "2024-04-05",
      days: 5,
      reason: "Family vacation",
      status: "Pending",
      appliedOn: "2024-03-15",
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "2024-03-10",
      endDate: "2024-03-11",
      days: 2,
      reason: "Medical appointment",
      status: "Approved",
      appliedOn: "2024-03-08",
    },
  ];

  const leaveTypes = [
    { value: "ANNUAL", label: "Annual Leave" },
    { value: "SICK", label: "Sick Leave" },
    { value: "MATERNITY", label: "Maternity Leave" },
    { value: "PATERNITY", label: "Paternity Leave" },
    { value: "BEREAVEMENT", label: "Bereavement Leave" },
    { value: "UNPAID", label: "Unpaid Leave" },
    { value: "OTHER", label: "Other" },
  ];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const [startDate, endDate] = values.dateRange;

      const leaveData = {
        employeeId: user.id,
        leaveType: values.leaveType,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        reason: values.reason,
        status: "PENDING",
        organizationId: user.organizationId,
      };

      const response = await axios.post("/api/leaves", leaveData);

      if (response.data.success) {
        notification.success({
          message: "Leave Application Submitted",
          description:
            "Your leave application has been submitted successfully.",
          placement: "bottomRight",
        });
        form.resetFields();
      }
    } catch (error) {
      notification.error({
        message: "Error Submitting Leave",
        description:
          error.response?.data?.message ||
          "Failed to submit leave application.",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Management</h1>
        <button
          onClick={() => setShowLeaveModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FiPlus className="mr-2" /> Apply Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {leaveBalance.map((leave, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">{leave.type}</h3>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold">{leave.remaining}</p>
                <p className="text-sm text-gray-500">Remaining</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Used: {leave.used}/{leave.total}
                </p>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${(leave.used / leave.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Leave Requests */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium">Leave Requests</h2>
        </div>
        <div className="p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.startDate} to {request.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.days}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.appliedOn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        request.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title="Apply for Leave"
        open={showLeaveModal}
        onCancel={() => {
          setShowLeaveModal(false);
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="leaveType"
            label="Leave Type"
            rules={[{ required: true, message: "Please select leave type!" }]}
          >
            <Select placeholder="Select leave type">
              {leaveTypes.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="Leave Period"
            rules={[{ required: true, message: "Please select leave period!" }]}
          >
            <RangePicker
              className="w-full"
              disabledDate={(current) => {
                return current && current < dayjs().startOf("day");
              }}
            />
          </Form.Item>

          <Form.Item
            name="reason"
            label="Reason for Leave"
            rules={[
              { required: true, message: "Please provide reason for leave!" },
              { min: 10, message: "Reason must be at least 10 characters!" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Please provide a detailed reason for your leave request"
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-3">
              <Button onClick={() => form.resetFields()}>Reset</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit Leave Request
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeLeave;

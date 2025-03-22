import React, { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  notification,
  message,
} from "antd";
import { useUser } from "../../components/Layout";
import axios from "axios";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const LeaveForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Apply for Leave</h2>

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
    </div>
  );
};

export default LeaveForm;

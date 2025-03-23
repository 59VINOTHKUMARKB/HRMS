import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  notification,
  Button,
  Select,
  Input,
  InputNumber,
  Checkbox,
  Form,
} from "antd";
import {
  FiGlobe,
  FiMail,
  FiLock,
  FiClock,
  FiSave,
  FiRefreshCw,
  FiUpload,
} from "react-icons/fi";
import axios from "axios";

const SystemSettings = () => {
  const { currentUser } = useSelector((state) => state.user);

  // Initialize with empty objects for each settings category
  const [settings, setSettings] = useState({
    general: {},
    email: {},
    security: {},
    notifications: {},
    leaveApproval: {},
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/organizations/${currentUser.organizationId}/settings`
        );
        console.log("Settings data:", response.data);

        // If data comes with success wrapper, extract the data property
        const settingsData = response.data.data || response.data;

        // Update the settings state with fetched data, maintaining structure
        setSettings({
          general: settingsData.general || {},
          email: settingsData.email || {},
          security: settingsData.security || {},
          notifications: settingsData.notifications || {},
          leaveApproval: settingsData.leaveApproval || {},
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
        // Keep default empty objects if error occurs
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser.organizationId) {
      fetchSettings();
    }
  }, [currentUser?.organizationId]);

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSaveSettings = async () => {
    try {
      console.log(settings);
      const response = await axios.put(
        `/api/organizations/${currentUser.organizationId}/settings`,
        settings
      );
      notification.success({
        message: "Settings Saved Successfully",
        placement: "top",
        duration: 3,
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      notification.error({
        message: "Failed to save settings",
        placement: "top",
        duration: 3,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organization Settings</h1>
        <Button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <FiSave className="mr-2" /> Save Changes
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-2">
        <div className="flex items-center space-x-3 mb-4">
          <FiGlobe className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Leave Settings</h2>
        </div>
        <Form layout="vertical">
          <Form.Item label="Leave Approval Flow">
            <Select
              value={settings.leaveApproval.leaveApprovalFlow}
              onChange={(value) =>
                handleSettingChange("leaveApproval", "leaveApprovalFlow", value)
              }
            >
              <Select.Option value="manager_to_hr">
                Manager → HR (Two-step approval)
              </Select.Option>
              <Select.Option value="direct_to_hr">
                Directly to HR (One-step approval)
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Annual Leave Quota (Days)">
            <InputNumber
              min={0}
              value={settings.leaveApproval.annualLeaveQuota}
              onChange={(value) =>
                handleSettingChange("leaveApproval", "annualLeaveQuota", value)
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={settings.leaveApproval.leaveCarryForward}
              onChange={(e) =>
                handleSettingChange(
                  "leaveApproval",
                  "leaveCarryForward",
                  e.target.checked
                )
              }
            >
              Allow Leave Carry Forward
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={settings.leaveApproval.probationRestriction}
              onChange={(e) =>
                handleSettingChange(
                  "leaveApproval",
                  "probationRestriction",
                  e.target.checked
                )
              }
            >
              Restrict Leaves During Probation
            </Checkbox>
          </Form.Item>
        </Form>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FiGlobe className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">General Settings</h2>
        </div>
        <Form
          layout="vertical"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Form.Item label="Company Name">
            <Input
              value={settings.general.companyName}
              onChange={(e) =>
                handleSettingChange("general", "companyName", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item label="Timezone">
            <Select
              value={settings.general.timezone}
              onChange={(value) =>
                handleSettingChange("general", "timezone", value)
              }
            >
              <Select.Option value="UTC+00:00">UTC+00:00</Select.Option>
              <Select.Option value="UTC-05:00">UTC-05:00 (EST)</Select.Option>
              <Select.Option value="UTC-08:00">UTC-08:00 (PST)</Select.Option>
              <Select.Option value="UTC+01:00">UTC+01:00 (CET)</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date Format">
            <Select
              value={settings.general.dateFormat}
              onChange={(value) =>
                handleSettingChange("general", "dateFormat", value)
              }
            >
              <Select.Option value="YYYY-MM-DD">YYYY-MM-DD</Select.Option>
              <Select.Option value="MM/DD/YYYY">MM/DD/YYYY</Select.Option>
              <Select.Option value="DD/MM/YYYY">DD/MM/YYYY</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Language">
            <Select
              value={settings.general.language}
              onChange={(value) =>
                handleSettingChange("general", "language", value)
              }
            >
              <Select.Option value="English">English</Select.Option>
              <Select.Option value="Spanish">Spanish</Select.Option>
              <Select.Option value="French">French</Select.Option>
              <Select.Option value="German">German</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>

      {/* Email Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FiMail className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Email Settings</h2>
        </div>
        <Form
          layout="vertical"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Form.Item label="SMTP Server">
            <Input
              value={settings.email.smtpServer}
              onChange={(e) =>
                handleSettingChange("email", "smtpServer", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item label="SMTP Port">
            <Input
              value={settings.email.smtpPort}
              onChange={(e) =>
                handleSettingChange("email", "smtpPort", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item label="SMTP Username">
            <Input
              value={settings.email.smtpUsername}
              onChange={(e) =>
                handleSettingChange("email", "smtpUsername", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item label="SMTP Password">
            <Input.Password
              value={settings.email.smtpPassword}
              onChange={(e) =>
                handleSettingChange("email", "smtpPassword", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item label="Email From Name">
            <Input
              value={settings.email.emailFromName}
              onChange={(e) =>
                handleSettingChange("email", "emailFromName", e.target.value)
              }
            />
          </Form.Item>
        </Form>
        <div className="mt-4">
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center">
            <FiRefreshCw className="mr-2" /> Test Email Configuration
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FiLock className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Security Settings</h2>
        </div>
        <Form
          layout="vertical"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Form.Item label="Password Expiry (days)">
            <InputNumber
              value={settings.security.passwordExpiry}
              onChange={(value) =>
                handleSettingChange("security", "passwordExpiry", value)
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Session Timeout (minutes)">
            <InputNumber
              value={settings.security.sessionTimeout}
              onChange={(value) =>
                handleSettingChange("security", "sessionTimeout", value)
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Max Login Attempts">
            <InputNumber
              value={settings.security.maxLoginAttempts}
              onChange={(value) =>
                handleSettingChange("security", "maxLoginAttempts", value)
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Two-Factor Authentication">
            <Checkbox
              checked={settings.security.twoFactorAuth}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "twoFactorAuth",
                  e.target.checked
                )
              }
            >
              Enable Two-Factor Authentication for all users
            </Checkbox>
          </Form.Item>
        </Form>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FiClock className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Notification Settings</h2>
        </div>
        <Form layout="vertical" className="space-y-4">
          <Form.Item>
            <Checkbox
              checked={settings.notifications.emailNotifications}
              onChange={(e) =>
                handleSettingChange(
                  "notifications",
                  "emailNotifications",
                  e.target.checked
                )
              }
            >
              Enable Email Notifications
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={settings.notifications.systemAlerts}
              onChange={(e) =>
                handleSettingChange(
                  "notifications",
                  "systemAlerts",
                  e.target.checked
                )
              }
            >
              Enable System Alerts
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={settings.notifications.maintenanceAlerts}
              onChange={(e) =>
                handleSettingChange(
                  "notifications",
                  "maintenanceAlerts",
                  e.target.checked
                )
              }
            >
              Enable Maintenance Alerts
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={settings.notifications.securityAlerts}
              onChange={(e) =>
                handleSettingChange(
                  "notifications",
                  "securityAlerts",
                  e.target.checked
                )
              }
            >
              Enable Security Alerts
            </Checkbox>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SystemSettings;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FiSettings,
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
      console.log("Settings saved:", response.data);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organization Related Settings</h1>
        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <FiSave className="mr-2" /> Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FiGlobe className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Leave Settings</h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Leave Approval Flow
          </label>
          <select
            value={settings.leaveApproval.leaveApprovalFlow}
            onChange={(e) =>
              handleSettingChange(
                "leaveApproval",
                "leaveApprovalFlow",
                e.target.value
              )
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            <option value="manager_to_hr">
              Manager → HR (Two-step approval)
            </option>
            <option value="direct_to_hr">
              Directly to HR (One-step approval)
            </option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Annual Leave Quota (Days)
          </label>
          <input
            type="number"
            min="0"
            value={settings.leaveApproval.annualLeaveQuota}
            onChange={(e) =>
              handleSettingChange(
                "leaveApproval",
                "annualLeaveQuota",
                e.target.value
              )
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Leave Carry Forward */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={settings.leaveApproval.leaveCarryForward}
            onChange={(e) =>
              handleSettingChange(
                "leaveApproval",
                "leaveCarryForward",
                e.target.checked
              )
            }
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            Allow Leave Carry Forward
          </label>
        </div>

        {/* Probation Period Restriction */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={settings.leaveApproval.probationRestriction}
            onChange={(e) =>
              handleSettingChange(
                "leaveApproval",
                "probationRestriction",
                e.target.checked
              )
            }
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            Restrict Leaves During Probation
          </label>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FiGlobe className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">General Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={settings.general.companyName}
              onChange={(e) =>
                handleSettingChange("general", "companyName", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Timezone
            </label>
            <select
              value={settings.general.timezone}
              onChange={(e) =>
                handleSettingChange("general", "timezone", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            >
              <option value="UTC+00:00">UTC+00:00</option>
              <option value="UTC-05:00">UTC-05:00 (EST)</option>
              <option value="UTC-08:00">UTC-08:00 (PST)</option>
              <option value="UTC+01:00">UTC+01:00 (CET)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Format
            </label>
            <select
              value={settings.general.dateFormat}
              onChange={(e) =>
                handleSettingChange("general", "dateFormat", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            >
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <select
              value={settings.general.language}
              onChange={(e) =>
                handleSettingChange("general", "language", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FiMail className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Email Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              SMTP Server
            </label>
            <input
              type="text"
              value={settings.email.smtpServer}
              onChange={(e) =>
                handleSettingChange("email", "smtpServer", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              SMTP Port
            </label>
            <input
              type="text"
              value={settings.email.smtpPort}
              onChange={(e) =>
                handleSettingChange("email", "smtpPort", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              SMTP Username
            </label>
            <input
              type="text"
              value={settings.email.smtpUsername}
              onChange={(e) =>
                handleSettingChange("email", "smtpUsername", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email From Name
            </label>
            <input
              type="text"
              value={settings.email.emailFromName}
              onChange={(e) =>
                handleSettingChange("email", "emailFromName", e.target.value)
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password Expiry (days)
            </label>
            <input
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "passwordExpiry",
                  e.target.value
                )
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "sessionTimeout",
                  e.target.value
                )
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Login Attempts
            </label>
            <input
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "maxLoginAttempts",
                  e.target.value
                )
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Two-Factor Authentication
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) =>
                    handleSettingChange(
                      "security",
                      "twoFactorAuth",
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Enable Two-Factor Authentication for all users
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FiClock className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-medium">Notification Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.emailNotifications}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "emailNotifications",
                    e.target.checked
                  )
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                Enable Email Notifications
              </span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.systemAlerts}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "systemAlerts",
                    e.target.checked
                  )
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                Enable System Alerts
              </span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.maintenanceAlerts}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "maintenanceAlerts",
                    e.target.checked
                  )
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                Enable Maintenance Alerts
              </span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.securityAlerts}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "securityAlerts",
                    e.target.checked
                  )
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                Enable Security Alerts
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;

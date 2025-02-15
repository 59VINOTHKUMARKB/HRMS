import { useState } from "react";
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

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    general: {
      companyName: "HRMS System",
      timezone: "UTC+00:00",
      dateFormat: "YYYY-MM-DD",
      language: "English",
    },
    email: {
      smtpServer: "smtp.example.com",
      smtpPort: "587",
      smtpUsername: "notifications@example.com",
      emailFromName: "HRMS System",
    },
    security: {
      passwordExpiry: "90",
      sessionTimeout: "30",
      maxLoginAttempts: "5",
      twoFactorAuth: true,
    },
    notifications: {
      emailNotifications: true,
      systemAlerts: true,
      maintenanceAlerts: true,
      securityAlerts: true,
    },
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    // TODO: Implement settings save functionality
    console.log("Saving settings:", settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <FiSave className="mr-2" /> Save Changes
        </button>
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

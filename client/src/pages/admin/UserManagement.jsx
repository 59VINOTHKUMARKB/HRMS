import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Spin,
  Switch
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiEdit,
  FiPlus,
  FiSearch,
  FiTrash2
} from "react-icons/fi";
import { useUser } from "../../components/Layout";

const { Option } = Select;

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Organization & Department filters
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const isOrgAdmin = user?.role === "ORG_ADMIN";

  // Load organization list
  useEffect(() => {
    if (user?.role === "SUPER_ADMIN") {
      axios.get("/api/organizations").then(res => {
        if (res.data.success) setOrganizations(res.data.data);
      });
    } else if (user?.role === "ORG_ADMIN") {
      axios.get(`/api/organizations/${user.organizationId}`).then(res => {
        if (res.data.success) {
          setOrganizations([res.data.data]);
          setSelectedOrg(user.organizationId);
        }
      });
    }
  }, [user]);

  // Load departments for selected organization
  useEffect(() => {
    setSelectedDept("");
    if (selectedOrg) {
      axios.get(`/api/departments?organizationId=${selectedOrg}`).then(res => {
        if (res.data.success) setDepartments(res.data.data);
      });
    } else {
      setDepartments([]);
    }
  }, [selectedOrg]);

  const fetchUsers = async () => {
    try {
      setTableLoading(true);
      const response = await axios.get("/api/users");
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        notification.error({
          message: "Failed to Fetch Users",
          description: response.data.message || "Could not fetch users list",
          placement: "bottomRight",
          duration: 4,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      notification.error({
        message: "Error Fetching Users",
        description:
          error.response?.data?.message || "Failed to load users list",
        placement: "bottomRight",
        duration: 4,
      });
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users by search, organization, and department
  const filteredUsers = users.filter((targetUser) => {
    const matchesSearch =
      targetUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      targetUser.email.toLowerCase().includes(searchTerm.toLowerCase());
    // No org selected: only global admins
    if (!selectedOrg) {
      return (
        matchesSearch &&
        (targetUser.role === "SUPER_ADMIN" || targetUser.role === "ORG_ADMIN")
      );
    }
    // Filter by organization
    if (targetUser.organizationId !== selectedOrg) return false;
    // Filter by department if chosen
    if (selectedDept && targetUser.departmentId !== selectedDept) return false;
    return matchesSearch;
  });

  // Function to check if current user can edit target user
  const canEditUser = (targetUser) => {
    if (!user || !targetUser) {
      console.log("Missing user or targetUser:", { user, targetUser });
      return false;
    }

    console.log("Checking edit permissions:", {
      currentUserRole: user.role,
      targetUserRole: targetUser.role,
      currentUserOrg: user.organizationId,
      targetUserOrg: targetUser.organizationId,
    });

    // SUPER_ADMIN can edit anyone
    if (user.role === "SUPER_ADMIN") return true;

    // ORG_ADMIN can edit users in their organization except SUPER_ADMIN and ORG_ADMIN
    if (user.role === "ORG_ADMIN") {
      const canEdit =
        !["SUPER_ADMIN", "ORG_ADMIN"].includes(targetUser.role) &&
        targetUser.organizationId === user.organizationId &&
        targetUser.organizationId !== undefined;
      console.log("ORG_ADMIN edit permission:", canEdit);
      return canEdit;
    }

    return false;
  };

  // Function to check if current user can delete target user
  const canDeleteUser = (targetUser) => {
    if (!user || !targetUser) {
      console.log("Missing user or targetUser:", { user, targetUser });
      return false;
    }

    console.log("Checking delete permissions:", {
      currentUserRole: user.role,
      targetUserRole: targetUser.role,
      currentUserOrg: user.organizationId,
      targetUserOrg: targetUser.organizationId,
    });

    // SUPER_ADMIN can delete anyone except themselves
    if (user.role === "SUPER_ADMIN") return user.id !== targetUser.id;

    // ORG_ADMIN can delete users in their organization except SUPER_ADMIN, ORG_ADMIN, and themselves
    if (user.role === "ORG_ADMIN") {
      const canDelete =
        !["SUPER_ADMIN", "ORG_ADMIN"].includes(targetUser.role) &&
        targetUser.organizationId === user.organizationId &&
        targetUser.organizationId !== undefined &&
        user.id !== targetUser.id;
      console.log("ORG_ADMIN delete permission:", canDelete);
      return canDelete;
    }

    return false;
  };

  // Function to check if current user can update password of target user
  const canUpdatePassword = (targetUser) => {
    if (!user || !targetUser) return false;

    // SUPER_ADMIN can update anyone's password
    if (user.role === "SUPER_ADMIN") return true;

    // ORG_ADMIN can update passwords for users in their organization except SUPER_ADMIN and ORG_ADMIN
    if (user.role === "ORG_ADMIN") {
      return (
        !["SUPER_ADMIN", "ORG_ADMIN"].includes(targetUser.role) &&
        targetUser.organizationId === user.organizationId &&
        targetUser.organizationId !== undefined
      );
    }

    return false;
  };

  const handleEdit = (record) => {
    if (!canEditUser(record)) {
      notification.error({
        message: "Access Denied",
        description: "You don't have permission to edit this user.",
        placement: "bottomRight",
      });
      return;
    }

    setSelectedUser(record);
    setEditMode(true);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      role: record.role,
      isActive: record.isActive,
      organizationId: record.organizationId,
      departmentId: record.departmentId,
    });
    setOpen(true);
  };

  const showDeleteModal = (record) => {
    if (!canDeleteUser(record)) {
      notification.error({
        message: "Access Denied",
        description: "You don't have permission to delete this user.",
        placement: "bottomRight",
      });
      return;
    }
    setUserToDelete(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/users/${userToDelete.id}`);

      if (response.data.success) {
        notification.success({
          message: "User Deleted",
          description: "User has been successfully deleted.",
          placement: "bottomRight",
        });
        setDeleteModalVisible(false);
        setUserToDelete(null);
        fetchUsers();
      }
    } catch (error) {
      notification.error({
        message: "Delete Failed",
        description: error.response?.data?.message || "Failed to delete user.",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (values) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `/api/users/${selectedUser.id}/password`,
        {
          role: selectedUser.role,
          password: values.password,
        }
      );

      if (response.data.success) {
        notification.success({
          message: "Password Updated Successfully",
          description: "User password has been updated.",
          placement: "bottomRight",
          duration: 3,
        });
        setShowPasswordUpdate(false);
        form.resetFields(["password", "confirmPassword"]);
      }
    } catch (error) {
      notification.error({
        message: "Password Update Failed",
        description:
          error.response?.data?.message || "Failed to update password.",
        placement: "bottomRight",
        duration: 4,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { confirmPassword, ...userData } = values;

      // Format the role to match the AdminRole enum
      const formattedUserData = {
        ...userData,
        role: userData.role.toUpperCase(),
        organizationId: user.role === "SUPER_ADMIN" ? values.organizationId : user.organizationId,
        departmentId: values.departmentId || null,
      };
      console.log(formattedUserData);

      let response;
      if (editMode) {
        response = await axios.put(
          `/api/users/${selectedUser.id}`,
          formattedUserData
        );
      } else {
        response = await axios.post("/api/users", formattedUserData);
      }

      if (response.data.success) {
        notification.success({
          message: `User ${editMode ? "Updated" : "Added"} Successfully`,
          description: response.data.message,
          placement: "bottomRight",
          duration: 3,
        });

        setOpen(false);
        form.resetFields();
        fetchUsers();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        `Something went wrong while ${
          editMode ? "updating" : "adding"
        } the user.`;

      notification.error({
        message: `Error ${editMode ? "Updating" : "Adding"} User`,
        description: errorMessage,
        placement: "bottomRight",
        duration: 4,
      });

      if (error.response?.status === 400) {
        form.scrollToField(error.response.data.field);
      }
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setEditMode(false);
    setSelectedUser(null);
    form.resetFields();
    // Prefill organization if filtered
    if (user.role === "SUPER_ADMIN" && selectedOrg) {
      form.setFieldsValue({ organizationId: selectedOrg });
    }
    setOpen(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedUser(null);
    form.resetFields();
    setOpen(false);
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject("Please input your password!");
    }
    if (value.length < 8) {
      return Promise.reject("Password must be at least 8 characters!");
    }
    if (!/\d/.test(value)) {
      return Promise.reject("Password must contain at least one number!");
    }
    if (!/[a-zA-Z]/.test(value)) {
      return Promise.reject("Password must contain at least one letter!");
    }
    return Promise.resolve();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button type="primary" icon={<FiPlus />} onClick={showModal}>
          Add User
        </Button>
      </div>

      <Modal
        title={editMode ? "Edit User" : "Add User"}
        open={open}
        onCancel={handleCancel}
        width={600}
        centered
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          className=""
        >
          <div className="grid grid-cols-1">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please input user's full name!" },
                { min: 3, message: "Name must be at least 3 characters!" },
              ]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input user's email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>

            {/* Show password fields for new user or if user has permission to update password */}
            {(!editMode || (editMode && canUpdatePassword(selectedUser))) && (
              <div className="mt-2 mb-4">
                {editMode ? (
                  <Button
                    type="dashed"
                    onClick={() => {
                      form.resetFields(["password", "confirmPassword"]);
                      setShowPasswordUpdate(true);
                    }}
                    className="w-full"
                  >
                    Update Password
                  </Button>
                ) : (
                  <>
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[{ validator: validatePassword }]}
                      hasFeedback
                    >
                      <Input.Password placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      dependencies={["password"]}
                      rules={[
                        { required: true, message: "Please confirm password!" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject("Passwords do not match!");
                          },
                        }),
                      ]}
                      hasFeedback
                    >
                      <Input.Password placeholder="Confirm password" />
                    </Form.Item>
                  </>
                )}
              </div>
            )}

            {/* New Organization + Department fields */}
            {user.role === "SUPER_ADMIN" && (
              <Form.Item
                name="organizationId"
                label="Organization"
              >
                <Select
                  placeholder="Select organization"
                  onChange={(val) => setSelectedOrg(val)}
                >
                  {organizations.map((org) => (
                    <Option key={org.id} value={org.id}>
                      {org.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            {selectedOrg && (
              <Form.Item
                name="departmentId"
                label="Department (optional)"
              >
                <Select placeholder="Select department" allowClear>
                  {departments.map((dept) => (
                    <Option key={dept.id} value={dept.id}>
                      {dept.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select user role!" }]}
            >
              <Select placeholder="Select user role">
                {user.role === "SUPER_ADMIN" ? (
                  <>
                    <Option value="SUPER_ADMIN">Super Admin</Option>
                    <Option value="ORG_ADMIN">Organization Admin</Option>
                    <Option value="HR">HR</Option>
                    <Option value="MANAGER">Manager</Option>
                    <Option value="EMPLOYEE">Employee</Option>
                  </>
                ) : user.role === "ORG_ADMIN" ? (
                  <>
                    <Option value="HR">HR</Option>
                    <Option value="MANAGER">Manager</Option>
                    <Option value="EMPLOYEE">Employee</Option>
                  </>
                ) : null}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="isActive"
            label="Active Status"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editMode ? "Update" : "Add"} User
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Password Update Modal */}
      <Modal
        title="Update Password"
        open={showPasswordUpdate}
        onCancel={() => {
          setShowPasswordUpdate(false);
          form.resetFields(["password", "confirmPassword"]);
        }}
        footer={null}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handlePasswordUpdate}
          autoComplete="off"
        >
          <Form.Item
            name="password"
            label="New Password"
            rules={[{ validator: validatePassword }]}
            hasFeedback
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={() => setShowPasswordUpdate(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Password
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete User"
        open={deleteModalVisible}
        onCancel={() => {
          setDeleteModalVisible(false);
          setUserToDelete(null);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setDeleteModalVisible(false);
              setUserToDelete(null);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={loading}
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>,
        ]}
      >
        <div className="py-4">
          <h3 className="text-lg font-medium mb-2">
            Are you sure you want to delete this user?
          </h3>
          {userToDelete && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Name:</span> {userToDelete.name}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Email:</span> {userToDelete.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Role:</span> {userToDelete.role}
              </p>
            </div>
          )}
          <p className="text-red-600 mt-4 text-sm">
            This action cannot be undone. The user will be permanently deleted.
          </p>
        </div>
      </Modal>

      {/* Filters: Search, Organization, Department */}
      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {user.role === "SUPER_ADMIN" && (
          <Select
            placeholder="Organization"
            className="w-60"
            value={selectedOrg}
            onChange={(val) => setSelectedOrg(val)}
            allowClear
          >
            {organizations.map((org) => (
              <Option key={org.id} value={org.id}>
                {org.name}
              </Option>
            ))}
          </Select>
        )}
        {selectedOrg && (
          <Select
            placeholder="Department"
            className="w-60"
            value={selectedDept}
            onChange={(val) => setSelectedDept(val)}
            allowClear
          >
            {departments.map((dept) => (
              <Option key={dept.id} value={dept.id}>
                {dept.name}
              </Option>
            ))}
          </Select>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          {tableLoading ? (
            <div className="flex justify-center items-center py-8">
              <Spin size="large" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No users found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((targetUser) => (
                  <tr key={targetUser.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">
                              {targetUser.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {targetUser.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {targetUser.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          targetUser.role === "SUPER_ADMIN"
                            ? "bg-purple-100 text-purple-800"
                            : targetUser.role === "ORG_ADMIN"
                            ? "bg-blue-100 text-blue-800"
                            : targetUser.role === "HR"
                            ? "bg-green-100 text-green-800"
                            : targetUser.role === "MANAGER"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {targetUser.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          targetUser.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {targetUser.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {targetUser.lastLogin
                        ? new Date(targetUser.lastLogin).toLocaleString()
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {canEditUser(targetUser) && (
                        <button
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={() => handleEdit(targetUser)}
                        >
                          <FiEdit className="w-5 h-5" />
                        </button>
                      )}
                      {canDeleteUser(targetUser) && (
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => showDeleteModal(targetUser)}
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      ) }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

import { Button, Form, Input, Modal, notification, Switch, Table, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import { useUser } from "../../components/Layout";

// Set default axios config
axios.defaults.withCredentials = true;

// Add axios interceptor to handle unauthorized responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      notification.error({
        message: "Authentication Error",
        description: "Please log in to continue",
        placement: "bottomRight",
      });
    } else if (error.response?.status === 403) {
      notification.error({
        message: "Access Denied",
        description:
          error.response.data.message ||
          "You don't have permission for this action",
        placement: "bottomRight",
      });
    }
    return Promise.reject(error);
  }
);

const OrganizationManagement = () => {
  const [open, setOpen] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [admins, setAdmins] = useState([]);

  const { user } = useUser();
  const isOrgAdmin = user?.role === "ORG_ADMIN";

  // Fetch Organizations
  const fetchData = async () => {
    try {
      setTableLoading(true);

      if (isOrgAdmin) {
        // For ORG_ADMIN, fetch only their organization
        const response = await axios.get(
          `/api/organizations/${user.organizationId}`
        );
        if (response.data.success) {
          setOrganizations([response.data.data]);
        }
      } else {
        // For other roles, fetch all organizations
        const response = await axios.get("/api/organizations");
        if (response.data.success) {
          setOrganizations(response.data.data);
        }
      }
    } catch (error) {
      notification.error({
        message: "Error Fetching Data",
        description: error.response?.data?.message || "Could not fetch data",
        placement: "bottomRight",
      });
    } finally {
      setTableLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("/api/users");
      if (response.data.success) {
        const adminList = response.data.data.filter((u) => u.role === "ORG_ADMIN");
        setAdmins(adminList);
      }
    } catch (error) {
      notification.error({
        message: "Error Fetching Admins",
        description: error.response?.data?.message || "Could not fetch admins",
        placement: "bottomRight",
      });
    }
  };

  useEffect(() => {
    fetchData();
    fetchAdmins();
  }, []);

  const handleEdit = (organization) => {
    setSelectedOrganization(organization);
    setEditMode(true);
    form.setFieldsValue({
      name: organization.name,
      code: organization.code,
      description: organization.description,
      isActive: organization.isActive,
      adminId: organization.admins?.[0]?.id,
    });
    setOpen(true);
  };

  const showDeleteModal = (organization) => {
    setOrganizationToDelete(organization);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/organizations/${organizationToDelete.id}`
      );

      if (response.data.success) {
        notification.success({
          message: "Organization Deleted",
          description: "Organization has been successfully deleted.",
          placement: "bottomRight",
        });
        setDeleteModalVisible(false);
        setOrganizationToDelete(null);
        fetchData();
      }
    } catch (error) {
      notification.error({
        message: "Delete Failed",
        description:
          error.response?.data?.message || "Failed to delete organization.",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let response;

      // Validate organization code format
      if (!/^[A-Z0-9-_]+$/.test(values.code)) {
        notification.error({
          message: "Invalid Organization Code",
          description:
            "Code must contain only uppercase letters, numbers, hyphens, and underscores",
          placement: "bottomRight",
        });
        return;
      }

      // Check if code already exists (for new organizations)
      if (!editMode) {
        const existingOrg = organizations.find(
          (org) => org.code === values.code
        );
        if (existingOrg) {
          notification.error({
            message: "Duplicate Organization Code",
            description: "An organization with this code already exists",
            placement: "bottomRight",
          });
          return;
        }
      }

      if (editMode) {
        response = await axios.put(
          `/api/organizations/${selectedOrganization.id}`,
          {
            ...values,
            isActive: values.isActive ?? selectedOrganization.isActive,
          }
        );
      } else {
        response = await axios.post("/api/organizations", {
          ...values,
          isActive: values.isActive ?? true,
        });
      }

      if (response.data.success) {
        const orgId = editMode ? selectedOrganization.id : response.data.data.id;
        if (values.adminId) {
          try {
            await axios.post(`/api/organizations/${orgId}/admin`, {
              adminId: values.adminId,
            });
          } catch (err) {
            notification.error({
              message: "Error Assigning Admin",
              description:
                err.response?.data?.message || "Failed to assign admin",
              placement: "bottomRight",
            });
            return;
          }
        }

        notification.success({
          message: `Organization ${
            editMode ? "Updated" : "Added"
          } Successfully`,
          description: response.data.message,
          placement: "bottomRight",
        });

        setOpen(false);
        form.resetFields();
        fetchData();
      }
    } catch (error) {
      notification.error({
        message: `Error ${editMode ? "Updating" : "Adding"} Organization`,
        description: error.response?.data?.message || "Something went wrong",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setEditMode(false);
    setSelectedOrganization(null);
    form.resetFields();
    setOpen(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedOrganization(null);
    form.resetFields();
    setOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div className="flex items-center gap-2">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <div className="flex items-center gap-2">
          {isActive ? (
            <FiCheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <FiXCircle className="w-5 h-5 text-red-500" />
          )}
          <span>{isActive ? "Active" : "Inactive"}</span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button
            className="p-2 text-blue-600 hover:text-blue-900"
            onClick={() => handleEdit(record)}
          >
            <FiEdit2 className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-red-600 hover:text-red-900"
            onClick={() => showDeleteModal(record)}
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {!isOrgAdmin ? (
          <h1 className="text-2xl font-bold">Organization Management</h1>
        ) : (
          <h1 className="text-2xl font-bold">Your Organization</h1>
        )}
        {!isOrgAdmin && (
          <Button
            type="primary"
            onClick={showModal}
            icon={<FiPlus className="mr-2" />}
          >
            Add Organization
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            label: isOrgAdmin ? "Organization Details" : "Total Organizations",
            value: isOrgAdmin ? organizations[0]?.name : organizations.length,
            icon: FiCheckCircle,
            color: "blue",
          },
          {
            label: "Status",
            value: organizations[0]?.isActive ? "Active" : "Inactive",
            icon: FiCheckCircle,
            color: organizations[0]?.isActive ? "green" : "red",
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

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns.filter((col) => {
            // Remove actions column for ORG_ADMIN
            if (isOrgAdmin && col.key === "actions") return false;
            return true;
          })}
          dataSource={organizations}
          rowKey="id"
          loading={tableLoading}
          pagination={
            !isOrgAdmin
              ? {
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} organizations`,
                }
              : false
          }
        />
      </div>

      {/* Add/Edit Organization Modal - Only show for non-ORG_ADMIN users */}
      {!isOrgAdmin && (
        <Modal
          title={editMode ? "Edit Organization" : "Add Organization"}
          open={open}
          onCancel={handleCancel}
          width={600}
          centered
          footer={null}
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
            initialValues={{
              isActive: true,
            }}
          >
            <Form.Item
              name="name"
              label="Organization Name"
              rules={[
                { required: true, message: "Please input organization name!" },
                { min: 3, message: "Name must be at least 3 characters!" },
                { max: 100, message: "Name cannot exceed 100 characters!" },
              ]}
            >
              <Input
                placeholder="Enter organization name"
                maxLength={100}
                showCount
              />
            </Form.Item>

            <Form.Item
              name="code"
              label="Organization Code"
              rules={[
                { required: true, message: "Please input organization code!" },
                {
                  pattern: /^[A-Z0-9-_]+$/,
                  message:
                    "Code must contain only uppercase letters, numbers, hyphens, and underscores",
                },
                { min: 3, message: "Code must be at least 3 characters!" },
                { max: 20, message: "Code cannot exceed 20 characters!" },
              ]}
            >
              <Input
                placeholder="Enter organization code (e.g., ORG-001)"
                maxLength={20}
                showCount
                disabled={editMode}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  max: 500,
                  message: "Description cannot exceed 500 characters!",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter organization description"
                maxLength={500}
                showCount
                rows={4}
              />
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Active Status"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="adminId"
              label="Assign Admin"
            >
              <Select
                placeholder="Select an admin"
                options={admins.map((admin) => ({
                  value: admin.id,
                  label: admin.name,
                }))}
              />
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                {editMode ? "Update" : "Add"} Organization
              </Button>
            </div>
          </Form>
        </Modal>
      )}

      {/* Delete Confirmation Modal - Only show for non-ORG_ADMIN users */}
      {!isOrgAdmin && (
        <Modal
          title="Delete Organization"
          open={deleteModalVisible}
          onCancel={() => {
            setDeleteModalVisible(false);
            setOrganizationToDelete(null);
          }}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setDeleteModalVisible(false);
                setOrganizationToDelete(null);
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
              Are you sure you want to delete this organization?
            </h3>
            {organizationToDelete && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Name:</span>{" "}
                  {organizationToDelete.name}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Code:</span>{" "}
                  {organizationToDelete.code}
                </p>
              </div>
            )}
            <p className="text-red-600 mt-4 text-sm">
              This action cannot be undone.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrganizationManagement;

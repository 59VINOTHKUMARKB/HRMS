import {
  createOrganizationAction,
  getAllOrganizationsAction,
  getOrganizationHierarchyAction,
  getOrganizationByIdAction,
  updateOrganizationAction,
  deleteOrganizationAction,
} from "../actions/organization.action.js";

// Create a new organization
export const createOrganization = async (req, res) => {
  try {
    const result = await createOrganizationAction(req.body);
    if (result.success) {
      res.status(201).json({
        success: true,
        message: "Organization created successfully",
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all organizations
export const getAllOrganizations = async (req, res) => {
  try {
    const result = await getAllOrganizationsAction();
    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get organization hierarchy
export const getOrganizationHierarchy = async (req, res) => {
  try {
    const result = await getOrganizationHierarchyAction();
    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get organization by ID
export const getOrganizationById = async (req, res) => {
  try {
    const result = await getOrganizationByIdAction(req.params.id);
    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update organization
export const updateOrganization = async (req, res) => {
  try {
    const result = await updateOrganizationAction(req.params.id, req.body);
    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Organization updated successfully",
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete organization
export const deleteOrganization = async (req, res) => {
  try {
    const result = await deleteOrganizationAction(req.params.id);
    if (result.success) {
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Assign organization admin
export const assignOrganizationAdmin = async (req, res) => {
  try {
    const result = await assignOrganizationAdminAction(
      req.params.id,
      req.body.adminId
    );
    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Admin assigned successfully",
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add user to organization
export const addOrganizationUser = async (req, res) => {
  try {
    const result = await addOrganizationUserAction(
      req.params.id,
      req.body.userId
    );
    if (result.success) {
      res.status(200).json({
        success: true,
        message: "User added successfully",
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Remove user from organization
export const removeOrganizationUser = async (req, res) => {
  try {
    const result = await removeOrganizationUserAction(
      req.params.id,
      req.params.userId
    );
    if (result.success) {
      res.status(200).json({
        success: true,
        message: "User removed successfully",
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

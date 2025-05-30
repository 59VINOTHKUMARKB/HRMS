import {
  createNewDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartmentById,
  deleteDepartmentById,
  getDepartmentTree,
  assignHead,
  addMember,
  removeMember,
} from "../actions/department.action.js";

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
export const getDepartments = async (req, res, next) => {
  try {
    const { search, isActive, parentId, organizationId } = req.query;
    const departments = await getAllDepartments({ search, isActive, parentId, organizationId });
    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get department hierarchy
// @route   GET /api/departments/hierarchy
// @access  Private
export const getDepartmentHierarchy = async (req, res, next) => {
  try {
    const hierarchy = await getDepartmentTree();
    res.status(200).json({
      success: true,
      data: hierarchy,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get department by ID
// @route   GET /api/departments/:id
// @access  Private
export const getDepartmentById = async (req, res, next) => {
  try {
    const department = await getDepartment(req.params.id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }
    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new department
// @route   POST /api/departments
// @access  Private (Admin only)
export const createDepartment = async (req, res, next) => {
  try {
    const department = await createNewDepartment(req.body);
    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Department with this code already exists",
      });
    }
    next(error);
  }
};

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private (Admin only)
export const updateDepartment = async (req, res, next) => {
  try {
    const department = await updateDepartmentById(req.params.id, req.body);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Department with this code already exists",
      });
    }
    next(error);
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private (Super Admin only)
export const deleteDepartment = async (req, res, next) => {
  try {
    const result = await deleteDepartmentById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign department head
// @route   POST /api/departments/:id/head
// @access  Private (Admin only)
export const assignDepartmentHead = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const department = await assignHead(req.params.id, userId);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Department head assigned successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add member to department
// @route   POST /api/departments/:id/members
// @access  Private (Admin, HR only)
export const addDepartmentMember = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const department = await addMember(req.params.id, userId);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Member added to department successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove member from department
// @route   DELETE /api/departments/:id/members/:userId
// @access  Private (Admin, HR only)
export const removeDepartmentMember = async (req, res, next) => {
  try {
    const department = await removeMember(req.params.id, req.params.userId);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Member removed from department successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

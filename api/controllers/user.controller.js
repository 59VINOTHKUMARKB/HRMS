import {
  getAllUsers,
  getUser,
  createNewUser,
  createNewAdmin,
  updateUser,
  deleteUser,
  updateUserPassword,
  updateAdminPassword,
  getUserByEmail,
  getAdminByEmail,
} from "../actions/user.action.js";
import db from "../prisma/prisma.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only)
export const getUsers = async (req, res, next) => {
  try {
    const { users, admins } = await getAllUsers();
    const allUsers = [...users, ...admins];
    res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Private (Admin only)
export const createUser = async (req, res, next) => {
  console.log("CREATING USER",req.body);
  try {
    const { email, role } = req.body;

    // Check for existing user/admin
    const existingUser = await getUserByEmail(email);
    const existingAdmin = await getAdminByEmail(email);

    if (existingUser || existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Determine if creating admin or regular user
    const isAdminRole = role === "SUPER_ADMIN" || role === "ORG_ADMIN";

    try {
      const newUser = isAdminRole
        ? await createNewAdmin(req.body)
        : await createNewUser(req.body);

      res.status(201).json({
        success: true,
        message: `${isAdminRole ? "Admin" : "User"} created successfully`,
        data: newUser,
      });
    } catch (error) {
      if (error.message === "Invalid admin role") {
        return res.status(400).json({
          success: false,
          message: "Invalid role selected",
        });
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new admin user
// @route   POST /api/users/admin
// @access  Private (Super Admin only)
export const createAdmin = async (req, res, next) => {
  try {
    const newAdmin = await createNewAdmin(req.body);
    res.status(201).json({
      success: true,
      data: newAdmin,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private
export const updateUserById = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user by ID
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
export const deleteUserById = async (req, res, next) => {
  try {
    const result = await deleteUser(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user password by ID
// @route   PUT /api/users/:id/password
// @access  Private
export const updateUserPasswordById = async (req, res, next) => {
  try {
    const { role } = req.body;
    const isAdmin = role === "SUPER_ADMIN" || role === "ORG_ADMIN";
    const updatedUser = isAdmin
      ? await updateAdminPassword(req.params.id, req.body.password)
      : await updateUserPassword(req.params.id, req.body.password);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employees
// @route   GET /api/users/getEmployees
// @access  Private (Admin only)
export const getEmployees = async (req, res, next) => {
  const { role, departmentId, hrId, organizationId: orgId } = req.query;
  console.log("Cur user Dept id backend", departmentId);
  try {
    // Scope to organization: SUPER_ADMIN can fetch across all if no orgId provided
    let where = {};
    if (req.user.role === 'SUPER_ADMIN') {
      if (orgId) {
        where.organizationId = orgId;
      }
      // if no orgId for SUPER_ADMIN, skip organization filter
    } else {
      // Other roles are scoped to their organization
      where.organizationId = req.user.organizationId;
    }
    // Role-specific scoping
    if (req.user.role === 'MANAGER') {
      // Managers see only team members
      where.team = { managerId: req.user.id };
    } else if (req.user.role === 'SUPER_ADMIN' || req.user.role === 'ORG_ADMIN') {
      // Super admins and org admins can filter by HR
      if (hrId) where.hrAssignedId = hrId;
    } else if (req.user.role === 'HR') {
      // HRs see employees and managers in their department
      where.departmentId = req.user.departmentId;
      where.role = { in: ['EMPLOYEE', 'MANAGER'] };
    }
    if (role) where.role = role;
    if (departmentId) where.departmentId = departmentId;
    const employees = await db.user.findMany({
      where,
      include: {
        department: true,
        team: true,
      },
    });
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    next(error);
  }
};

// Add manager available employees endpoint
export const getAvailableEmployees = async (req, res, next) => {
  try {
    const manager = req.user;
    if (!manager.departmentId) {
      return res.status(400).json({ success: false, message: 'Manager has no department assigned' });
    }
    const available = await db.user.findMany({
      where: {
        organizationId: manager.organizationId,
        departmentId: manager.departmentId,
        role: 'EMPLOYEE',
        managerAssignedId: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        departmentId: true,
      }
    });
    res.status(200).json({ success: true, data: available });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employees in manager's department unassigned to any team
// @route   GET /api/users/departmentEmployees
// @access  Private (Manager only)
export const getDepartmentEmployees = async (req, res, next) => {
  try {
    const deptId = req.user.departmentId;
    if (!deptId) {
      return res.status(400).json({ success: false, message: 'No department assigned' });
    }
    const employees = await db.user.findMany({
      where: {
        organizationId: req.user.organizationId,
        departmentId: deptId,
        role: 'EMPLOYEE',
        teamId: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    next(error);
  }
};

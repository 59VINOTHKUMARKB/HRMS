import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  createAdmin,
  updateUserById,
  updateUserPasswordById,
  deleteUserById,
  getEmployees,
} from "../controllers/user.controller.js";
import {
  getEmployeeProfile,
  getHRProfile,
  getManagerProfile,
} from "../actions/user.action.js";
import { verifyToken } from "../middleware/verifyUser.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Private (Admin only)
router.get("/", getUsers);


// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get("/getUserById/:id", getUserById);

// @route   POST /api/users
// @desc    Create a new user
// @access  Private (Admin only)
router.post("/", createUser);

// @route   POST /api/users/admin
// @desc    Create a new admin user
// @access  Private (Super Admin only)
router.post("/admin", createAdmin);

// @route   PUT /api/users/:id
// @desc    Update user by ID
// @access  Private
router.put("/:id", updateUserById);

// @route   DELETE /api/users/:id
// @desc    Delete user by ID
// @access  Private (Admin only)
router.delete("/:id", deleteUserById);

// @route   PUT /api/users/:id/password
// @desc    Update user password by ID
// @access  Private
router.put("/:id/password", updateUserPasswordById);

router.get("/profile/hr/:id", getHRProfile);

router.get("/profile/manager/:id", getManagerProfile);

router.get("/profile/employee/:id", getEmployeeProfile);


// @route   GET /api/users/getEmployees
// @desc    Get employees for HR, Org Admin, Super Admin
// @access  Private (HR, Org Admin, Super Admin)
router.get(
  "/getEmployees",
  verifyToken,
  authorizeRoles(["HR", "ORG_ADMIN", "SUPER_ADMIN"]),
  getEmployees
);


export default router;

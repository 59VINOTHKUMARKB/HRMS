import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  createAdmin,
  updateUserById,
  deleteUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Private (Admin only)
router.get("/", getUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get("/:id", getUserById);

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

export default router;

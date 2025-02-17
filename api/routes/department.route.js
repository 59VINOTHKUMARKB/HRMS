import express from "express";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  getDepartmentHierarchy,
  assignDepartmentHead,
  addDepartmentMember,
  removeDepartmentMember,
} from "../controllers/department.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

// Get all departments with optional filters
router.get(
  "/",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ADMIN", "HR"]),
  getDepartments
);

// Get department hierarchy
router.get(
  "/hierarchy",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ADMIN", "HR"]),
  getDepartmentHierarchy
);

// Get specific department by ID
router.get(
  "/:id",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ADMIN", "HR"]),
  getDepartmentById
);

// Create new department (Admin, Super Admin only)
router.post(
  "/",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ADMIN"]),
  createDepartment
);

// Update department (Admin, Super Admin only)
router.put(
  "/:id",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ADMIN"]),
  updateDepartment
);

// Delete department (Super Admin only)
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN"]),
  deleteDepartment
);

// Assign department head (Admin, Super Admin only)
router.post(
  "/:id/head",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ADMIN"]),
  assignDepartmentHead
);

// Add member to department (Admin, Super Admin, HR only)
router.post(
  "/:id/members",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ADMIN", "HR"]),
  addDepartmentMember
);

// Remove member from department (Admin, Super Admin, HR only)
router.delete(
  "/:id/members/:userId",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ADMIN", "HR"]),
  removeDepartmentMember
);

export default router;

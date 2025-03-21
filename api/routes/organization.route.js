import express from "express";
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  getOrganizationHierarchy,
  assignOrganizationAdmin,
  addOrganizationUser,
  removeOrganizationUser,
  setOrganizationSettings,
  getOrganizationSettings,
} from "../controllers/organization.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

// Get all organizations with optional filters
router.get(
  "/",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ORG_ADMIN"]),
  getAllOrganizations
);

// Get organization hierarchy
router.get(
  "/hierarchy",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ORG_ADMIN"]),
  getOrganizationHierarchy
);

// Get specific organization by ID
router.get(
  "/:id",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ORG_ADMIN"]),
  getOrganizationById
);

// Create new organization (Super Admin only)
router.post(
  "/",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN"]),
  createOrganization
);

// Update organization (Super Admin, Org Admin only)
router.put(
  "/:id",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ORG_ADMIN"]),
  updateOrganization
);

// Delete organization (Super Admin only)
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN"]),
  deleteOrganization
);

// Assign organization admin (Super Admin only)
router.post(
  "/:id/admin",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN"]),
  assignOrganizationAdmin
);

// Add user to organization (Super Admin, Org Admin only)
router.post(
  "/:id/users",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ORG_ADMIN"]),
  addOrganizationUser
);

// Remove user from organization (Super Admin, Org Admin only)
router.delete(
  "/:id/users/:userId",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ORG_ADMIN"]),
  removeOrganizationUser
);

// Saving Organization settings (Super Admin, Org Admin only)
router.put(
  "/:id/settings",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ORG_ADMIN"]),
  setOrganizationSettings
);

// Fetch Organization settings (Super Admin, Org Admin only)
router.get(
  "/:id/settings",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN", "ORG_ADMIN"]),
  getOrganizationSettings
);

export default router;

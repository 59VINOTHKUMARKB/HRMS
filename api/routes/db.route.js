import express from "express";
import {
  getDatabaseStats,
  getDatabaseOperations,
  performBackup,
  toggleMaintenanceMode,
} from "../controllers/db.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Get database statistics
router.get(
  "/stats",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN"]),
  getDatabaseStats
);

// Get recent operations
router.get(
  "/operations",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN"]),
  getDatabaseOperations
);

// Trigger backup
router.post(
  "/backup",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN"]),
  performBackup
);

// Toggle maintenance mode
router.post(
  "/maintenance",
  verifyToken,
  authorizeRoles(["SUPER_ADMIN"]),
  toggleMaintenanceMode
);

export default router;

import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  recordAttendance,
  getAttendance,
  getUserAttendance,
  updateAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

// Record attendance (HR & Manager)
router.post(
  "/",
  verifyToken,
  authorizeRoles(["HR", "MANAGER"]),
  recordAttendance
);

// Get attendance for a given date (HR & Manager)
router.get(
  "/",
  verifyToken,
  authorizeRoles(["HR", "MANAGER", "ORG_ADMIN", "SUPER_ADMIN"]),
  getAttendance
);

// Get user attendance (Employee can view own)
router.get(
  "/user/:userId",
  verifyToken,
  getUserAttendance
);

// Update attendance record (HR & Manager)
router.put(
  "/:id",
  verifyToken,
  authorizeRoles(["HR", "MANAGER"]),
  updateAttendance
);

export default router; 
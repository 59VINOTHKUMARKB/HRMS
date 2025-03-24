import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  requestLeave,
  getLeaveRequests,
  getUserLeaves,
  approveLeave,
  rejectLeave,
  getLeaveById,
  cancelLeave,
  getLeaveBalance,
} from "../controllers/leave.controller.js";

const router = express.Router();

// Employee/Manager/HR can request leave
router.post(
  "/",
  verifyToken,
  authorizeRoles(["HR", "EMPLOYEE", "MANAGER"]),
  requestLeave
);

// Get all leave requests (HR & Manager only)
router.get(
  "/",
  verifyToken,
  authorizeRoles(["HR", "MANAGER"]),
  getLeaveRequests
);

// Get leave requests for a specific user (Employee can view their own)
router.get("/user/:userId", verifyToken, getUserLeaves);

// Get a single leave request by ID
router.get("/:leaveId", verifyToken, getLeaveById);

// Approve leave (Only Manager & HR based on approval flow)
router.put(
  "/:leaveId/approve",
  verifyToken,
  authorizeRoles(["MANAGER", "HR"]),
  approveLeave
);

// Reject leave (Only Manager & HR based on approval flow)
router.put(
  "/:leaveId/reject",
  verifyToken,
  authorizeRoles(["MANAGER", "HR"]),
  rejectLeave
);

// Cancel a leave request (Only the user who requested it)
router.delete("/:leaveId", verifyToken, cancelLeave);

router.get("/balance/:userId", verifyToken, getLeaveBalance);

export default router;

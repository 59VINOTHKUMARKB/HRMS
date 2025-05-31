import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/team.controller.js";

const router = express.Router();

// Get teams for a department (HR and Manager)
router.get(
  "/",
  verifyToken,
  authorizeRoles(["HR", "MANAGER", "ORG_ADMIN", "SUPER_ADMIN"]),
  getTeams
);

// Create new team
router.post(
  "/",
  verifyToken,
  authorizeRoles(["HR"]),
  createTeam
);

// Update team
router.put(
  "/:id",
  verifyToken,
  authorizeRoles(["HR", "MANAGER"]),
  updateTeam
);

// Delete team
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles(["HR"]),
  deleteTeam
);

export default router; 
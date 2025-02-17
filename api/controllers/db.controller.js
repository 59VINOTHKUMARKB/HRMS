import {
  getStats,
  getOperations,
  backup,
  toggleMaintenance,
} from "../actions/db.action.js";
import fs from "fs";

// @desc    Get database statistics
// @route   GET /api/db/stats
// @access  Private (Super Admin only)
export const getDatabaseStats = async (req, res, next) => {
  try {
    const stats = await getStats();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get database operations
// @route   GET /api/db/operations
// @access  Private (Super Admin only)
export const getDatabaseOperations = async (req, res, next) => {
  try {
    const operations = await getOperations();
    res.status(200).json({
      success: true,
      data: operations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Perform database backup
// @route   POST /api/db/backup
// @access  Private (Super Admin only)
export const performBackup = async (req, res, next) => {
  try {
    const result = await backup();

    // If download parameter is true, send the file
    if (req.query.download === "true") {
      const fileContent = result.data;
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=backup-${new Date().toISOString()}.json`
      );
      return res.status(200).json(fileContent);
    }

    // Otherwise just send the success message
    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        path: result.path,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle maintenance mode
// @route   POST /api/db/maintenance
// @access  Private (Super Admin only)
export const toggleMaintenanceMode = async (req, res, next) => {
  try {
    const { enable } = req.body;
    const result = await toggleMaintenance(enable);
    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        maintenance: result.maintenance,
      },
    });
  } catch (error) {
    next(error);
  }
};

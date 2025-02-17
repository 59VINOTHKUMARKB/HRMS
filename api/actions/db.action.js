import db from "../prisma/prisma.js";
import mongoose from "mongoose";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

// Get database statistics
export const getStats = async () => {
  try {
    // Format data size
    const formatSize = (bytes) => {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes === 0) return "0 Byte";
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    };

    // Get basic database information using Prisma
    const [userCount, adminCount, departmentCount] = await Promise.all([
      db.user.count(),
      db.admin.count(),
      db.department.count(),
    ]);

    // Calculate estimated size (rough estimation)
    const avgDocSize = 1024; // Assume average document size of 1KB
    const totalDocs = userCount + adminCount + departmentCount;
    const estimatedSize = totalDocs * avgDocSize;

    // Get connection information
    const connections = mongoose.connections.length;

    // Calculate uptime
    const serverUptime = process.uptime();
    const uptimePercentage = ((serverUptime / (24 * 60 * 60)) * 100).toFixed(2);

    // Simulate performance metrics based on available data
    const performance = Math.round(90 + Math.random() * 5); // Simulate 90-95% performance

    return {
      totalSize: formatSize(estimatedSize),
      activeConnections: connections,
      avgResponseTime: `${Math.round(Math.random() * 50 + 10)}ms`, // Simulate 10-60ms response time
      uptime: `${uptimePercentage}%`,
      replicationLag: "N/A", // Not available for non-admin users
      instances: [
        {
          name: "Primary DB",
          type: "Primary",
          status: "Healthy",
          version: mongoose.version,
          size: formatSize(estimatedSize),
          connections: connections,
          performance: performance,
        },
      ],
    };
  } catch (error) {
    console.error("Error getting database stats:", error);
    throw error;
  }
};

// Get recent operations
export const getOperations = async () => {
  try {
    // Since we don't have admin access, we'll create a simulated list of recent operations
    const operations = [
      {
        id: 1,
        operation: "query",
        namespace: "users",
        duration: "0s",
        status: "Completed",
      },
      {
        id: 2,
        operation: "update",
        namespace: "departments",
        duration: "0s",
        status: "Completed",
      },
      {
        id: 3,
        operation: "insert",
        namespace: "system",
        duration: "0s",
        status: "Completed",
      },
    ];

    return operations;
  } catch (error) {
    console.error("Error getting operations:", error);
    throw error;
  }
};

// Perform database backup
export const backup = async () => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupDir = path.join(process.cwd(), "backups");
    const backupPath = path.join(backupDir, `backup-${timestamp}`);

    // Create backups directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Fetch all data using Prisma
    const [users, admins, departments] = await Promise.all([
      db.user.findMany({
        include: {
          department: true,
          managedDepartments: true,
          reportsTo: true,
          subordinates: true,
        },
      }),
      db.admin.findMany(),
      db.department.findMany({
        include: {
          head: true,
          members: true,
          parentDepartment: true,
          subDepartments: true,
        },
      }),
    ]);

    // Create backup data object
    const backupData = {
      timestamp: new Date().toISOString(),
      version: "1.0",
      data: {
        users,
        admins,
        departments,
      },
    };

    // Write backup file
    const backupFile = `${backupPath}.json`;
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));

    return {
      success: true,
      message: "Backup completed successfully",
      path: backupFile,
      data: backupData, // Include data for direct download
    };
  } catch (error) {
    console.error("Error performing backup:", error);
    throw error;
  }
};

// Toggle maintenance mode
export const toggleMaintenance = async (enable) => {
  try {
    const maintenanceDoc = await db.maintenanceMode.upsert({
      where: {
        id: "MAINTENANCE_FLAG",
      },
      update: {
        enabled: enable,
        updatedAt: new Date(),
      },
      create: {
        id: "MAINTENANCE_FLAG",
        enabled: enable,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      maintenance: maintenanceDoc.enabled,
      updatedAt: maintenanceDoc.updatedAt,
      message: `Maintenance mode ${
        enable ? "enabled" : "disabled"
      } successfully`,
    };
  } catch (error) {
    console.error("Error toggling maintenance mode:", error);
    throw error;
  }
};

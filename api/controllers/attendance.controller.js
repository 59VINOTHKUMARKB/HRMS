import db from "../prisma/prisma.js";
import { Prisma } from "@prisma/client";

// Record or update attendance for a user on a given date
export const recordAttendance = async (req, res, next) => {
  try {
    const { userId, status, date } = req.body;
    if (!["PRESENT", "ABSENT", "LATE"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0);
    const attendance = await db.attendance.upsert({
      where: { userId_date: { userId, date: attendanceDate } },
      create: {
        userId,
        organizationId: req.user.organizationId,
        status,
        date: attendanceDate,
        recordedById: req.user.id,
      },
      update: {
        status,
        recordedById: req.user.id,
      },
    });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

// Get attendance records for HR or Manager scoped to their employees
export const getAttendance = async (req, res, next) => {
  try {
    const { date, startDate, endDate } = req.query;
    const where = { organizationId: req.user.organizationId };

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (date) {
      const attendanceDate = new Date(date);
      attendanceDate.setHours(0, 0, 0, 0);
      where.date = attendanceDate;
    }

    // Only managers should be scoped to their team members
    if (req.user.role === "MANAGER") {
      where.user = { managerAssignedId: req.user.id };
    }
    const records = await db.attendance.findMany({
      where,
      include: { user: true, recordedBy: true },
    });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

// Get attendance records for a specific user (Employee view)
export const getUserAttendance = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (req.user.role === "EMPLOYEE" && req.user.id !== userId) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const records = await db.attendance.findMany({
      where: { userId, organizationId: req.user.organizationId },
      orderBy: { date: "desc" },
    });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

// Update an existing attendance record
export const updateAttendance = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    if (!["PRESENT", "ABSENT", "LATE"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const attendance = await db.attendance.update({
      where: { id },
      data: { status, recordedById: req.user.id },
    });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
}; 
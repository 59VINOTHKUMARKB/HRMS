import db from "../prisma/prisma.js";

export const requestLeave = async (req, res) => {
  try {
    const {
      userId,
      organizationId,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
    } = req.body;
    if (
      !userId ||
      !organizationId ||
      !leaveType ||
      !startDate ||
      !endDate ||
      !totalDays
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields. Please provide all necessary details.",
      });
    }
    const existingLeave = await db.leaveRequest.findFirst({
      where: {
        userId,
        OR: [
          {
            startDate: { lte: new Date(endDate) },
            endDate: { gte: new Date(startDate) },
          },
        ],
      },
    });
    if (existingLeave) {
      return res.status(400).json({
        success: false,
        message: "You have already requested leave for this date range.",
      });
    }
    const leaveRequest = await db.leaveRequest.create({
      data: {
        userId,
        organizationId,
        leaveType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalDays,
        reason,
        status: "PENDING",
      },
    });
    return res.status(201).json({
      success: true,
      message: "Leave request submitted successfully.",
      data: leaveRequest,
    });
  } catch (error) {
    console.error("Error creating leave request:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get all leave requests for the organization (and HR)
// @route   GET /api/leave
// @access  Private (HR, Manager)
export const getLeaveRequests = async (req, res) => {
  try {
    const orgId = req.user.organizationId;
    if (!orgId) {
      return res.status(400).json({ success: false, message: 'Organization ID missing' });
    }
    // Fetch all leave requests in this org
    const leaveRequests = await db.leaveRequest.findMany({
      where: { organizationId: orgId },
      include: { user: { select: { id: true, name: true, departmentId: true } } },
      orderBy: { startDate: 'desc' },
    });
    return res.status(200).json({ success: true, data: leaveRequests });
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

export const getUserLeaves = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }
    const leaveRequests = await db.leaveRequest.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    });

    return res.status(200).json({
      success: true,
      data: leaveRequests,
    });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const approveLeave = async (req, res) => {};

export const rejectLeave = async (req, res) => {};

export const getLeaveById = async (req, res) => {};

export const cancelLeave = async (req, res) => {};

export const getLeaveBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const leaveLimits = {
      ANNUAL: 21,
      SICK: 10,
      PERSONAL: 6,
      UNPAID: "No Limit", 
    };

   const approvedLeaves = await db.leaveRequest.findMany({
      where: { userId, status: "APPROVED" },
    });

    const leaveUsage = approvedLeaves.reduce((acc, leave) => {
      acc[leave.leaveType] = (acc[leave.leaveType] || 0) + leave.totalDays;
      return acc;
    }, {});

    const leaveBalance = Object.keys(leaveLimits).map((type) => {
      const total = leaveLimits[type];
      const used = leaveUsage[type] || 0;
      return {
        type,
        total,
        used,
        remaining: total === "No Limit" ? "-" : Math.max(total - used, 0),
      };
    });

    return res.status(200).json({
      success: true,
      data: leaveBalance,
    });
  } catch (error) {
    console.error("Error fetching leave balance:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

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
    const userRole = req.user.role;
    const userId = req.user.id;
    const userDepartmentId = req.user.departmentId;

    if (!orgId) {
      return res.status(400).json({ success: false, message: 'Organization ID missing' });
    }

    const { startDate, endDate, status, leaveType, sortField, sortOrder } = req.query;
    const where = { organizationId: orgId };

    if (startDate && endDate) {
      where.startDate = {
        gte: new Date(startDate),
      };
      where.endDate = {
        lte: new Date(endDate),
      };
    }
    if (status) {
      where.status = status;
    }
    if (leaveType) {
      where.leaveType = leaveType;
    }

    // Role-based filtering
    if (userRole === 'HR') {
      // HR sees all leave requests for employees and managers in their department
      where.user = {
        departmentId: userDepartmentId,
      };
    } else if (userRole === 'MANAGER') {
      // Manager sees leave requests for their team members
      // Fetch team members under this manager's team(s)
      const teamMembers = await db.user.findMany({
        where: {
          organizationId: orgId,
          role: { in: ['EMPLOYEE', 'MANAGER'] }, // Managers can also be part of teams
          OR: [
            { team: { managerId: userId } }, // Direct team members
            { id: userId }, // The manager themselves, if they apply for leave
          ],
        },
        select: { id: true },
      });
      const memberIds = teamMembers.map(u => u.id);
      if (memberIds.length > 0) {
        where.userId = { in: memberIds };
      } else {
        // If no team members, return no leave requests
        where.userId = null; // Effectively returns an empty array
      }
    }

    const orderBy = {};
    if (sortField && sortOrder) {
      if (sortField === 'employee') {
        orderBy.user = { name: sortOrder };
      } else {
        orderBy[sortField] = sortOrder;
      }
    } else {
      orderBy.startDate = 'desc'; // Default sort
    }

    const leaveRequests = await db.leaveRequest.findMany({
      where,
      include: { user: { select: { id: true, name: true, departmentId: true, role: true } } },
      orderBy,
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

export const approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const approverId = req.user.id;
    const approverRole = req.user.role === 'HR' ? 'HR' : 'MANAGER';
    const updatedLeave = await db.leaveRequest.update({
      where: { id: leaveId },
      data: { status: 'APPROVED' },
    });
    await db.leaveApproval.create({
      data: {
        leaveRequestId: leaveId,
        approverId,
        role: approverRole,
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });
    return res.status(200).json({ success: true, message: 'Leave approved', data: updatedLeave });
  } catch (error) {
    console.error('Error approving leave:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}

export const rejectLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const approverId = req.user.id;
    const approverRole = req.user.role === 'HR' ? 'HR' : 'MANAGER';
    const updatedLeave = await db.leaveRequest.update({
      where: { id: leaveId },
      data: { status: 'REJECTED' },
    });
    await db.leaveApproval.create({
      data: {
        leaveRequestId: leaveId,
        approverId,
        role: approverRole,
        status: 'REJECTED',
        approvedAt: new Date(),
      },
    });
    return res.status(200).json({ success: true, message: 'Leave rejected', data: updatedLeave });
  } catch (error) {
    console.error('Error rejecting leave:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}

export const getLeaveById = async (req, res) => {};

export const cancelLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const updatedLeave = await db.leaveRequest.update({
      where: { id: leaveId },
      data: { status: 'CANCELLED' },
    });
    return res.status(200).json({ success: true, message: 'Leave cancelled', data: updatedLeave });
  } catch (error) {
    console.error('Error cancelling leave:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

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

    const leavesTaken = await db.leaveRequest.groupBy({
      by: ['leaveType'],
      where: { userId, status: 'APPROVED' },
      _sum: {
        totalDays: true,
      },
    });

    const balance = {};
    for (const type in leaveLimits) {
      const limit = leaveLimits[type];
      const taken = leavesTaken.find(lt => lt.leaveType === type)?._sum.totalDays || 0;
      balance[type] = {
        limit,
        taken,
        remaining: limit === "No Limit" ? "No Limit" : limit - taken,
      };
    }

    return res.status(200).json({ success: true, data: balance });
  } catch (error) {
    console.error('Error fetching leave balance:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

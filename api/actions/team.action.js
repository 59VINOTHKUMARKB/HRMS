import db from "../prisma/prisma.js";

// Get all teams for a department
export const getAllTeams = async ({ departmentId, managerId }) => {
  const where = {};
  if (departmentId) where.departmentId = departmentId;
  if (managerId) where.managerId = managerId;
  return db.team.findMany({
    where,
    include: {
      manager: { select: { id: true, name: true, email: true, role: true } },
      members: { select: { id: true, name: true, email: true, role: true } },
      department: { select: { id: true, name: true } },
    },
  });
};

// Create new team
export const createNewTeam = async ({ name, departmentId, managerId, memberIds }) => {
  const team = await db.team.create({
    data: {
      name,
      departmentId,
      managerId,
      members: { connect: memberIds.map((id) => ({ id })) },
    },
    include: {
      manager: { select: { id: true, name: true, email: true, role: true } },
      members: { select: { id: true, name: true, email: true, role: true } },
      department: { select: { id: true, name: true } },
    },
  });

  // Update the manager's teamId if a manager is assigned
  if (managerId) {
    await db.user.update({
      where: { id: managerId },
      data: { teamId: team.id },
    });
  }

  return team;
};

// Update team by ID
export const updateTeamById = async (id, { name, managerId, memberIds }) => {
  // Find the old manager's ID before updating the team
  const oldTeam = await db.team.findUnique({
    where: { id },
    select: { managerId: true },
  });
  const oldManagerId = oldTeam?.managerId;

  // Update team info and reconnect members
  const team = await db.team.update({
    where: { id },
    data: {
      name,
      managerId,
      members: { set: memberIds.map((mid) => ({ id: mid })) }, // Use set to disconnect removed members
    },
    include: {
      manager: { select: { id: true, name: true } },
      members: { select: { id: true, name: true } },
    },
  });

  // Update old manager's teamId to null if manager changed
  if (oldManagerId && oldManagerId !== managerId) {
    await db.user.update({
      where: { id: oldManagerId },
      data: { teamId: null },
    });
  }

  // Update the new manager's teamId
  if (managerId) {
    await db.user.update({
      where: { id: managerId },
      data: { teamId: team.id },
    });
  }

  return team;
};

// Delete team by ID
export const deleteTeamById = async (id) => {
  // Find the team to get the managerId
  const teamToDelete = await db.team.findUnique({
    where: { id },
    select: { managerId: true },
  });

  // Remove team from users (members and manager)
  await db.user.updateMany({ where: { teamId: id }, data: { teamId: null } });

  // Also set managerId to null if a manager was assigned to this team
  if (teamToDelete?.managerId) {
    await db.user.update({
      where: { id: teamToDelete.managerId },
      data: { teamId: null },
    });
  }

  // Delete the team
  await db.team.delete({ where: { id } });
  return true;
}; 
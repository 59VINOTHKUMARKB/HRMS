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
  return db.team.create({
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
};

// Update team by ID
export const updateTeamById = async (id, { name, managerId, memberIds }) => {
  // Clear existing members
  await db.user.updateMany({ where: { teamId: id }, data: { teamId: null } });
  // Update team info and reconnect members
  return db.team.update({
    where: { id },
    data: {
      name,
      managerId,
      members: { connect: memberIds.map((mid) => ({ id: mid })) },
    },
    include: {
      manager: { select: { id: true, name: true } },
      members: { select: { id: true, name: true } },
    },
  });
};

// Delete team by ID
export const deleteTeamById = async (id) => {
  // Remove team from users
  await db.user.updateMany({ where: { teamId: id }, data: { teamId: null } });
  // Delete the team
  await db.team.delete({ where: { id } });
  return true;
}; 
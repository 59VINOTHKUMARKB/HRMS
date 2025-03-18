import db from "../prisma/prisma.js";

// Create a new organization
export const createOrganizationAction = async (data) => {
  try {
    const organization = await db.organization.create({
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
        isActive: data.isActive ?? true,
      },
      include: {
        departments: true,
        users: true,
        admins: true,
      },
    });
    return { success: true, data: organization };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get all organizations
export const getAllOrganizationsAction = async () => {
  try {
    const organizations = await db.organization.findMany({
      include: {
        departments: true,
        users: true,
        admins: true,
      },
    });
    return { success: true, data: organizations };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get organization hierarchy
export const getOrganizationHierarchyAction = async () => {
  try {
    const organizations = await db.organization.findMany({
      include: {
        departments: {
          include: {
            members: true,
            head: true,
          },
        },
        users: true,
        admins: true,
      },
    });
    return { success: true, data: organizations };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get organization by ID
export const getOrganizationByIdAction = async (id) => {
  try {
    const organization = await db.organization.findUnique({
      where: { id },
      include: {
        departments: true,
        users: true,
        admins: true,
      },
    });
    if (!organization) {
      return { success: false, message: "Organization not found" };
    }
    return { success: true, data: organization };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Update organization
export const updateOrganizationAction = async (id, data) => {
  try {
    const organization = await db.organization.update({
      where: { id },
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
        isActive: data.isActive,
      },
      include: {
        departments: true,
        users: true,
        admins: true,
      },
    });
    return { success: true, data: organization };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Delete organization
export const deleteOrganizationAction = async (id) => {
  try {
    await db.organization.delete({
      where: { id },
    });
    return { success: true, message: "Organization deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Assign organization admin
export const assignOrganizationAdmin = async (id, adminId) => {
  try {
    const admin = await db.admin.update({
      where: { id: adminId },
      data: {
        organizationId: id,
      },
    });
    return { success: true, data: admin };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Add user to organization
export const addOrganizationUserAction = async (id, userId) => {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: {
        organizationId: id,
      },
    });
    return { success: true, data: user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Remove user from organization
export const removeOrganizationUserAction = async (id, userId) => {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: {
        organizationId: null,
      },
    });
    return { success: true, data: user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

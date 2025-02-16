import bcrypt from "bcryptjs";
import db from "../prisma/prisma.js";

const VALID_ROLES = {
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  HR: "HR",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
};

// @desc    Get all users from database
export const getAllUsers = async () => {
  try {
    const [users, admins] = await Promise.all([
      db.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          lastLogin: true,
        },
      }),
      db.admin.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          lastLogin: true,
        },
      }),
    ]);
    return { users, admins };
  } catch (error) {
    throw error;
  }
};

// @desc    Get single user by ID
// @params  id: string
export const getUser = async (id) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// @desc    Get single user by Email
// @params  email: string
export const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// @desc    Create new regular user
// @params  userData: { email: string, password: string, name: string, role: UserRole }
export const createNewUser = async (userData) => {
  try {
    if (!VALID_ROLES[userData.role]) {
      throw new Error("Invalid user role");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const user = await db.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        role: userData.role,
        isActive: userData.isActive ?? true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLogin: true,
      },
    });

    return user;
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

// @desc    Get single admin by Email
// @params  email: string
export const getAdminByEmail = async (email) => {
  try {
    const admin = await db.admin.findUnique({
      where: { email },
    });
    return admin;
  } catch (error) {
    throw error;
  }
};

// @desc    Create new admin user
// @params  adminData: { email: string, password: string, name: string, role: AdminRole }
export const createNewAdmin = async (adminData) => {
  try {
    if (
      adminData.role !== VALID_ROLES.ADMIN &&
      adminData.role !== VALID_ROLES.SUPER_ADMIN
    ) {
      throw new Error("Invalid admin role");
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 12);

    const admin = await db.admin.create({
      data: {
        email: adminData.email,
        password: hashedPassword,
        name: adminData.name,
        role: adminData.role,
        isActive: adminData.isActive ?? true,
        lastLogin: null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLogin: true,
      },
    });

    return admin;
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

// @desc    Update existing user
// @params  id: string, updateData: object
export const updateUser = async (id, updateData) => {
  try {
    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    const user = await db.user.update({
      where: { id },
      data: updateData,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// @desc    Delete user from database
// @params  id: string
export const deleteUser = async (id) => {
  try {
    await db.user.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    throw error;
  }
};

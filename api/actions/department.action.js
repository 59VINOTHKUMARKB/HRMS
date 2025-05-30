import db from "../prisma/prisma.js";

// @desc    Get all departments with optional filters
export const getAllDepartments = async ({ search, isActive, parentId, organizationId }) => {
  try {
    const where = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { code: { contains: search, mode: "insensitive" } },
      ];
    }

    if (isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    if (parentId && parentId !== 'null') {
      where.parentId = parentId;
    }

    if (organizationId && organizationId !== 'null') {
      where.organizationId = organizationId;
    }

    const departments = await db.department.findMany({
      where,
      include: {
        head: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        parentDepartment: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        subDepartments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return departments;
  } catch (error) {
    throw error;
  }
};

// @desc    Get department hierarchy tree
export const getDepartmentTree = async () => {
  try {
    // First, get all departments with their relationships
    const allDepartments = await db.department.findMany({
      include: {
        head: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        parentDepartment: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        subDepartments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    // Function to recursively build the tree
    const buildTree = (departments, parentId = null) => {
      return departments
        .filter((dept) => dept.parentId === parentId)
        .map((dept) => ({
          ...dept,
          children: buildTree(departments, dept.id),
        }))
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort children by name
    };

    // Build and return the tree structure
    const tree = buildTree(allDepartments);
    return tree;
  } catch (error) {
    console.error("Error building department tree:", error);
    throw error;
  }
};

// @desc    Get single department by ID
export const getDepartment = async (id) => {
  try {
    const department = await db.department.findUnique({
      where: { id },
      include: {
        head: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        parentDepartment: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        subDepartments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    return department;
  } catch (error) {
    throw error;
  }
};

// @desc    Create new department
export const createNewDepartment = async (departmentData) => {
  try {
    const department = await db.department.create({
      data: {
        name: departmentData.name,
        code: departmentData.code,
        description: departmentData.description,
        location: departmentData.location,
        isActive: departmentData.isActive ?? true,
        parentId: departmentData.parentId,
        headId: departmentData.headId,
        organizationId: departmentData.organizationId,
      },
      include: {
        head: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        parentDepartment: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return department;
  } catch (error) {
    throw error;
  }
};

// @desc    Update department by ID
export const updateDepartmentById = async (id, updateData) => {
  try {
    const department = await db.department.update({
      where: { id },
      data: updateData,
      include: {
        head: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        parentDepartment: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        subDepartments: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    return department;
  } catch (error) {
    throw error;
  }
};

// @desc    Delete department by ID
export const deleteDepartmentById = async (id) => {
  try {
    // First, update all sub-departments to remove their parent reference
    await db.department.updateMany({
      where: { parentId: id },
      data: { parentId: null },
    });

    // Then delete the department
    await db.department.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    throw error;
  }
};

// @desc    Assign department head
export const assignHead = async (departmentId, userId) => {
  try {
    const department = await db.department.update({
      where: { id: departmentId },
      data: { headId: userId },
      include: {
        head: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return department;
  } catch (error) {
    throw error;
  }
};

// @desc    Add member to department
export const addMember = async (departmentId, userId) => {
  try {
    const department = await db.department.update({
      where: { id: departmentId },
      data: {
        members: {
          connect: { id: userId },
        },
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return department;
  } catch (error) {
    throw error;
  }
};

// @desc    Remove member from department
export const removeMember = async (departmentId, userId) => {
  try {
    const department = await db.department.update({
      where: { id: departmentId },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return department;
  } catch (error) {
    throw error;
  }
};

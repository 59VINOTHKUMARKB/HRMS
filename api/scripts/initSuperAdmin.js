import dotenv from "dotenv";
import { createNewAdmin } from "../actions/user.action.js";
import db from "../prisma/prisma.js";
import { AdminRole } from "@prisma/client";
dotenv.config();

const validateEnvVariables = () => {
  const requiredVars = ["SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD"];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
};

const initSuperAdmin = async () => {
  try {
    console.log("Checking environment variables...");
    validateEnvVariables();
    console.log("Checking for existing Super Admin...");
    const existingSuperAdmin = await db.admin.findFirst({
      where: {
        role: AdminRole.SUPER_ADMIN,
      },
    });

    if (existingSuperAdmin) {
      console.log("Super Admin already exists. Skipping initialization.");
      return;
    }

    console.log("Creating Super Admin account...");
    const superAdminData = {
      email: process.env.SUPER_ADMIN_EMAIL,
      password: process.env.SUPER_ADMIN_PASSWORD,
      name: "Navin Super Admin",
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
      lastLogin: null,
    };

    const newSuperAdmin = await createNewAdmin(superAdminData);

    if (newSuperAdmin) {
      console.log("Super Admin created successfully!");
    } else {
      throw new Error("Failed to create Super Admin");
    }
  } catch (error) {
    console.error("Error creating Super Admin:", error.message);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
};

// Run the initialization
initSuperAdmin();

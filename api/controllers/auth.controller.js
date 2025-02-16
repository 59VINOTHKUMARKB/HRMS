import {
  signInUser,
  signInAdmin,
  signOutUser,
  resetUserPassword,
} from "../actions/auth.action.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAdminByEmail, getUserByEmail } from "../actions/user.action.js";
import { errorHandler } from "../utils/error.js";
import db from "../prisma/prisma.js";

// @desc    Sign in user and create token
// @route   POST /api/auth/signin
// @access  Public
export const userSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await getUserByEmail(email);
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    if (!validUser.isActive) {
      return next(
        errorHandler(
          401,
          "Your account is not active please contact your administrator"
        )
      );
    }

    await db.user.update({
      where: { id: validUser.id },
      data: { lastLogin: new Date() },
    });

    const token = jwt.sign(
      {
        id: validUser.id,
        isUser: validUser.isUser,
      },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// @desc    Sign in admin and create token
// @route   POST /api/auth/admin/signin
// @access  Public
export const adminSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validAdmin = await getAdminByEmail(email);
    if (!validAdmin) {
      return next(errorHandler(404, "Admin not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    if (!validAdmin.isActive) {
      return next(
        errorHandler(
          401,
          "Your account is not active please contact your administrator"
        )
      );
    }
    await db.admin.update({
      where: { id: validAdmin.id },
      data: { lastLogin: new Date() },
    });

    const token = jwt.sign(
      {
        id: validAdmin.id,
        isAdmin: validAdmin.isAdmin,
      },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validAdmin;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// @desc    Sign out user and clear cookie
// @route   POST /api/auth/signout
// @access  Private
export const signOut = async (req, res, next) => {
  try {
    // Call the auth action to handle sign out
    await signOutUser(req.user?.id);
    res.clearCookie("access_token");
    return res.status(200).json({
      success: true,
      message: "Signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send password reset email
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Call the auth action to handle password reset
    const result = await resetUserPassword(email);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Password reset email sent successfully",
      });
    }

    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  } catch (error) {
    next(error);
  }
};

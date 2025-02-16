import express from "express";
import {
  userSignIn,
  adminSignIn,
  signOut,
  forgotPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

// @route   POST /api/auth/signin
// @desc    Authenticate user & get token
// @access  Public
router.post("/signin", userSignIn);
router.post("/admin/signin", adminSignIn);

// @route   POST /api/auth/signout
// @desc    Sign out user & clear cookie
// @access  Private
router.post("/signout", signOut);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post("/forgot-password", forgotPassword);

export default router;

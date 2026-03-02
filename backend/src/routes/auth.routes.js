import express from "express";
import {
  register,
  login,
  verifyOTP,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);
router.get("/verify-email/:token", verifyEmail);

export default router;

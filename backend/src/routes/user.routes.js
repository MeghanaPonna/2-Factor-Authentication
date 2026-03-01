import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getProfile } from "../controllers/user.controller.js";
import { toggleTwoFactor } from "../controllers/user.controller.js";

const router = express.Router();

// 🔐 Protected route
router.get("/profile", authMiddleware, getProfile);
router.patch("/toggle-2fa", authMiddleware, toggleTwoFactor);

export default router;
// export const getProfile = async (req, res) => {
//   res.status(200).json({
//     message: "Profile fetched successfully",
//     user: req.user,
//   });
// };

import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -twoFactorOTP -twoFactorOTPExpiry -resetPasswordToken"
    );

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===================== TOGGLE 2FA ===================== */
export const toggleTwoFactor = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.twoFactorEnabled = !user.twoFactorEnabled;
    await user.save();

    res.status(200).json({
      message: `Two-factor authentication ${
        user.twoFactorEnabled ? "enabled" : "disabled"
      }`,
      twoFactorEnabled: user.twoFactorEnabled,
    });
  } catch (error) {
    console.error("Toggle 2FA error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import transporter from "../config/mail.js";

/* ===================== REGISTER ===================== */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: Date.now() + 24 * 60 * 60 * 1000,
    });

    const verifyUrl = `http://localhost:5173/verify-email/${verificationToken}`;

    await transporter.sendMail({
      to: email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Click the link below:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>Link valid for 24 hours</p>
      `,
    });

    res.status(201).json({
      message: "Verification link sent to email",
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===================== VERIFY EMAIL ===================== */
export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification link",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save();

    return res.status(200).json({
      message: "Email verified",
      userId: user._id,
      twoFactorEnabled: user.twoFactorEnabled,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===================== LOGIN ===================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // ✅ FIX: get user FIRST
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ FIX: email verification AFTER user fetch
    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    /* 🔐 IF 2FA IS DISABLED */
    if (!user.twoFactorEnabled) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          twoFactorEnabled: user.twoFactorEnabled,
        },
      });
    }

    /* 🔑 IF 2FA ENABLED → SEND OTP */
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    user.twoFactorOTP = hashedOTP;
    user.twoFactorOTPExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      to: user.email,
      subject: "Your Login OTP",
      html: `
        <h2>OTP Verification</h2>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes</p>
      `,
    });

    res.status(200).json({
      message: "OTP sent to your email",
      userId: user._id,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ===================== VERIFY OTP ===================== */
export const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res
        .status(400)
        .json({ message: "User ID and OTP are required" });
    }

    const user = await User.findById(userId);
    if (!user || !user.twoFactorOTP) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (
      user.twoFactorOTP !== hashedOTP ||
      user.twoFactorOTPExpiry < Date.now()
    ) {
      return res
        .status(401)
        .json({ message: "Invalid or expired OTP" });
    }

    user.twoFactorOTP = undefined;
    user.twoFactorOTPExpiry = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });
  } catch (error) {
    console.error("Verify OTP Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ===================== FORGOT PASSWORD ===================== */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset</h2>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Link valid for 15 minutes</p>
      `,
    });

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===================== RESET PASSWORD ===================== */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===================== RESend OTP ===================== */


export const resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user || !user.twoFactorEnabled) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    user.twoFactorOTP = hashedOTP;
    user.twoFactorOTPExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      to: user.email,
      subject: "Your new OTP",
      html: `<h1>${otp}</h1><p>Valid for 5 minutes</p>`,
    });

    res.json({ message: "OTP resent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// export const resendOTP = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await User.findById(userId);
//     if (!user || !user.twoFactorEnabled) {
//       return res.status(400).json({ message: "Invalid request" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     const hashedOTP = crypto
//       .createHash("sha256")
//       .update(otp)
//       .digest("hex");

//     user.twoFactorOTP = hashedOTP;
//     user.twoFactorOTPExpiry = Date.now() + 5 * 60 * 1000; // 5 min
//     await user.save();

//     await transporter.sendMail({
//       to: user.email,
//       subject: "Your new OTP",
//       html: `
//         <h2>OTP Verification</h2>
//         <h1>${otp}</h1>
//         <p>Valid for 5 minutes</p>
//       `,
//     });

//     res.status(200).json({ message: "OTP resent successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


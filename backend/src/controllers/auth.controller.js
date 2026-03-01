// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import crypto from "crypto";
// import jwt from "jsonwebtoken";
// import transporter from "../config/mail.js";

// /* ===================== REGISTER ===================== */
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }

//     // Check existing user
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         message: "User already exists with this email",
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     return res.status(201).json({
//       message: "User registered successfully",
//       userId: user._id,
//     });
//   } catch (error) {
//     console.error("Register Error:", error.message);
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

// /* ===================== LOGIN + SEND OTP ===================== */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     // Compare password
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isPasswordCorrect) {
//       return res.status(401).json({
//         message: "Invalid credentials",
//       });
//     }

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Hash OTP
//     const hashedOTP = crypto
//       .createHash("sha256")
//       .update(otp)
//       .digest("hex");

//     // Save OTP & expiry
//     user.twoFactorOTP = hashedOTP;
//     user.twoFactorOTPExpiry = Date.now() + 5 * 60 * 1000; // 5 min
//     await user.save();

//     // Send OTP email
//     await transporter.sendMail({
//       from: "2FA App <no-reply@2fa.com>",
//       to: user.email,
//       subject: "Your Login OTP",
//       html: `
//         <h2>OTP Verification</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>Valid for 5 minutes</p>
//       `,
//     });

//     return res.status(200).json({
//       message: "OTP sent to your email",
//       userId: user._id,
//     });
//   } catch (error) {
//     console.error("Login Error:", error.message);
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

// export const verifyOTP = async (req, res) => {
//   try {
//     const { userId, otp } = req.body;

//     if (!userId || !otp) {
//       return res.status(400).json({ message: "User ID and OTP are required" });
//     }

//     const user = await User.findById(userId);
//     if (!user || !user.twoFactorOTP) {
//       return res.status(400).json({ message: "Invalid request" });
//     }

//     const hashedOTP = crypto
//       .createHash("sha256")
//       .update(otp)
//       .digest("hex");

//     if (
//       user.twoFactorOTP !== hashedOTP ||
//       user.twoFactorOTPExpiry < Date.now()
//     ) {
//       return res.status(401).json({ message: "Invalid or expired OTP" });
//     }

//     user.twoFactorOTP = undefined;
//     user.twoFactorOTPExpiry = undefined;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


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
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    /* 🔐 IF 2FA IS DISABLED → DIRECT LOGIN */
    if (!user.twoFactorEnabled) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Login successful (2FA disabled)",
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
      from: "2FA App <no-reply@2fa.com>",
      to: user.email,
      subject: "Your Login OTP",
      html: `
        <h2>OTP Verification</h2>
        <p>Your OTP is:</p>
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

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: "Reset your password",
      html: `
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    res.json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ===================== RESET PASSWORD ===================== */
export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
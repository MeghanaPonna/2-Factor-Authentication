import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // 📧 Email verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpiry: Date,

    // 🔐 Two-Factor Authentication
    twoFactorEnabled: {
      type: Boolean,
      default: true,
    },
    twoFactorOTP: String,
    twoFactorOTPExpiry: Date,

    // 🔁 Forgot password
    resetPasswordToken: String,
    resetPasswordExpiry: Date,

    // 🛡 Role (future-proof)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
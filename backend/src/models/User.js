// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },

//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },

//     twoFactorEnabled: {
//       type: Boolean,
//       default: true,
//     },

//     twoFactorOTP: String,
//     twoFactorOTPExpiry: Date,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);


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

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    twoFactorEnabled: {
      type: Boolean,
      default: true,
    },

    // 🔐 2FA
    twoFactorOTP: String,
    twoFactorOTPExpiry: Date,

    // 🔁 Forgot Password
    resetPasswordToken: String,
    resetPasswordExpiry: Date,

    // 🛡 Authorization (future proof)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordColor: {
      type: String, // e.g., hex color code or predefined color name
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      default: null,
      sparse: true, // ✅ Ensures index is only created when a token exists
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
      sparse: true,
    },
  },
  { timestamps: true }
);


export default mongoose.models.User || mongoose.model("User", userSchema);


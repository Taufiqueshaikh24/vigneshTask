import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    dob: Date,
    password: String,
    passwordColor: String,
    otp: String,
    otpExpiresAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.TempUser || mongoose.model("TempUser", tempUserSchema);

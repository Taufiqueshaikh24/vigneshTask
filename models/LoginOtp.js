import mongoose from "mongoose";

const loginOTPSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User logging in
      required: true,
    },
    otp: {
      type: String,
      required: true, // OTP sent for login verification
    },
    otpExpiresAt: {
      type: Date,
      required: true, // Time when the OTP expires
    },
    used: {
      type: Boolean,
      default: false, // Initially false, set to true when OTP is used
    },
  },
  { timestamps: true }
);

// Export model using ESM syntax
const LoginOTP = mongoose.models.LoginOTP || mongoose.model("LoginOTP", loginOTPSchema);
export default LoginOTP;

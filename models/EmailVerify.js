const mongoose = require("mongoose");

const emailVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User being verified
    required: true,
  },
  otp: {
    type: String,
    required: true, // OTP sent for email verification
  },
  otpExpiresAt: {
    type: Date,
    required: true, // Time when the OTP expires
  },
  verified: {
    type: Boolean,
    default: false, // Initially set to false until the user verifies their email
  },
 
},{timestamps:true});

module.exports = mongoose.model("EmailVerification", emailVerificationSchema);

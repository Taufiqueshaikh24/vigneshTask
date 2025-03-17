export function generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // Expires in 10 min
    return { otp, otpExpiresAt };
  }
  
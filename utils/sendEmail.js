// import nodemailer from "nodemailer";

// export async function sendEmail(email, subject, message) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject,
//       text: message,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${email} with subject: ${subject}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email.");
//   }
// }



import nodemailer from "nodemailer";

// ✅ Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email app password
  },
});

// ✅ Function to Send Different Types of Emails
export async function sendEmail(to, type, name, content) {
  let subject, htmlContent;

  try {
    // Email Type Handling
    if (type === "verification") {
      // 🔹 Verification Email (Only Shows Code, No Link)
      subject = "Verify Your Email - MyApp";
      htmlContent = `
        <html>
          <body style="text-align:center; font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <h2 style="color:#333;">Verify Your Email</h2>
              <p style="color:#555;">Hello <strong>${name}</strong>,</p>
              <p>Your verification code is:</p>
              <h3 style="color:#007bff; background:#e7f3ff; display:inline-block; padding:10px 20px; border-radius:5px;">${content}</h3>
              <p style="color:#777;">If you didn't request this, ignore this email.</p>
              <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">
              <p style="color:#888;">Best regards</p>
            </div>
          </body>
        </html>`;
    } else if (type === "reset") {
      // 🔹 Password Reset Email (Includes a Clickable Reset Link)
      subject = "Reset Your Password - MyApp";
      htmlContent = `
        <html>
          <body style="text-align:center; font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <h2 style="color:#e63946;">Reset Your Password</h2>
              <p style="color:#555;">Hello <strong>${name}</strong>,</p>
              <p>Someone (hopefully you) requested a password reset.</p>
              <p>Click the button below to reset your password:</p>
              <a href="${content}" style="display:inline-block; background:#e63946; color:white; padding:10px 20px; border-radius:5px; text-decoration:none; font-weight:bold;">Reset Password</a>
              <p>If you didn’t request this, ignore this email.</p>
              <hr style="border: none; height: 1px; background: #ddd; margin: 20px 0;">
              <p style="color:#888;">Best regards</p>
            </div>
          </body>
        </html>`;
    } else {
      throw new Error("Invalid email type");
    }

    // ✅ Send Email
    await transporter.sendMail({
      from: `<${process.env.EMAIL_USER2}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log(`Email sent to ${to} with subject: ${subject}`);

  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
}

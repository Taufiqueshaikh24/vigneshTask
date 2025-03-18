import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (token) => {
  try {
    if (!token) throw new Error("No token provided");
    console.log("Received Token:", token); // Debugging line
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token:", decoded);
    return decoded;
  } catch (error) {
    console.error("JWT Error:", error.message);
    throw new Error("Invalid token");
  }
};

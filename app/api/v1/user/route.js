import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Import your User model

export async function GET(req) {
  // Extract the JWT token from cookies
  const token = req.cookies.get('token')?.value;

  // Check if token exists
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Decode and verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user information from the database using email from the token
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return the user information (You can also filter sensitive fields)
    const { name, email , phone , dob } = user;
    return NextResponse.json({ name, email , phone , dob });

  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}

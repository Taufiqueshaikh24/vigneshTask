"use client";
import { useState } from "react";
import WheelAuth from "../Components/Wheel";
import ColorWheelLogin from "../Components/Wheel";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Function to update password from WheelAuth
  const handlePasswordUpdate = (newPassword) => {
    setPassword(newPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        // Redirect user to dashboard or homepage
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        
        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        {/* WheelAuth Component for Password Input */}
        {/* <WheelAuth onPasswordUpdate={handlePasswordUpdate} /> */}
        <ColorWheelLogin />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

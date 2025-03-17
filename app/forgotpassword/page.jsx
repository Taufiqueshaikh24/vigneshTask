"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner"; // Ensure Sonner is imported

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    // ✅ Clear previous toasts
    toast.dismiss();

    // ✅ Validate email before making request
    if (!email.trim()) {
      toast.error("Email is required.", {
        position: "top-right", // Position the toast in the top-right corner
        style: {
          backgroundColor: "#ef233c", // Red background color for error
          color: "#fff", // White text color
        },
      });
      return;
    }

    setLoading(true);

    try {
      console.log("Sending email:", email); // ✅ Debugging

      const response = await fetch("/api/v1/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log("Request payload:", JSON.stringify({ email })); // ✅ Debugging

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset link sent! Check your email.", {
          position: "top-right", // Position the toast in the top-right corner
          style: {
            backgroundColor: "#34D399", // Green background color for success
            color: "#fff", // White text color
          },
        });
      } else {
        toast.error(data.message || "Failed to send reset link.", {
          position: "top-right", // Position the toast in the top-right corner
          style: {
            backgroundColor: "#F87171", // Red background color for error
            color: "#fff", // White text color
          },
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right", // Position the toast in the top-right corner
        style: {
          backgroundColor: "#F87171", // Red background color for error
          color: "#fff", // White text color
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <Card className="w-full max-w-md shadow-lg p-8 rounded-lg bg-white border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">Forgot Password</h2>

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300"
        />

        <Button
          onClick={handleForgotPassword}
          className="w-full bg-black text-white hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </Card>
    </div>
  );
};

export default ForgotPassword;

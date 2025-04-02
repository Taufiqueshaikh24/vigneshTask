



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const RegistrationPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  

  // Password input validation to allow only hexadecimal characters (0-9, A-F)
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    const hexRegex = /^[0-9A-Fa-f]*$/; // Only allows hexadecimal characters

    if (hexRegex.test(value)) {
      setPassword(value);
    } else {
      toast.error("Password must contain only hexadecimal characters (0-9, A-F).", {
        position: "top-right",  // Custom position
        style: { backgroundColor: "#ef233c", color: "white" },  // Red color for error
      });
    }
  };



  

  const handleSubmit = async (e) => {
    e.preventDefault();

  

    setLoading(true);

    try {
      const response = await fetch("/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone,  password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Please verify your OTP.", {
          position: "top-right",  // Custom position
          style: { backgroundColor: "#29bf12", color: "white" },  // Green color for success
        });
        router.push(`/verifyotp?email=${email}`);
      } else {
        toast.error(data.error || "Registration failed. Please try again.", {
          position: "top-right",  // Custom position
          style: { backgroundColor: "#ef233c", color: "white" },  // Red color for error
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",  // Custom position
        style: { backgroundColor: "#ef233c", color: "white" },  // Red color for error
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-md shadow-lg p-6 rounded-lg bg-white border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
          </div> */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="flex items-center mb-4">
            <Checkbox checked={showPassword} onCheckedChange={() => setShowPassword((prev) => !prev)} id="showPassword" />
            <label htmlFor="showPassword" className="ml-2 text-sm text-gray-700">Show Password</label>
          </div>
          <Button type="submit" className="w-full bg-black py-2 text-white" disabled={loading}>
          {loading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : "Register"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-sm font-medium text-black hover:underline">Sign In</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegistrationPage;






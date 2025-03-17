// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import Link from "next/link";

// const RegistrationPage = () => {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [dob, setDob] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordColor, setPasswordColor] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const colorOptions = ["yellow", "orange", "red", "pink", "purple", "green", "blue", "black"];


//   // Password input validation to allow only hexadecimal characters (0-9, A-F)
//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     const hexRegex = /^[0-9A-Fa-f]*$/; // Only allows hexadecimal characters

//     if (hexRegex.test(value)) {
//       setPassword(value);
//     } else {
//       toast.error("Password must contain only hexadecimal characters (0-9, A-F).");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!passwordColor) {
//       toast.error("Please select a password color.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("/api/v1/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, phone, dob, password, passwordColor }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Registration successful! Please verify your OTP.");
//         router.push(`/verifyotp?email=${email}`);
//       } else {
//         toast.error(data.error || "Registration failed. Please try again.");
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
//       <Card className="w-full max-w-md shadow-lg p-6 rounded-lg bg-white border border-gray-300">
//         <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//             <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//             <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
//             <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <Input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={handlePasswordChange}
//               required
//               placeholder="Enter a hexadecimal password (0-9, A-F)"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password Color</label>
//             <div className="flex items-center gap-3">
//               <Select value={passwordColor} onValueChange={setPasswordColor}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select Password Color" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {colorOptions.map((color) => (
//                     <SelectItem key={color} value={color}>
//                       {color.charAt(0).toUpperCase() + color.slice(1)}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {passwordColor && (
//   <div
//     className="w-10 aspect-square rounded-full border border-gray-400"
//     style={{ backgroundColor: passwordColor === "green" ? "#affc41" : passwordColor === "purple" ? "#c77dff" : passwordColor }}
//   />
// )}     </div>
//           </div>
//           <div className="flex items-center mb-4">
//             <Checkbox checked={showPassword} onCheckedChange={() => setShowPassword((prev) => !prev)} id="showPassword" />
//             <label htmlFor="showPassword" className="ml-2 text-sm text-gray-700">Show Password</label>
//           </div>
//           <Button type="submit" className="w-full bg-black py-2 text-white" disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </Button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-700">
//             Already have an account?{" "}
//             <Link href="/login" className="text-sm font-medium text-black hover:underline">Sign In</Link>
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default RegistrationPage;







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

const RegistrationPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [passwordColor, setPasswordColor] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorOptions = ["yellow", "orange", "red", "pink", "purple", "green", "blue", "black"];

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

    if (!passwordColor) {
      toast.error("Please select a password color.", {
        position: "top-right",  // Custom position
        style: { backgroundColor: "#ef233c", color: "white" },  // Red color for error
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, dob, password, passwordColor }),
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Enter a hexadecimal password (0-9, A-F)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password Color</label>
            <div className="flex items-center gap-3">
              <Select value={passwordColor} onValueChange={setPasswordColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Password Color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {passwordColor && (
                <div
                  className="w-10 aspect-square rounded-full border border-gray-400"
                  style={{ backgroundColor: passwordColor === "green" ? "#affc41" : passwordColor === "purple" ? "#c77dff" : passwordColor }}
                />
              )}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Checkbox checked={showPassword} onCheckedChange={() => setShowPassword((prev) => !prev)} id="showPassword" />
            <label htmlFor="showPassword" className="ml-2 text-sm text-gray-700">Show Password</label>
          </div>
          <Button type="submit" className="w-full bg-black py-2 text-white" disabled={loading}>
            {loading ? "Registering..." : "Register"}
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

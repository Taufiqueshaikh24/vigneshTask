// "use client";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Link from "next/link";
// import { useRouter } from "next/navigation"; // Use useRouter for redirection
// import { toast } from "sonner"; // Make sure Sonner is imported
// import ColorWheelLogin from "../Components/Wheel"; // Ensure correct path

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [passwordColor, setPasswordColor] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter(); // Use router for redirection

//   const handleVerifyEmail = async () => {
//     if (!email) {
//       toast.error("Please enter your email.", {
//         position: "top-right",
//         style: {
//           backgroundColor: "#ef233c", // Red color for error
//           color: "#fff", // White text
//         },
//       });
//       return;
//     }

//     try {
//       const response = await fetch("/api/v1/checkemail", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setEmailVerified(true);
//         setPasswordColor(data.passwordColor);
//         console.log("User's Password Color:", data.passwordColor);
//       } else {
//         toast.error(data.message, {
//           position: "top-right", // Position for error toast
//           style: {
//             backgroundColor: "#ef233c", // Red color for error
//             color: "#fff", // White text
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Email verification failed:", error);
//       toast.error("An error occurred while verifying email.", {
//         position: "top-right", // Position for error toast
//         style: {
//           backgroundColor: "#ef233c", // Red color for error
//           color: "#fff", // White text
//         },
//       });
//     }
//   };

//   const handlePasswordUpdate = (newPassword) => {
//     setPassword(newPassword);
//   };

//   const handleLogin = async () => {
//     if (!emailVerified) {
//       toast.error("Please verify your email first.", {
//         position: "top-right", // Position for error toast
//         style: {
//           backgroundColor: "#ef233c", // Red color for error
//           color: "#fff", // White text
//         },
//       });
//       return;
//     }

//     if (!password) {
//       toast.error("Please enter your password.", {
//         position: "top-right", // Position for error toast
//         style: {
//           backgroundColor: "#ef233c", // Red color for error
//           color: "#fff", // White text
//         },
//       });
//       return;
//     }

//     try {
//       const response = await fetch("/api/v1/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success("Login successful!", {
//           position: "top-right", // Position for success toast
//           style: {
//             backgroundColor: "#29bf12", // Green color for success
//             color: "#fff", // White text
//           },
//         });
//         router.push("/"); // Redirect to root directory after successful login
//       } else {
//         toast.error(data.message, {
//           position: "top-right", // Position for error toast
//           style: {
//             backgroundColor: "#ef233c", // Red color for error
//             color: "#fff", // White text
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       toast.error("An error occurred while logging in.", {
//         position: "top-right", // Position for error toast
//         style: {
//           backgroundColor: "#ef233c", // Red color for error
//           color: "#fff", // White text
//         },
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
//       <Card className="w-full max-w-md shadow-lg p-8 rounded-lg bg-white border border-gray-200">
//         <h2 className="text-3xl font-semibold text-center text-black mb-6">Login</h2>

//         {!emailVerified ? (
//           <>
//             <Input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full  border border-gray-300"
//             />

//             <Button
//               onClick={handleVerifyEmail}
//               className="w-full mb-4 bg-black text-white hover:bg-gray-800"
//             >
//               Verify Email
//             </Button>

//             {/* Forgot Password Link in Verify Email Section */}
//             <div className="text-center mt-2">
//               <Link href="/forgotpassword" className="text-sm font-medium text-black hover:underline">
//                 Forgot Password?
//               </Link>
//             </div>
//           </>
//         ) : (
//           <>
//             <Input
//               type="email"
//               value={email}
//               readOnly
//               className="w-full mb-4 border border-gray-300 bg-gray-100 cursor-not-allowed"
//             />

//             <div className="mb-6">
//               <ColorWheelLogin 
//                 passwordColor={passwordColor} 
//                 onPasswordUpdate={handlePasswordUpdate} 
//               />
//             </div>

//             <Button
//               onClick={handleLogin}
//               className="w-full mb-4 bg-black text-white hover:bg-gray-800"
//             >
//               Login
//             </Button>
//           </>
//         )}

//         <div className="text-center mt-4">
//           <span className="text-sm text-gray-600">Don't have an account? </span>
//           <Link href="/register" className="text-sm font-medium text-black hover:underline">
//             Sign Up
//           </Link>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Login;






"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ColorWheelLogin from "../Components/Wheel";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordColor, setPasswordColor] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]  = useState(false);
  const [loading2, setLoading2]  = useState(false);
  const router = useRouter();

  const handleVerifyEmail = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
      setLoading2(true)
    try {
      const response = await fetch("/api/v1/checkemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setEmailVerified(true);
        setPasswordColor(data.passwordColor);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while verifying email.");
    }finally{
       setLoading2  (false);
    }
  };

  const handlePasswordUpdate = (newPassword) => {
    setPassword(newPassword);
  };

  const handleLogin = async () => {

    if (!emailVerified) {
      toast.error("Please verify your email first.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }
    setLoading(true)

    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensures cookies are sent & received
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
    }finally {
         setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <Card className="w-full max-w-md shadow-lg p-8 rounded-lg bg-white border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-black mb-6">Login</h2>

        {!emailVerified ? (
          <>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300"
            />

            <Button
              onClick={handleVerifyEmail}
              className="w-full mb-4 bg-black text-white hover:bg-gray-800"
            >
              {loading2 ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : "Verify Email"}
            </Button>

            <div className="text-center mt-2">
              <Link href="/forgotpassword" className="text-sm font-medium text-black hover:underline">
                Forgot Password?
              </Link>
            </div>
          </>
        ) : (
          <>
            <Input
              type="email"
              value={email}
              readOnly
              className="w-full mb-4 border border-gray-300 bg-gray-100 cursor-not-allowed"
            />

            <div className="mb-6">
              <ColorWheelLogin 
                passwordColor={passwordColor} 
                onPasswordUpdate={handlePasswordUpdate} 
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full mb-4 bg-black text-white hover:bg-gray-800"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : "Login"}
            </Button>
          </>
        )}

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link href="/register" className="text-sm font-medium text-black hover:underline">
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;

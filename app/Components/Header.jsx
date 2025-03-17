"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Get user info from the JWT token or NextAuth session
  useEffect(() => {
    const token = document.cookie.split(";").find(cookie => cookie.trim().startsWith("token=")); // Example for JWT token
    if (token) {
      const decodedToken = JSON.parse(atob(token.split("=")[1].split(".")[1]));
      setUser({ name: decodedToken.name, email: decodedToken.email });
    }
  }, []);

 // Function to handle logout
const handleLogout = () => {
    // Clear all cookies related to the user (JWT and NextAuth session)
    document.cookie
      .split(";")
      .forEach((cookie) => {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; Max-Age=-1; path=/;`;
      });
  
    // Redirect to login page
    router.push("/login");
  };
  

  const renderUserInitials = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    return initials;
  };

  return (
    <header className="w-full p-4 shadow-md flex justify-between items-center bg-white text-black">
      {/* App Title */}
      <h1 className="text-xl font-semibold">My App</h1>

      <div className="flex items-center gap-4">
        {/* Display user profile initials */}
        <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center text-lg font-semibold">
  {user ? renderUserInitials(user.name) : ""}
</div>

          {/* Dropdown for user profile and logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" size="sm" className="text-black">
                {user ? user.name : "Guest"}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

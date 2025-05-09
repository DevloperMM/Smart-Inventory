import React from "react";
import { Link } from "react-router-dom";
import { KeyRound, LogOut, User } from "lucide-react";

function Navbar() {
  const logout = () => {
    console.log("logout");
  };

  return (
    <header className="bg-white shadow border-b sticky top-0 z-30">
      <div className="max-w-full px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/image.png"
            alt="logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-8">
          <Link
            to="/user/password"
            className="flex items-center text-gray-700 hover:text-black transition"
          >
            <KeyRound className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline text-sm">Change Password</span>
          </Link>

          <Link
            to="/user/profile"
            className="flex items-center text-gray-700 hover:text-black transition"
          >
            <User className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline text-sm">Profile</span>
          </Link>

          <button
            onClick={logout}
            className="flex items-center text-red-400 hover:text-red-500 cursor-pointer"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline text-sm font-semibold">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

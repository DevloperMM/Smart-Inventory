import React, { useEffect, useRef, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUserStore();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200 h-16">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          to="/user"
          className="text-2xl font-bold text-blue-900 drop-shadow"
        >
          <img src="/logo.png" alt="Logo" className="h-10 w-48" />
        </Link>

        <div className="flex gap-6 text-sm font-medium text-gray-700">
          <Link to="/user/request/new">Create Request</Link>
          <Link to="/user/requests">My Requests</Link>
          <Link to="/user/issuances">My Issuances</Link>

          <div className="relative group cursor-pointer" ref={dropdownRef}>
            <button
              className="hover:underline underline-offset-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex gap-1">
                <span>Account</span>
                <User size={18} strokeWidth={1.75} />
              </div>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 group-hover:block bg-white/90 backdrop-blur-sm rounded shadow-md min-w-[150px] border">
                {user.role === "user" ? (
                  <>
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 hover:bg-blue-50"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/user/password"
                      className="block px-4 py-2 hover:bg-blue-50"
                    >
                      Change Password
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Open as admin
                  </Link>
                )}

                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;

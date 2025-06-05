import { Link, useNavigate } from "react-router-dom";
import { KeyRound, LogOut, User } from "lucide-react";
import { useUserStore } from "../store/useUserStore.js";

function Navbar() {
  const navigate = useNavigate();

  const { logout } = useUserStore();

  return (
    <header className="bg-white shadow border-b sticky top-0 z-30">
      <div className="max-w-full px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <img
          src="/image.png"
          alt="logo"
          className="h-12 w-auto object-contain"
          onClick={() => navigate("/")}
        />

        {/* Actions */}
        <div className="flex items-center space-x-8">
          <Link
            to="/admin/password"
            className="flex items-center text-gray-700 hover:text-black transition"
          >
            <KeyRound className="h-5 w-5 md:mr-2" />
            <span className="hidden sm:inline-block text-sm">
              Change Password
            </span>
          </Link>

          <Link
            to="/admin/profile"
            className="flex items-center text-gray-700 hover:text-black transition"
          >
            <User className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline text-sm">Profile</span>
          </Link>

          <button
            onClick={() => logout()}
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

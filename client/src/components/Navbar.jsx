// import React from "react";
// import { Link } from "react-router-dom";
// import { LogOut, Settings, User } from "lucide-react";

// function Navbar() {
//   const logout = () => {
//     console.log("logout");
//   };

//   return (
//     <header className="bg-base-100/80 border-b border-base-300 relative top-0 backdrop-blur-lg">
//       <div className="w-full px-8 h-16">
//         <div className="flex items-center justify-between h-full">
//           <div className="flex items-center gap-8">
//             <img
//               src="/image.png"
//               alt="logo"
//               className="w-auto h-14 object-contain"
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <Link to="/settings" className="btn btn-md gap-2 transition-colors">
//               <Settings className="size-5" />
//               <span className="hidden sm:inline">Settings</span>
//             </Link>

//             <Link to="/profile" className="btn btn-md gap-2">
//               <User className="size-5" />
//               <span className="hidden sm:inline">Profile</span>
//             </Link>

//             <button
//               className="flex gap-2 items-center cursor-pointer"
//               onClick={logout}
//             >
//               <LogOut className="size-5" />
//               <span className="hidden sm:inline font-semibold">Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { KeyRound, Lock, LogOut, Settings, User } from "lucide-react";

function Navbar() {
  const logout = () => {
    console.log("logout");
    // Add logout logic here
  };

  return (
    <header className="bg-white shadow border-b sticky top-0 z-30">
      <div className="max-w-full px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/image.png"
            alt="logo"
            className="h-12 w-auto object-contain"
          />
        </div>

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

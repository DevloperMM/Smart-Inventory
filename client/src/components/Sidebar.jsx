import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const currPath = location.pathname;

  const [transactDown, setTransactDown] = useState(() =>
    currPath.startsWith("/transactions")
  );

  const user = {
    name: "Alice Smith",
    role: "it-head",
  };

  const navLinkClass = (path) =>
    `block p-2 rounded hover:bg-amber-200 hover:text-black ${
      currPath === path ? "font-semibold underline underline-offset-4" : ""
    }`;

  return (
    <aside className="min-h-screen shadow-md p-4 text-gray-50 bg-amber-700">
      <div className="mb-4 text-center pb-4 border-b-2">
        <Link to="/user/profile">
          <img
            src="/avatar.png"
            alt="logo"
            className="h-20 w-24 mx-auto cursor-pointer"
          />
        </Link>
        <span className="block mt-2 text-sm font-medium">{user.name}</span>
      </div>

      <nav className="space-y-3">
        <Link to="/dashboard" className={navLinkClass("/dashboard")}>
          Dashboard
        </Link>

        {user.role.toLowerCase() !== "store-manager" && (
          <Link to="/users" className={navLinkClass("/users")}>
            Manage Users
          </Link>
        )}

        <Link to="/assets" className={navLinkClass("/assets")}>
          Assets
        </Link>

        <Link to="/consumables" className={navLinkClass("/consumables")}>
          Consumables
        </Link>

        <div>
          <button
            onClick={() => setTransactDown(!transactDown)}
            className={`w-full text-left p-2 mb-1 rounded hover:bg-amber-200 hover:text-black ${
              !transactDown ? "shadow-lg" : ""
            }`}
          >
            Transactions{" "}
            <ChevronDown
              size={18}
              strokeWidth={3}
              className="inline-block mb-0.5"
            />
          </button>
          {transactDown && (
            <div className="ml-4 space-y-1">
              <Link
                to="/transactions/requests"
                className={navLinkClass("/transactions/requests")}
              >
                User Requests
              </Link>
              <Link
                to="/transactions/transits"
                className={navLinkClass("/transactions/transits")}
              >
                Transit Requests
              </Link>
              <Link
                to="/transactions/issuances"
                className={navLinkClass("/transactions/issuances")}
              >
                Past Issuances
              </Link>
              <Link
                to="/transactions/transfers"
                className={navLinkClass("/transactions/transfers")}
              >
                Transfers
              </Link>
              <Link
                to="/transactions/disposals"
                className={navLinkClass("/transactions/disposals")}
              >
                Disposals
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;

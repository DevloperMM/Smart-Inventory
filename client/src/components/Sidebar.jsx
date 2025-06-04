import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useUserStore } from "../store/useUserStore.js";

function Sidebar() {
  const location = useLocation();
  const currPath = location.pathname;

  const [transactDown, setTransactDown] = useState(() =>
    currPath.startsWith("/admin/transactions")
  );

  const { user } = useUserStore();

  const navLinkClass = (path) =>
    `block p-2 rounded hover:bg-amber-200 hover:text-black ${
      currPath === path ? "font-semibold underline underline-offset-4" : ""
    }`;

  return (
    <aside className="min-h-screen shadow-md p-4 text-gray-50 bg-amber-700">
      <div className="mb-4 text-center pb-4 border-b-2">
        <Link to="/admin/profile">
          <img
            src="/avatar.png"
            alt="logo"
            className="h-20 w-24 mx-auto cursor-pointer"
          />
        </Link>
        <span className="block mt-2 text-sm font-medium">{user.name}</span>
      </div>

      <nav className="space-y-3">
        <Link
          to="/admin/dashboard"
          className={navLinkClass("/admin/dashboard")}
        >
          Dashboard
        </Link>

        {user.role.toLowerCase() !== "store-manager" && (
          <Link to="/admin/users" className={navLinkClass("/admin/users")}>
            Manage Users
          </Link>
        )}

        <Link to="/admin/assets" className={navLinkClass("/admin/assets")}>
          Assets
        </Link>

        <Link
          to="/admin/consumables"
          className={navLinkClass("/admin/consumables")}
        >
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
                to="/admin/transactions/requests"
                className={navLinkClass("/admin/transactions/requests")}
              >
                User Requests
              </Link>
              <Link
                to="/admin/transactions/transits"
                className={navLinkClass("/admin/transactions/transits")}
              >
                Transit Requests
              </Link>
              <Link
                to="/admin/transactions/issuances"
                className={navLinkClass("/admin/transactions/issuances")}
              >
                Past Issuances
              </Link>
              <Link
                to="/admin/transactions/transfers"
                className={navLinkClass("/admin/transactions/transfers")}
              >
                Transfers
              </Link>
              <Link
                to="/admin/transactions/disposals"
                className={navLinkClass("/admin/transactions/disposals")}
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

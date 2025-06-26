import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, SquareArrowOutUpRight } from "lucide-react";
import { useUserStore } from "../store";

function Sidebar() {
  const location = useLocation();
  const currPath = location.pathname;

  const [transactDown, setTransactDown] = useState(() =>
    currPath.startsWith("/admin/transactions")
  );

  const { user } = useUserStore();

  const navLinkClass = (path) =>
    `block p-2 rounded hover:bg-zinc-800 ${
      currPath === path ? "underline underline-offset-6" : ""
    }`;

  return (
    <aside className="h-screen overflow-y-auto shadow-md p-4 text-gray-50 bg-neutral-600">
      <div className="text-center pb-4 space-y-2">
        <Link to="/admin/profile">
          <img
            src="/avatar.png"
            alt="logo"
            className="h-20 w-24 mx-auto cursor-pointer"
          />
        </Link>
      </div>

      <div className="pb-4 mb-1 text-center text-sm">
        <a href="/user" className="hover:underline hover:underline-offset-4">
          <SquareArrowOutUpRight className="inline-block mr-1 pb-1" size={20} />
          Open as user page
        </a>
      </div>

      <nav className="space-y-3">
        <Link
          to="/admin/dashboard"
          className={navLinkClass("/admin/dashboard")}
        >
          Dashboard
        </Link>

        <Link to="/admin/users" className={navLinkClass("/admin/users")}>
          Manage Users
        </Link>

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
            className={`w-full text-left p-2 mb-1 rounded hover:bg-neutral-800 ${
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
              <Link
                to="/admin/transactions/issuances"
                className={navLinkClass("/admin/transactions/issuances")}
              >
                Past Issuances
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;

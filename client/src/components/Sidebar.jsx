import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useUserStore } from "../store/useUserStore.js";

// active tab underline

function Sidebar() {
  const [dashboardDown, setDashboardDown] = useState(false);
  const [transactDown, setTransactDown] = useState(false);
  const { user } = useUserStore();

  return (
    <aside className="h-screen w-56 shadow-md p-4 text-white bg-amber-600">
      <div className="mb-4 text-center">
        <Link to="/">
          <img
            src="/avatar.png"
            alt="logo"
            className="h-20 w-24 mx-auto cursor-pointer"
          />
        </Link>
        <span className="block mt-2 text-sm font-medium">
          {user?.name || "Mangal Murti"}
        </span>
      </div>

      <nav className="space-y-3">
        <div>
          <button
            onClick={(e) => setDashboardDown(!dashboardDown)}
            className={`w-full text-left px-3 py-3 rounded hover:bg-amber-200 hover:text-black`}
          >
            Dashboard{" "}
            <ChevronDown
              size={18}
              strokeWidth={3}
              className="inline-block mb-0.5"
            />
          </button>
          {dashboardDown && (
            <div className="ml-4 space-y-2">
              <Link
                to="/dashboard/hrd"
                className="block italic px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
              >
                HRD IT STORE
              </Link>
              <Link
                to="/dashboard/crd"
                className="block italic px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
              >
                CRD IT STORE
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/assets"
          className="block italic px-3 py-2 rounded hover:bg-amber-200 hover:text-black"
        >
          Assets
        </Link>
        <Link
          to="/consumables"
          className="block italic px-3 py-2 rounded hover:bg-amber-200 hover:text-black"
        >
          Consumables
        </Link>

        <div>
          <button
            onClick={() => setTransactDown(!transactDown)}
            className={`w-full text-left px-3 py-3 rounded hover:bg-amber-200 hover:text-black`}
          >
            Transactions{" "}
            <ChevronDown
              size={18}
              strokeWidth={3}
              className="inline-block mb-0.5"
            />
          </button>
          {transactDown && (
            <div className="ml-4 space-y-2">
              <Link
                to="/transaction/transfers"
                className="block italic px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
              >
                Transfers
              </Link>
              <Link
                to="/transaction/requests"
                className="block italic px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
              >
                Requests
              </Link>
              <Link
                to="/transaction/issuances"
                className="block italic px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
              >
                Past Issuances
              </Link>
              <Link
                to="/transaction/disposals"
                className="block italic px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
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

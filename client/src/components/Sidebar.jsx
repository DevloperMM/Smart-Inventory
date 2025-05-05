import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [dashboardDown, setDashboardDown] = useState(false);
  const [transactDown, setTransactDown] = useState(false);

  return (
    <aside className="h-screen w-64 shadow-md p-4 text-white bg-amber-700">
      <Link to="/">
        <img
          src="/image.png"
          alt="logo"
          className="w-full mx-auto mb-6 cursor-pointer"
        />
      </Link>
      <nav className="space-y-3">
        {/* Dashboard Dropdown */}
        <div>
          <button
            onClick={() => setDashboardDown(!dashboardDown)}
            className="w-full text-left px-3 py-2 rounded hover:bg-amber-200 hover:text-black font-bold"
          >
            Dashboard
          </button>
          {dashboardDown && (
            <div className="ml-4 space-y-2">
              <Link
                to="/dashboard/hrd"
                className="block px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
              >
                Hot Rolling Store
              </Link>
              <Link
                to="/dashboard/crd"
                className="block px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
              >
                Cold Rolling Store
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/assets"
          className="block px-3 py-2 rounded hover:bg-amber-200 hover:text-black"
        >
          Assets
        </Link>
        <Link
          to="/consumables"
          className="block px-3 py-2 rounded hover:bg-amber-200 hover:text-black"
        >
          Consumables
        </Link>

        <div>
          <button
            onClick={() => setTransactDown(!transactDown)}
            className="w-full text-left px-3 py-2 rounded hover:bg-amber-200 hover:text-black font-bold"
          >
            Transactions
          </button>
          {transactDown && (
            <div className="ml-4 space-y-2">
              <Link
                to="/transaction/transfers"
                className="block px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
              >
                Transfers
              </Link>
              <Link
                to="/transaction/requests"
                className="block px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
              >
                Requests
              </Link>
              <Link
                to="/transaction/issuances"
                className="block px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
              >
                Past Issuances
              </Link>
              <Link
                to="/transaction/disposals"
                className="block px-3 py-1 rounded hover:bg-amber-200 hover:text-black"
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

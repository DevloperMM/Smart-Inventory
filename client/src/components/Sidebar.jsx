import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

// active tab underline

function Sidebar() {
  const [dashboardDown, setDashboardDown] = useState(false);
  const [transactDown, setTransactDown] = useState(false);

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
        <span className="block mt-2 text-sm font-medium">Mangal Murti</span>
      </div>

      <nav className="space-y-3">
        <div>
          <button
            onClick={(e) => setDashboardDown(!dashboardDown)}
            className={`w-full text-left p-2 mb-1 rounded hover:bg-amber-200 hover:text-black`}
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
                className="block p-2 rounded hover:bg-amber-200 hover:text-black"
              >
                IT Store (HRD)
              </Link>
              <Link
                to="/dashboard/crd"
                className="block p-2 rounded hover:bg-amber-200 hover:text-black"
              >
                IT Store (CRD)
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/assets"
          className="block p-2 rounded hover:bg-amber-200 hover:text-black"
        >
          Assets
        </Link>

        <Link
          to="/consumables"
          className="block p-2 rounded hover:bg-amber-200 hover:text-black"
        >
          Consumables
        </Link>

        <div>
          <button
            onClick={() => setTransactDown(!transactDown)}
            className={`w-full text-left p-2 mb-1 rounded hover:bg-amber-200 hover:text-black`}
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
                className="block p-2 rounded hover:bg-amber-200 hover:text-black"
              >
                Transfers
              </Link>
              <Link
                to="/transaction/requests"
                className="block p-2 rounded hover:bg-amber-200 hover:text-black"
              >
                Requests
              </Link>
              <Link
                to="/transaction/issuances"
                className="block p-2 rounded hover:bg-amber-200 hover:text-black"
              >
                Past Issuances
              </Link>
              <Link
                to="/transaction/disposals"
                className="block p-2 rounded hover:bg-amber-200 hover:text-black"
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

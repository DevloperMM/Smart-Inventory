import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

function Sidebar() {
  const [transactDown, setTransactDown] = useState(false);

  const user = {
    role: "it-head",
  };

  return (
    <aside className="h-screen w-56 shadow-md p-4 text-white bg-amber-600">
      <div className="mb-4 text-center pb-4 border-b-2">
        <Link to="/user/profile">
          <img
            src="/avatar.png"
            alt="logo"
            className="h-20 w-24 mx-auto cursor-pointer"
          />
        </Link>
        <span className="block mt-2 text-sm font-medium">Mangal Murti</span>
      </div>

      <nav className="space-y-3">
        <Link
          to="/dashboard"
          className="block p-2 rounded hover:bg-amber-200 hover:text-black"
        >
          Dashboard
        </Link>

        {user.role.toLowerCase() !== "store-manager" && (
          <Link
            to="/users"
            className="block p-2 rounded hover:bg-amber-200 hover:text-black"
          >
            Manage Users
          </Link>
        )}

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
                to="/requests"
                className="block p-2 rounded hover:bg-amber-200 hover:text-black"
              >
                User Requests
              </Link>
              <Link
                to="/transits"
                className="block p-2 rounded hover:bg-amber-200 hover:text-black"
              >
                Transit Requests
              </Link>
              <Link
                to="/issuances"
                className="block p-2 rounded hover:bg-amber-200 hover:text-black"
              >
                Past Issuances
              </Link>
              <Link
                to="/transfers"
                className="block p-2 rounded hover:bg-amber-200 hover:text-black"
              >
                Transfers
              </Link>
              <Link
                to="/disposals"
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

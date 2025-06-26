import { Link } from "react-router-dom";

export default function UserPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-fuchsia-100 to-emerald-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-cyan-700">
          Welcome to the IT Inventory System
        </h1>
        <p className="text-gray-700 mt-2 text-lg">
          Quickly request, track, and see issued IT assets
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto min-h-75">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
          <img
            src="./my-requests.jpg"
            alt="Create Request"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 min-h-[150px]">
            <h2 className="text-xl font-semibold text-blue-700">
              Create New Request
            </h2>
            <p className="mt-2 text-gray-600">
              Request IT items directly from the team with a few clicks and
              track status
            </p>
            <Link to="/user/request/new">
              <button className="mt-6 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
                Request Item
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
          <img
            src="./request.jpg"
            alt="Create Request"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 min-h-[150px]">
            <h2 className="text-xl font-semibold text-green-700">
              My Requests
            </h2>
            <p className="mt-2 text-gray-600">
              Check all your item requests history and status directly
            </p>
            <Link to="/user/requests">
              <button className="mt-6 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition cursor-pointer">
                View requests
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
          <img
            src="./issue.png"
            alt="Create Request"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 min-h-[150px]">
            <h2 className="text-xl font-semibold text-amber-600">
              My Issuances
            </h2>
            <p className="mt-2 text-gray-600">
              See all your issued IT assets and consumables at one place
            </p>
            <Link to="/user/issuances">
              <button className="mt-6 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition cursor-pointer">
                View issuances
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

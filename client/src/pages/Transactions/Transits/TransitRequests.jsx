import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Eye, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../../../lib/constants";
import { format } from "date-fns";

const TransitRequests = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(3);

  const user = {
    role: "it-head",
  };

  const requests = [
    {
      id: 1,
      code: "TST-48736",
      category: "Mouse",
      requestedBy: "Suraj Kumar",
      requestedOn: "2025-05-01",
      status: "Pending",
    },
    {
      id: 2,
      code: "TST-25478",
      category: "Keyboard",
      requestedBy: "Rachin Ravindra",
      requestedOn: "2023-05-14",
      status: "Approved",
      resolvedOn: "2025-05-09",
      resolvedBy: "Shankar Sharma",
    },
    {
      id: 3,
      code: "TST-78453",
      category: "Monitor",
      requestedBy: "Farhan Qureshi",
      requestedOn: "2023-05-14",
      status: "Rejected",
      resolvedOn: "2025-05-09",
      resolvedBy: "Raju Rastogi",
    },
  ];

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transits List</h2>
        <button
          onClick={() => navigate("/transactions/transits/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" />
          Create Transit
        </button>
      </div>

      {/* Requests Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Requested By</th>
              <th className="border px-3 py-2">Requested On</th>
              <th className="border px-3 py-2">Purpose</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Decided by</th>
              <th className="border px-3 py-2">Decided On</th>
              <th className="border px-3 py-2 text-center">Actions</th>
            </tr>
            <tr className="bg-white text-xs">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                />
              </td>
              <td className="border p-2" />
              <td className="border p-2">
                <select className="w-full border px-1 py-1 rounded">
                  <option value="">Select</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Approved">Approved</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                />
              </td>
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {requests.map((request, i) => (
              <tr
                key={request.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-3 py-2">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">{request.category}</td>
                <td className="border px-3 py-2">{request.requestedBy}</td>
                <td className="border px-3 py-2">
                  {format(request.requestedOn, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    <Eye size={16} className="inline-block pb-0.5 mr-1.5" />
                    View
                  </span>
                </td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      statusColors[request.status]
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="border px-3 py-2"></td>
                <td className="border px-3 py-2"></td>
                <td className="border px-3 py-2 text-center">
                  {user.role.toLowerCase() === "it-head" &&
                  request.status === "Pending" ? (
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={(request) => (request.status = "Approved")}
                        className="bg-green-500 px-3 py-1 rounded-xl text-white hover:bg-green-600 disabled:bg-gray-400"
                      >
                        <Check strokeWidth={3} size={22} />
                      </button>
                      <button
                        onClick={(request) => (request.status = "Rejected")}
                        className="bg-red-400 px-3 py-1 rounded-xl text-white hover:bg-red-500 disabled:bg-gray-400"
                      >
                        <X strokeWidth={3} size={22} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center space-x-3">
                      <button
                        disabled={request.status !== "Approved"}
                        onClick={() =>
                          navigate(`/transactions/transits/${request.id}`)
                        }
                        className="w-full bg-teal-500 py-1.5 px-2.5 rounded-xl text-white hover:bg-teal-600 disabled:bg-gray-400"
                      >
                        {request.status !== "Rejected" ? (
                          <span>Issue</span>
                        ) : (
                          <span>N/A</span>
                        )}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="text-right text-sm text-gray-700 space-x-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer"
          disabled={page === 1}
        >
          <ChevronLeft size={14} />
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-2 py-1 border rounded disabled:opacity-50 cursor-pointer"
          disabled={page === 5}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default TransitRequests;

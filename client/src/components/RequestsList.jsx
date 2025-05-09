import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Approved: "text-green-600 bg-green-100",
  Rejected: "text-red-600 bg-red-100",
  Cancelled: "text-gray-600 text-gray-100",
  Pending: "text-yellow-600 bg-yellow-100",
};

const RequestsList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const requests = [
    {
      id: 1,
      code: "REQ-48736",
      category: "Mouse",
      requestedBy: "Suraj Kumar",
      requestedOn: "2025-05-01",
      status: "Pending",
    },
    {
      id: 2,
      code: "REQ-25478",
      category: "Keyboard",
      requestedBy: "Rachin Ravindra",
      requestedOn: "2023-05-14",
      status: "Approved",
    },
  ];

  return (
    <div className="p-6 bg-white text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold italic">IT Requests List</h2>
        <button
          onClick={() => navigate("/requests/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" />
          Create Request
        </button>
      </div>

      {/* Requests Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">#</th>
              <th className="border px-3 py-2 text-left">Request Code</th>
              <th className="border px-3 py-2 text-left">Category</th>
              <th className="border px-3 py-2 text-left">Requested By</th>
              <th className="border px-3 py-2 text-left">Requested On</th>
              <th className="border px-3 py-2 text-left">Status</th>
              <th className="border px-3 py-2 text-center">Actions</th>
            </tr>
            <tr className="bg-white text-xs">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 text-xs rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 text-xs rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 text-xs rounded"
                />
              </td>
              <td className="border p-2" />
              <td className="border p-2" />
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr
                key={request.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-3 py-2">{request.id}</td>
                <td className="border px-3 py-2">{request.code}</td>
                <td className="border px-3 py-2">{request.category}</td>
                <td className="border px-3 py-2">{request.requestedBy}</td>
                <td className="border px-3 py-2">{request.requestedOn}</td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      statusColors[request.status]
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="border px-3 py-2 text-center">
                  <div className="flex justify-center space-x-3">
                    <button
                      disabled={request.status !== "Approved"}
                      onClick={() => navigate(`/requests/${request.id}`)}
                      className="bg-blue-500 py-2 px-4 rounded-xl text-white cursor-pointer hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      Issue
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="text-right mt-4 text-sm text-gray-700 space-x-3">
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

export default RequestsList;

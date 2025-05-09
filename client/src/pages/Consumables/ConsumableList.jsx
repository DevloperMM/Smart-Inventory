import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusColors = {
  InStore: "text-green-600 bg-green-100",
  AMC: "text-yellow-600 bg-yellow-100",
};

const ConsumableList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const consumables = [
    {
      id: 1,
      code: "ITEM-4587",
      name: "HP Wireless Mouse",
      category: "Mouse",
      purchaseDate: "2023-08-10",
      status: "InStore",
      location: "HRD",
    },
    {
      id: 2,
      code: "ITEM-5478",
      name: "Dell Keyboard",
      category: "Keyboard",
      purchaseDate: "2023-05-14",
      status: "AMC",
      location: "HRD",
    },
  ];

  return (
    <div className="p-6 bg-white text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold italic">Consumables List</h2>
        <button
          onClick={() => navigate("/consumables/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" /> Add Consumables
        </button>
      </div>

      {/* Consumables Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">#</th>
              <th className="border px-3 py-2 text-left">Item Code</th>
              <th className="border px-3 py-2 text-left">Description</th>
              <th className="border px-3 py-2 text-left">Category</th>
              <th className="border px-3 py-2 text-left">Purchase Date</th>
              <th className="border px-3 py-2 text-left">Status</th>
              <th className="border px-3 py-2 text-left">Location</th>
            </tr>
            <tr className="bg-white">
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
              <td className="border p-2" />
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {consumables.map((consumable, index) => (
              <tr
                key={consumable.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-3 py-2">{consumable.id}</td>
                <td className="border px-3 py-2">{consumable.code}</td>
                <td className="border px-3 py-2">{consumable.name}</td>
                <td className="border px-3 py-2">{consumable.category}</td>
                <td className="border px-3 py-2">{consumable.purchaseDate}</td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      statusColors[consumable.status]
                    }`}
                  >
                    {consumable.status}
                  </span>
                </td>
                <td className="border px-3 py-2">{consumable.location}</td>
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

export default ConsumableList;

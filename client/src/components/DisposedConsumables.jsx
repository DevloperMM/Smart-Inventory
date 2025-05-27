import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockDisposedConsumables = [
  {
    id: 1,
    name: "Printer Cartridge",
    quantity: 5,
    disposalDate: "2025-04-01",
    reason: "Expired",
    disposedBy: "Michael Scott",
  },
  {
    id: 2,
    name: "Ethernet Cables",
    quantity: 20,
    disposalDate: "2025-03-15",
    reason: "Damaged",
    disposedBy: "Pam Beesly",
  },
];

function DisposedConsumables() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);

  return (
    <div className="overflow-auto space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Consumable Disposes</h2>
        <button
          onClick={() => navigate("/transactions/disposals/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" />
          Create Dispose
        </button>
      </div>

      {/* Consumable Details */}
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border-b">Item Name</th>
            <th className="p-2 border-b">Quantity</th>
            <th className="p-2 border-b">Disposal Date</th>
            <th className="p-2 border-b">Reason</th>
            <th className="p-2 border-b">Disposed By</th>
          </tr>
        </thead>
        <tbody>
          {mockDisposedConsumables.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-2 border-b">{item.name}</td>
              <td className="p-2 border-b">{item.quantity}</td>
              <td className="p-2 border-b">{item.disposalDate}</td>
              <td className="p-2 border-b">{item.reason}</td>
              <td className="p-2 border-b">{item.disposedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
}

export default DisposedConsumables;

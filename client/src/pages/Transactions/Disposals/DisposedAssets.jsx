import { useState } from "react";
import { statusColors } from "../../../lib/constants";
import { ChevronLeft, ChevronRight, Eye, Plus } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const disposedAssets = [
  {
    id: 1,
    category: "Laptop",
    condition: "Retired",
    equipNo: "DL123456",
    raisedBy: "John Doe",
    raisedOn: "2025-04-10",
    status: "Pending",
    reason: "The asset has completed its life as per the company's norms",
  },
  {
    id: 2,
    category: "Monitor",
    equipNo: "MN454R23",
    condition: "Obsolete",
    raisedBy: "Kesh Pandey",
    raisedOn: "2025-03-07",
    approvedBy: "Bob Smith",
    approvedOn: "2025-04-29",
    status: "Sold",
    reason: "The asset has completed its life as per the company's norms",
  },
];

function DisposedAssets() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);

  return (
    <div className="overflow-auto space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Asset Disposes</h2>
        <button
          onClick={() => navigate("/admin/transactions/disposals/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" />
          Create Dispose
        </button>
      </div>

      {/* Asset Details */}
      <table className="w-full border border-gray-300 rounded-lg text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="border-r border-gray-300 p-3">#</th>
            <th className="border-r border-gray-300 p-3">Category</th>
            <th className="border-r border-gray-300 p-3">Serial No</th>
            <th className="border-r border-gray-300 p-3">Condition</th>
            <th className="border-r border-gray-300 p-3">Raised By</th>
            <th className="border-r border-gray-300 p-3">Raised On</th>
            <th className="border-r border-gray-300 p-3">Status</th>
            <th className="border-r border-gray-300 p-3">Approved By</th>
            <th className="border-r border-gray-300 p-3">Action</th>
            <th className="border-r border-gray-300 p-3 text-center">Info</th>
            {/* Info: Approved On, soldBy, soldOn */}
          </tr>
        </thead>
        <tbody>
          {disposedAssets.map((item, index) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="border-r border-gray-300 p-3">{index + 1}</td>
              <td className="border-r border-gray-300 p-3">{item.category}</td>
              <td className="border-r border-gray-300 p-3">{item.equipNo}</td>
              <td className="border-r border-gray-300 p-3">{item.condition}</td>
              <td className="border-r border-gray-300 p-3">{item.raisedBy}</td>
              <td className="border-r border-gray-300 p-3">
                {format(item.raisedOn, "dd/MM/yyyy")}
              </td>
              <td className="border-r border-gray-300 p-3">
                <span
                  className={`px-2 py-1 rounded-lg ${
                    statusColors[item.status]
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="border-r border-gray-300 p-3">
                {item.approvedBy || "-"}
              </td>
              <td className="border-r border-gray-300 p-3">
                <button
                  disabled={item.status === "Sold"}
                  className="w-fit bg-red-400 py-1.5 px-2.5 rounded-xl text-white hover:bg-red-500 disabled:bg-gray-400"
                >
                  {item.status === "Pending" ? (
                    <span>Sell out</span>
                  ) : (
                    <span>N/A</span>
                  )}
                </button>
              </td>
              <td className="border-r border-gray-300 p-3 text-center">
                <button className="text-gray-600 hover:text-black">
                  <Eye size={20} />
                </button>
              </td>
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

export default DisposedAssets;

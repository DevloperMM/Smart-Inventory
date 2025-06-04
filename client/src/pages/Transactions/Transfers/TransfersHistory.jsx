import { useState } from "react";
import { statusColors } from "../../../lib/constants";
import { ChevronLeft, ChevronRight, Eye, Pencil, Plus } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const assets = [
  {
    id: 1,
    requestId: "REQ-47896",
    category: "Laptop",
    serialNo: "UEN72N82",
    equipNo: "9080003641",
    issuedTo: "John Doe",
    issuedBy: "Admin A",
    issuedOn: "2024-12-01",
    returnedOn: "2025-01-15",
    status: "Returned",
  },
  {
    id: 2,
    requestId: "REQ-78123",
    category: "Printer",
    serialNo: "B23JS73H",
    equipNo: "9080007428",
    issuedTo: "Jane Smith",
    issuedBy: "Admin B",
    issuedOn: "2025-03-20",
    status: "Issued",
  },
];

const initialState = {};

function TransfersHistory() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [msg, setMsg] = useState("");
  const [filterData, setFilterData] = useState({});

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <h2 className="text-2xl font-bold">Transfers List</h2>

      {/* Transfers Table */}
      <div className="overflow-auto">
        <table className="w-full border border-gray-300 rounded-lg text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Assets</th>
              <th className="p-3">Consumables</th>
              <th className="p-3">Transferred By</th>
              <th className="p-3">Transferred On</th>
              <th className="p-3">Received By</th>
              <th className="p-3">Received On</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
            <tr className="bg-white h-fit">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {assets.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{(page - 1) * rows + index + 1}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.serialNo}</td>
                <td className="p-3">{item.equipNo}</td>
                <td className="p-3">{item.issuedTo}</td>
                <td className="p-3">{item.issuedBy}</td>
                <td className="p-3">{format(item.issuedOn, "dd/MM/yyyy")}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      statusColors[item.status]
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div className="space-x-3">
                    <button
                      onClick={() => navigate(`/assets/${item.id}`)}
                      className="text-gray-600 hover:text-black"
                    >
                      <Eye size={20} />
                    </button>
                    <button className="text-gray-600 hover:text-black">
                      <Pencil size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {msg && <div className="text-center mt-4 text-red-500">{msg}</div>}

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

export default TransfersHistory;

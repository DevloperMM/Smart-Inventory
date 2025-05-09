import { useState, useMemo } from "react";
import {
  ArrowUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const sampleStocks = [
  {
    id: 1,
    category: "Laptop",
    storeId: 101,
    activeQty: 12,
    alertQty: 2,
    status: "InStock",
  },
  {
    id: 2,
    category: "Monitor",
    storeId: 102,
    activeQty: 4,
    alertQty: 2,
    status: "LowStock",
  },
  {
    id: 3,
    category: "Keyboard & Mouse Combo",
    storeId: 103,
    activeQty: 0,
    alertQty: 1,
    status: "OutStock",
  },
  {
    id: 4,
    category: "External Hard Drives",
    storeId: 101,
    activeQty: 8,
    alertQty: 3,
    status: "InStock",
  },
  {
    id: 5,
    category: "Ethernet Cables 5m Length",
    storeId: 104,
    activeQty: 2,
    alertQty: 2,
    status: "LowStock",
  },
  {
    id: 6,
    category: "HDMI to VGA Converters with Long Descriptions",
    storeId: 102,
    activeQty: 0,
    alertQty: 1,
    status: "OutStock",
  },
];

const statusColors = {
  InStock: "text-green-600 bg-green-100",
  LowStock: "text-yellow-600 bg-yellow-100",
  OutStock: "text-red-600 bg-red-100",
};

export default function Dashbaord() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    let data = sampleStocks.filter(
      (item) =>
        item.category.toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter ? item.status === statusFilter : true)
    );

    data.sort((a, b) => {
      const valA = a["storeId"];
      const valB = b["storeId"];
      if (typeof valA === "string") {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return sortAsc ? valA - valB : valB - valA;
    });

    return data;
  }, [search, statusFilter, sortAsc]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleSort = () => {
    setSortAsc(!sortAsc);
  };

  return (
    <div className="p-6 bg-white text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4 italic">IT Store Overview</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/assets/new")}
            className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
          >
            <Plus className="inline-block size-5 mb-1 mr-1" /> Add Asset
          </button>
          <button
            onClick={() => navigate("/consumables/new")}
            className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
          >
            <Plus className="inline-block size-5 mb-1 mr-1" /> Add Consumables
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 border rounded-md px-3 py-2 w-full sm:max-w-xs">
          <Search size={18} />
          <input
            className="w-full outline-none"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative inline-block w-36">
          <select
            className="appearance-none w-full border border-gray-300 bg-white rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Select Status</option>
            <option value="InStock">In Stock</option>
            <option value="LowStock">Low Stock</option>
            <option value="OutStock">Out of Stock</option>
          </select>

          <ChevronDown className="absolute right-2.5 top-4/9 -translate-y-1/2 pointer-events-none text-gray-500 w-4 h-4" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full table-fixed text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="w-[5%] px-4 py-3 border-r text-center">#</th>
              <th className="w-[25%] px-4 py-3 border-r break-words whitespace-normal">
                Category
              </th>
              <th
                className="w-[15%] px-4 py-3 border-r cursor-pointer break-words whitespace-normal"
                onClick={() => toggleSort()}
              >
                <span className="flex items-center gap-1 capitalize">
                  Store <ArrowUpDown className="w-4 h-4" />
                </span>
              </th>
              <th className="w-[15%] px-4 py-3 border-r break-words whitespace-normal">
                Store Qty
              </th>
              <th className="w-[15%] px-4 py-3 border-r break-words whitespace-normal">
                Alert Qty
              </th>
              <th className="w-[20%] px-4 py-3 break-words whitespace-normal">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 border-r text-center">
                  {(currentPage - 1) * rowsPerPage + i + 1}
                </td>
                <td className="px-4 py-3 border-r break-words whitespace-normal">
                  {item.category}
                </td>
                <td className="px-4 py-3 border-r break-words whitespace-normal">
                  {item.storeId}
                </td>
                <td className="px-4 py-3 border-r break-words whitespace-normal">
                  {item.activeQty}
                </td>
                <td className="px-4 py-3 border-r break-words whitespace-normal">
                  {item.alertQty}
                </td>
                <td className="px-4 py-3 break-words whitespace-normal">
                  <span
                    className={`px-2 py-1 rounded font-medium ${
                      statusColors[item.status]
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="space-x-2 mt-4 text-right">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-2 py-1 rounded border cursor-pointer disabled:opacity-50"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="mb-2">{currentPage}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-2 py-1 rounded border cursor-pointer disabled:opacity-50"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from "react";
import { ArrowUpDown, Search, ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../../lib/constants.js";
import { PageFooter, StockAlertColumn } from "../../components/index.js";

const storeData = [
  {
    id: 1,
    type: "Asset",
    category: "Laptop",
    storeId: 1,
    storeQty: 12,
    alertQty: 1,
    status: "InStock",
  },
  {
    id: 2,
    type: "Asset",
    category: "Laptop",
    storeId: 2,
    storeQty: 1,
    alertQty: 4,
    status: "LowStock",
  },
  {
    id: 3,
    type: "Asset",
    category: "Monitor",
    storeId: 1,
    storeQty: 0,
    alertQty: 7,
    status: "OutStock",
  },
  {
    id: 4,
    type: "Asset",
    category: "Monitor",
    storeId: 1,
    storeQty: 8,
    alertQty: 2,
    status: "InStock",
  },
  {
    id: 5,
    type: "Consumable",
    category: "Ethernet Cable",
    storeId: 2,
    storeQty: 5,
    alertQty: 3,
    status: "InStock",
  },
  {
    id: 6,
    type: "Consumable",
    category: "Ethernet Cable",
    storeId: 1,
    storeQty: 1,
    alertQty: 3,
    status: "LowStock",
  },
  {
    id: 7,
    type: "Consumable",
    category: "HDMI Cable",
    storeId: 1,
    storeQty: 0,
    alertQty: 1,
    status: "OutStock",
  },
  {
    id: 8,
    type: "Consumable",
    category: "HDMI Cable",
    storeId: 1,
    storeQty: 3,
    alertQty: 2,
    status: "InStock",
  },
  {
    id: 9,
    type: "Consumable",
    category: "Mouse",
    storeId: 1,
    storeQty: 0,
    alertQty: 1,
    status: "OutStock",
  },
  {
    id: 10,
    type: "Consumable",
    category: "Mouse",
    storeId: 2,
    storeQty: 6,
    alertQty: 5,
    status: "InStock",
  },
  {
    id: 11,
    type: "Consumable",
    category: "Keyboard",
    storeId: 1,
    storeQty: 3,
    alertQty: 0,
    status: "LowStock",
  },
  {
    id: 12,
    type: "Consumable",
    category: "Keyboard",
    storeId: 2,
    storeQty: 7,
    alertQty: 4,
    status: "InStock",
  },
  {
    id: 13,
    type: "Asset",
    category: "Docking Station",
    storeId: 1,
    storeQty: 2,
    alertQty: 2,
    status: "LowStock",
  },
  {
    id: 14,
    type: "Asset",
    category: "Docking Station",
    storeId: 2,
    storeQty: 5,
    alertQty: 1,
    status: "InStock",
  },
  {
    id: 15,
    type: "Asset",
    category: "Tablet",
    storeId: 2,
    storeQty: 0,
    alertQty: 1,
    status: "OutStock",
  },
  {
    id: 16,
    type: "Asset",
    category: "Tablet",
    storeId: 1,
    storeQty: 10,
    alertQty: 3,
    status: "InStock",
  },
  {
    id: 17,
    type: "Consumable",
    category: "Power Adapter",
    storeId: 2,
    storeQty: 0,
    alertQty: 2,
    status: "OutStock",
  },
  {
    id: 18,
    type: "Consumable",
    category: "Power Adapter",
    storeId: 2,
    storeQty: 3,
    alertQty: 2,
    status: "LowStock",
  },
  {
    id: 19,
    type: "Consumable",
    category: "SSD",
    storeId: 1,
    storeQty: 4,
    alertQty: 2,
    status: "InStock",
  },
  {
    id: 20,
    type: "Consumable",
    category: "SSD",
    storeId: 1,
    storeQty: 0,
    alertQty: 1,
    status: "OutStock",
  },
];

export default function Dashbaord() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isSortAsc, setIsSortAsc] = useState(false);

  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState("");
  const [rows, setRows] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
  }, [search, status, rows]);

  const filteredData = useMemo(() => {
    let data = storeData
      .filter(
        (item) =>
          item.category.toLowerCase().includes(search.toLowerCase()) &&
          (status ? item.status === status : true)
      )
      .sort((a, b) =>
        isSortAsc ? b["storeId"] - a["storeId"] : a["storeId"] - b["storeId"]
      );

    return data;
  }, [search, status, isSortAsc]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  const handleAlertQtyChange = (id, newQty) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, alertQty: newQty } : item
      )
    );
  };

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">IT Store Overview</h2>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/admin/assets/new")}
            className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
          >
            <Plus className="inline-block size-5 mb-1 mr-1" /> Add Asset
          </button>
          <button
            onClick={() => navigate("/admin/consumables/new")}
            className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
          >
            <Plus className="inline-block size-5 mb-1 mr-1" /> Add Consumables
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 border rounded-md px-3 py-2 w-full sm:max-w-xs">
          <Search size={18} />
          <input
            className="w-full outline-none"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative inline-block w-38">
          <select
            className="appearance-none w-full border border-gray-300 bg-white rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[5%] border px-4 py-3 text-center">#</th>
              <th className="w-[12%] border px-4 py-3">Item type</th>
              <th className="w-[22%] border px-4 py-3">Category</th>
              <th
                className="w-[15%] border px-4 py-3 cursor-pointer"
                onClick={() => setIsSortAsc(!isSortAsc)}
              >
                Store{" "}
                <ArrowUpDown size={15} strokeWidth={2.5} className="inline" />
              </th>
              <th className="w-[14%] border px-4 py-3">Store Qty</th>
              <th className="w-[16%] border px-4 py-3">Alert Qty</th>
              <th className="w-[16%] border px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="border px-4 py-3 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-4 py-3">{item.type}</td>
                <td className="border px-4 py-3">{item.category}</td>
                <td className="border px-4 py-3">
                  {item.storeId === 1 ? "HRD" : "CRD"}
                </td>
                <td className="border px-4 py-3">{item.storeQty}</td>
                <td className="border px-4 py-3">
                  <StockAlertColumn
                    item={item}
                    onQtyChange={handleAlertQtyChange}
                  />
                </td>
                <td className="border px-4 py-3">
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

      {msg && <div className="text-center mt-4 text-red-500">{msg}</div>}

      {/* Pagination */}
      {!msg && (
        <PageFooter
          rows={rows}
          page={page}
          setPage={setPage}
          setRows={setRows}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

import { useState, useMemo, useEffect } from "react";
import { ArrowUpDown, Search, ChevronDown } from "lucide-react";
import { statusColors } from "../../lib/constants.js";
import { LoadRecords, PageFooter, StockAlertColumn } from "../../components";
import { useStockStore } from "../../store";

export default function Dashbaord() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isSortAsc, setIsSortAsc] = useState(false);

  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState("");
  const [rows, setRows] = useState(10);

  const { stockLoading, storeData, getStockData, modifyAlert } =
    useStockStore();

  useEffect(() => {
    getStockData();
  }, []);

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
  }, [search, status, isSortAsc, storeData]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  if (stockLoading) return <LoadRecords />;

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      <h2 className="text-2xl font-bold">IT Store Overview</h2>

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
                <td className="border px-4 py-3">{item.itemType}</td>
                <td className="border px-4 py-3">
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </td>
                <td className="border px-4 py-3">
                  {item.storeId === 1 ? "HRD" : "CRD"}
                </td>
                <td className="border px-4 py-3">{item.storeQty}</td>
                <td className="border px-4 py-3">
                  <StockAlertColumn
                    item={item}
                    onQtyChange={(id, newQty) => {
                      modifyAlert(id, newQty);
                    }}
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

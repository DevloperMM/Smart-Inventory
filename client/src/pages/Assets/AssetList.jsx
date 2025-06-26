import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, Eye, Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../../lib/constants.js";
import { LoadRecords, PageFooter } from "../../components";
import { format } from "date-fns";
import { useAssetStore } from "../../store/index.js";

// TODO: fetch all brand options for using in select

const initialState = {
  category: "",
  description: "",
  mfgBy: "",
  serialNo: "",
  stockedBy: "",
  createdAt: "",
  status: "",
  storeId: "",
};

const AssetList = () => {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const [filterData, setFilterData] = useState(initialState);

  const { assets, fetchingAssets, getAssets } = useAssetStore();

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    let data = assets
      .filter((item) =>
        Object.entries(filterData).every(([key, value]) => {
          if (!value) return true;
          if (key === "storeId") return item.storeId === Number(value);
          if (key === "createdAt") {
            const createdDate = format(new Date(item.createdAt), "dd-MM-yyyy");
            const valueDate = format(new Date(value), "dd-MM-yyyy");
            return createdDate === valueDate;
          }

          return item[key]?.toLowerCase().includes(value.trim().toLowerCase());
        })
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return isSortAsc ? dateA - dateB : dateB - dateA;
      });

    return data;
  }, [filterData, isSortAsc, assets]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  if (fetchingAssets) return <LoadRecords />;

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Assets List</h2>
        <button
          onClick={() => navigate("/admin/assets/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" /> Add Asset
        </button>
      </div>

      {/* Assets Table */}
      <div className="overflow-auto">
        <table className="max-w-screen text-sm border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[4%] border px-3 py-2 text-center">#</th>
              <th className="w-[10%] border px-3 py-2">Category</th>
              <th className="w-[25%] border px-3 py-2">Description</th>
              <th className="w-[7%] border px-3 py-2">Brand</th>
              <th className="w-[14%] border px-3 py-2">Serial No</th>
              <th
                className="w-[11%] border px-3 py-2 cursor-pointer break-words whitespace-normal"
                onClick={() => setIsSortAsc(!isSortAsc)}
              >
                <span className="flex items-center gap-1 capitalize">
                  Stocked On <ArrowUpDown className="w-4 h-4" />
                </span>
              </th>
              <th className="w-[12%] border px-3 py-2">Status</th>
              <th className="w-[9%] border px-3 py-2">Store</th>
              <th className="w-[8%] border px-3 py-2 text-center">Actions</th>
            </tr>
            <tr className="bg-white h-fit">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.category}
                  onChange={(e) =>
                    setFilterData({ ...filterData, category: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.description}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={filterData.mfgBy}
                  onChange={(e) =>
                    setFilterData({ ...filterData, mfgBy: e.target.value })
                  }
                  className="w-full border p-1 rounded"
                >
                  <option value="">Select</option>
                  <option value="HP">HP</option>
                  <option value="Dell">Dell</option>
                  <option value="Apple">Apple</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.serialNo}
                  onChange={(e) =>
                    setFilterData({ ...filterData, serialNo: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={filterData.createdAt}
                  onChange={(e) =>
                    setFilterData({ ...filterData, createdAt: e.target.value })
                  }
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={filterData.status}
                  onChange={(e) =>
                    setFilterData({ ...filterData, status: e.target.value })
                  }
                  className="w-full border p-1 rounded"
                >
                  <option value="">Select</option>
                  <option value="available">Available</option>
                  <option value="issued">Issued</option>
                  <option value="amc">Maintenance</option>
                  <option value="in-transit">InTransit</option>
                  <option value="disposed">Disposed</option>
                  <option value="sold">Sold</option>
                </select>
              </td>
              <td className="border p-2">
                <select
                  value={filterData.storeId}
                  onChange={(e) =>
                    setFilterData({ ...filterData, storeId: e.target.value })
                  }
                  className="w-full border p-1 rounded"
                >
                  <option value="">Select</option>
                  <option value={1}>HRD</option>
                  <option value={2}>CRD</option>
                </select>
              </td>
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {pageData.map((asset, i) => (
              <tr
                key={i + 1}
                className={`h-12 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">{asset.category}</td>
                <td className="border px-3 py-2">{asset.description}</td>
                <td className="border px-3 py-2">{asset.mfgBy}</td>
                <td className="border px-3 py-2">{asset.serialNo}</td>
                <td className="border px-3 py-2">
                  {format(new Date(asset.createdAt), "dd MMM yyyy")}
                </td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      statusColors[asset.status]
                    }`}
                  >
                    {asset.status.toLowerCase()}
                  </span>
                </td>
                <td className="border px-3 py-2">
                  {asset.storeId === 1 ? <span>HRD</span> : <span>CRD</span>}
                </td>
                <td className="border px-3 py-2">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => navigate(`/admin/assets/${asset.id}`)}
                      className="text-gray-600 hover:text-black"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/assets/edit/${asset.id}`)}
                      className="text-gray-600 hover:text-black"
                    >
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
      {!msg && (
        <PageFooter
          rows={rows}
          page={page}
          setRows={setRows}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default AssetList;

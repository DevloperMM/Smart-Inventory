import { useEffect, useMemo, useState } from "react";
import { Eye, Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../../lib/constants.js";
import { PageFooter } from "../../components";
import { format } from "date-fns";

const assets = [
  {
    id: 1,
    category: "Laptop",
    description: "Dell Latitude 7420",
    mfgBy: "Dell",
    serialNo: "DL7420-AX1234",
    stockedOn: "2024-09-01",
    stockedBy: "Jane Smith",
    status: "Available",
    location: 1,
  },
  {
    id: 2,
    category: "Monitor",
    description: 'Samsung 27" Curved',
    mfgBy: "HP",
    serialNo: "SM27C-BX7890",
    stockedOn: "2024-10-15",
    stockedBy: "John Doe",
    status: "Issued",
    location: 2,
  },
  {
    id: 3,
    category: "Printer",
    description: "HP LaserJet Pro M404n",
    mfgBy: "HP",
    serialNo: "HP404N-ZY6543",
    stockedOn: "2023-12-22",
    stockedBy: "Ali Khan",
    status: "AMC",
    location: 1,
  },
  {
    id: 4,
    category: "Router",
    description: "TP-Link Archer AX6000",
    mfgBy: "Dell",
    serialNo: "TPLAX6000-RT1123",
    stockedOn: "2024-06-09",
    stockedBy: "Lisa Ray",
    status: "Available",
    location: 2,
  },
  {
    id: 5,
    category: "Keyboard",
    description: "Logitech MX Keys",
    mfgBy: "HP",
    serialNo: "LOGMX-KEYS88",
    stockedOn: "2025-01-05",
    stockedBy: "Raj Mehta",
    status: "Disposed",
    location: 1,
  },
  {
    id: 6,
    category: "Webcam",
    description: "Logitech C920 HD",
    mfgBy: "HP",
    serialNo: "LOGC920-HD3321",
    stockedOn: "2023-11-30",
    stockedBy: "Jane Smith",
    status: "Sold",
    location: 2,
  },
  {
    id: 7,
    category: "Switch",
    description: "Cisco Catalyst 2960",
    mfgBy: "Dell",
    serialNo: "CIS2960-AB2233",
    stockedOn: "2024-08-10",
    stockedBy: "John Doe",
    status: "AMC",
    location: 1,
  },
  {
    id: 8,
    category: "Tablet",
    description: "Apple iPad Air",
    mfgBy: "Apple",
    serialNo: "APLIPAD-AIR567",
    stockedOn: "2024-05-18",
    stockedBy: "Ali Khan",
    status: "Issued",
    location: 2,
  },
  {
    id: 9,
    category: "Projector",
    description: "Epson EX3260",
    mfgBy: "HP",
    serialNo: "EPS3260-PJ999",
    stockedOn: "2024-02-03",
    stockedBy: "Lisa Ray",
    status: "Available",
    location: 1,
  },
  {
    id: 10,
    category: "Headphones",
    description: "Sony WH-1000XM4",
    mfgBy: "Dell",
    serialNo: "SONYXM4-HP001",
    stockedOn: "2025-03-21",
    stockedBy: "Raj Mehta",
    status: "Sold",
    location: 2,
  },
];

const initialState = {
  category: "",
  description: "",
  mfgBy: "",
  serialNo: "",
  stockedBy: "",
  stockedOn: "",
  status: "",
  location: "",
};

const AssetList = () => {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [filterData, setFilterData] = useState(initialState);

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    setMsg("");

    let data = assets.filter((item) =>
      Object.entries(filterData).every(([key, value]) => {
        if (!value) return true;
        if (key === "location") return item.location === Number(value);
        if (key === "stockedOn") return item.stockedOn === value;

        return item[key]?.toLowerCase().includes(value.toLowerCase());
      })
    );

    setMsg(data.length ? "" : "No records found");
    return data;
  }, [filterData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Assets List</h2>
        <button
          onClick={() => navigate("/assets/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" /> Add Asset
        </button>
      </div>

      {/* Assets Table */}
      <div className="overflow-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr className="h-12">
              <th className="w-[4%] border px-3 py-2 text-center">#</th>
              <th className="w-[8%] border px-3 py-2 text-left">Category</th>
              <th className="w-[18%] border px-3 py-2 text-left">
                Description
              </th>
              <th className="w-[7%] border px-3 py-2 text-left">
                Manufacturer
              </th>
              <th className="w-[14%] border px-3 py-2 text-left">Serial No</th>
              <th className="w-[11%] border px-3 py-2 text-left">Stocked On</th>
              <th className="w-[11%] border px-3 py-2 text-left">Stocked By</th>
              <th className="w-[11%] border px-3 py-2 text-left">Status</th>
              <th className="w-[8%] border px-3 py-2 text-left">Location</th>
              <th className="w-[8%] border px-3 py-2 text-center">Actions</th>
            </tr>
            <tr className="bg-white text-xs h-12">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.category}
                  onChange={(e) =>
                    setFilterData({ ...filterData, category: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 text-xs rounded"
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
                  className="w-full border px-1 py-1 text-xs rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={filterData.mfgBy}
                  onChange={(e) =>
                    setFilterData({ ...filterData, mfgBy: e.target.value })
                  }
                  className="w-full border px-1 py-1 text-xs rounded"
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
                  className="w-full border px-1 py-1 text-xs rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={filterData.stockedOn}
                  onChange={(e) =>
                    setFilterData({ ...filterData, stockedOn: e.target.value })
                  }
                  className="w-full border px-1 py-1 text-xs rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.stockedBy}
                  onChange={(e) =>
                    setFilterData({ ...filterData, stockedBy: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 text-xs rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={filterData.status}
                  onChange={(e) =>
                    setFilterData({ ...filterData, status: e.target.value })
                  }
                  className="w-full border px-1 py-1 text-xs rounded"
                >
                  <option value="">Select</option>
                  <option value="Available">Available</option>
                  <option value="Issued">Issued</option>
                  <option value="AMC">AMC</option>
                  <option value="Disposed">Disposed</option>
                  <option value="Sold">Sold</option>
                </select>
              </td>
              <td className="border p-2">
                <select
                  value={filterData.location}
                  onChange={(e) =>
                    setFilterData({ ...filterData, location: e.target.value })
                  }
                  className="w-full border px-1 py-1 text-xs rounded"
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
                  {format(asset.stockedOn, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">{asset.stockedBy}</td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      statusColors[asset.status]
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="border px-3 py-2">
                  {asset.location === 1 ? <span>HRD</span> : <span>CRD</span>}
                </td>
                <td className="border px-3 py-2">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => navigate(`/assets/${asset.id}`)}
                      className="text-gray-600 hover:text-black"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => navigate(`/assets/edit/${asset.id}`)}
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

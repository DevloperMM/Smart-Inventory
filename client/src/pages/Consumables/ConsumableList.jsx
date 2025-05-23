import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Plus, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../../lib/constants.js";
import { PageFooter } from "../../components";
import { format } from "date-fns";

const initialState = {
  category: "",
  specs: "",
  qty: "",
  updatedBy: "",
  updatedOn: "",
  amcVendor: "",
  location: "",
  status: "",
};

const consumables = [
  {
    id: "C001",
    category: "USB Drive",
    specs: "SanDisk 32GB USB 3.0",
    qty: 50,
    updatedQty: 60,
    updatedBy: "John Doe",
    updatedOn: "2025-05-10",
    location: 1,
    status: "Unused",
    amcVendor: "TechNova",
  },
  {
    id: "C002",
    category: "HDMI Cable",
    specs: "1.5m, Gold Plated",
    qty: 30,
    updatedQty: 40,
    updatedBy: "Jane Smith",
    updatedOn: "2025-05-11",
    location: 2,
    status: "Vendor",
    amcVendor: "ElectroMart",
  },
  {
    id: "C003",
    category: "Ethernet Cable",
    specs: "Cat6, 3m",
    qty: 75,
    updatedQty: 85,
    updatedBy: "John Doe",
    updatedOn: "2025-05-12",
    location: 1,
    status: "Used",
    amcVendor: "GigaSupplies",
  },
  {
    id: "C004",
    category: "AA Battery",
    specs: "Duracell, Pack of 4",
    qty: 100,
    updatedQty: 110,
    updatedBy: "Alice Green",
    updatedOn: "2025-05-08",
    location: 2,
    status: "Unused",
    amcVendor: "ByteWare",
  },
  {
    id: "C005",
    category: "Mouse Pad",
    specs: "Standard, Black",
    qty: 45,
    updatedQty: 55,
    updatedBy: "Bob Taylor",
    updatedOn: "2025-05-10",
    location: 1,
    status: "Unused",
    amcVendor: "MegaParts",
  },
  {
    id: "C006",
    category: "Keyboard Cover",
    specs: "Universal Silicone",
    qty: 20,
    updatedQty: 30,
    updatedBy: "Jane Smith",
    updatedOn: "2025-05-11",
    location: 2,
    status: "Used",
    amcVendor: "SmartSource",
  },
  {
    id: "C007",
    category: "Laptop Stand",
    specs: "Adjustable Aluminum",
    qty: 15,
    updatedQty: 25,
    updatedBy: "Alice Green",
    updatedOn: "2025-05-09",
    location: 2,
    status: "Vendor",
    amcVendor: "SupplyHub",
  },
  {
    id: "C008",
    category: "Cleaning Wipes",
    specs: "Alcohol-based, 50 pcs",
    qty: 60,
    updatedQty: 70,
    updatedBy: "John Doe",
    updatedOn: "2025-05-10",
    location: 1,
    status: "Unused",
    amcVendor: "CoreTech",
  },
  {
    id: "C009",
    category: "HDMI Splitter",
    specs: "1x2, 4K Support",
    qty: 10,
    updatedQty: 20,
    updatedBy: "Jane Smith",
    updatedOn: "2025-05-12",
    location: 2,
    status: "Used",
    amcVendor: "NeoVendors",
  },
  {
    id: "C010",
    category: "USB Hub",
    specs: "4-Port, USB 3.0",
    qty: 25,
    updatedQty: 35,
    updatedBy: "Bob Taylor",
    updatedOn: "2025-05-11",
    location: 1,
    status: "Vendor",
    amcVendor: "InfoLine",
  },
  {
    id: "C011",
    category: "Printer Ink",
    specs: "HP 682 Black",
    qty: 18,
    updatedQty: 28,
    updatedBy: "John Doe",
    updatedOn: "2025-05-13",
    location: 2,
    status: "Unused",
    amcVendor: "TechNova",
  },
  {
    id: "C012",
    category: "Label Tape",
    specs: "12mm, Black on White",
    qty: 22,
    updatedQty: 32,
    updatedBy: "Alice Green",
    updatedOn: "2025-05-10",
    location: 1,
    status: "Used",
    amcVendor: "ElectroMart",
  },
  {
    id: "C013",
    category: "SSD Enclosure",
    specs: "2.5'' SATA to USB 3.0",
    qty: 12,
    updatedQty: 22,
    updatedBy: "Jane Smith",
    updatedOn: "2025-05-09",
    location: 2,
    status: "Unused",
    amcVendor: "GigaSupplies",
  },
  {
    id: "C014",
    category: "Thermal Paste",
    specs: "1g Syringe",
    qty: 40,
    updatedQty: 50,
    updatedBy: "Bob Taylor",
    updatedOn: "2025-05-13",
    location: 1,
    status: "Vendor",
    amcVendor: "ByteWare",
  },
  {
    id: "C015",
    category: "Cable Ties",
    specs: "100 pcs, 6 inch",
    qty: 150,
    updatedQty: 160,
    updatedBy: "Alice Green",
    updatedOn: "2025-05-08",
    location: 2,
    status: "Used",
    amcVendor: "MegaParts",
  },
  {
    id: "C016",
    category: "DisplayPort Cable",
    specs: "1.8m, v1.4",
    qty: 25,
    updatedQty: 35,
    updatedBy: "John Doe",
    updatedOn: "2025-05-11",
    location: 1,
    status: "Unused",
    amcVendor: "SmartSource",
  },
  {
    id: "C017",
    category: "Mouse",
    specs: "Wired, Optical, USB",
    qty: 35,
    updatedQty: 45,
    updatedBy: "Jane Smith",
    updatedOn: "2025-05-12",
    location: 1,
    status: "Vendor",
    amcVendor: "SupplyHub",
  },
  {
    id: "C018",
    category: "Keyboard",
    specs: "Wired, USB",
    qty: 30,
    updatedQty: 40,
    updatedBy: "Bob Taylor",
    updatedOn: "2025-05-10",
    location: 2,
    status: "Used",
    amcVendor: "CoreTech",
  },
  {
    id: "C019",
    category: "Monitor Cleaner",
    specs: "Spray + Microfiber Cloth",
    qty: 20,
    updatedQty: 30,
    updatedBy: "Alice Green",
    updatedOn: "2025-05-09",
    location: 1,
    status: "Unused",
    amcVendor: "NeoVendors",
  },
  {
    id: "C020",
    category: "RJ45 Connector",
    specs: "Pack of 100",
    qty: 90,
    updatedQty: 100,
    updatedBy: "John Doe",
    updatedOn: "2025-05-13",
    location: 2,
    status: "Vendor",
    amcVendor: "InfoLine",
  },
];

const ConsumableList = () => {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [filterData, setFilterData] = useState(initialState);

  const filteredData = useMemo(() => {
    setMsg("");

    let data = consumables.filter((item) =>
      Object.entries(filterData).every(([key, value]) => {
        if (!value) return true;
        if (["updatedOn", "status"].includes(key)) return item[key] === value;
        if (["location", "qty"].includes(key))
          return item[key] === Number(value);

        return item[key]?.toLowerCase().includes(value.toLowerCase());
      })
    );

    setMsg(data.length ? "" : "No records found");
    return data;
  }, [filterData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Consumables List</h2>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/consumables/new")}
            className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
          >
            <Plus className="inline-block size-5 mb-1 mr-1" /> Add Consumables
          </button>
          <button
            onClick={() => navigate("/consumables/new")}
            className="bg-yellow-500 hover:bg-amber-400 text-white p-2 rounded-lg cursor-pointer"
          >
            <SquarePen className="inline-block size-5 mb-1 mr-1" /> Mark Vendor
          </button>
        </div>
      </div>

      {/* Consumables Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-[4%] border px-3 py-2">#</th>
              <th className="w-[12%] border px-3 py-2 text-left">Category</th>
              <th className="w-[20%] border px-3 py-2 text-left">
                Specifications
              </th>
              <th className="w-[8%] border px-3 py-2 text-left">Quantity</th>
              <th className="w-[15%] border px-3 py-2 text-left">Updated By</th>
              <th className="w-[10%] border px-3 py-2 text-left">Updated On</th>
              <th className="w-[12%] border px-3 py-2 text-left">AMC Vendor</th>
              <th className="w-[10%] border px-3 py-2 text-left">Status</th>
              <th className="w-[9%] border px-3 py-2 text-left">Location</th>
              {/* <th className="border px-3 py-2">Actions</th> */}
            </tr>
            <tr className="bg-white">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                  value={filterData.category}
                  onChange={(e) =>
                    setFilterData({ ...filterData, category: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                  value={filterData.specs}
                  onChange={(e) =>
                    setFilterData({ ...filterData, specs: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                  value={filterData.qty}
                  onChange={(e) =>
                    setFilterData({ ...filterData, qty: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                  value={filterData.updatedBy}
                  onChange={(e) =>
                    setFilterData({ ...filterData, updatedBy: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 text-xs rounded"
                  value={filterData.updatedOn}
                  onChange={(e) =>
                    setFilterData({ ...filterData, updatedOn: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                  value={filterData.amcVendor}
                  onChange={(e) =>
                    setFilterData({ ...filterData, amcVendor: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <div className="relative inline-block w-full">
                  <select
                    className="appearance-none w-full border px-1 py-1 text-xs rounded"
                    value={filterData.status}
                    onChange={(e) =>
                      setFilterData({ ...filterData, status: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option value="Unused">Unused</option>
                    <option value="Used">Used</option>
                    <option value="Vendor">Vendor</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-4/9 -translate-y-1/2 pointer-events-none text-black size-4" />
                </div>
              </td>
              <td className="border p-2">
                <div className="relative inline-block w-full">
                  <select
                    className="appearance-none w-full border px-1 py-1 text-xs rounded"
                    value={filterData.location}
                    onChange={(e) =>
                      setFilterData({ ...filterData, location: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option value={1}>HRD</option>
                    <option value={2}>CRD</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-4/9 -translate-y-1/2 pointer-events-none text-black size-4" />
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {pageData.map((consumable, i) => (
              <tr
                key={i + 1}
                className={`h-12 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">{consumable.category}</td>
                <td className="border px-3 py-2">{consumable.specs}</td>
                <td className="border px-3 py-2">{consumable.qty}</td>
                <td className="border px-3 py-2">{consumable.updatedBy}</td>
                <td className="border px-3 py-2">
                  {format(consumable.updatedOn, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">{consumable.amcVendor}</td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      statusColors[consumable.status]
                    }`}
                  >
                    {consumable.status}
                  </span>
                </td>
                <td className="border px-3 py-2">
                  {consumable.location === 1 ? (
                    <span>HRD</span>
                  ) : (
                    <span>CRD</span>
                  )}
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
};

export default ConsumableList;

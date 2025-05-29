import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  Pencil,
  Plus,
  PlusSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageFooter } from "../../components";
import { format } from "date-fns";

const initialState = {
  category: "",
  specs: "",
  updatedBy: "",
  updatedOn: "",
  location: "",
};

const consumables = [
  {
    id: "C001",
    category: "USB Drive",
    specs: "SanDisk 32GB USB 3.0",
    newStock: 50,
    oldStock: 10,
    totalStock: 60,
    updatedBy: "John Doe",
    updatedOn: "2025-05-10",
    location: 1,
  },
  {
    id: "C002",
    category: "HDMI Cable",
    specs: "1.5m, Gold Plated",
    newStock: 30,
    oldStock: 5,
    totalStock: 35,
    updatedBy: "Jane Smith",
    updatedOn: "2025-05-11",
    location: 2,
  },
  {
    id: "C003",
    category: "Ethernet Cable",
    specs: "Cat6, 3m",
    newStock: 75,
    oldStock: 8,
    totalStock: 83,
    updatedBy: "John Doe",
    updatedOn: "2025-05-12",
    location: 1,
  },
  {
    id: "C004",
    category: "AA Battery",
    specs: "Duracell, Pack of 4",
    newStock: 100,
    oldStock: 12,
    totalStock: 112,
    updatedBy: "Alice Green",
    updatedOn: "2025-05-08",
    location: 2,
  },
  {
    id: "C005",
    category: "Mouse Pad",
    specs: "Standard, Black",
    newStock: 45,
    oldStock: 6,
    totalStock: 51,
    updatedBy: "Bob Taylor",
    updatedOn: "2025-05-10",
    location: 1,
  },
  {
    id: "C006",
    category: "Keyboard Cover",
    specs: "Universal Silicone",
    newStock: 20,
    oldStock: 9,
    totalStock: 29,
    updatedBy: "Jane Smith",
    updatedOn: "2025-05-11",
    location: 2,
  },
  {
    id: "C007",
    category: "Laptop Stand",
    specs: "Adjustable Aluminum",
    newStock: 15,
    oldStock: 4,
    totalStock: 19,
    updatedBy: "Alice Green",
    updatedOn: "2025-05-09",
    location: 2,
  },
  {
    id: "C008",
    category: "Cleaning Wipes",
    specs: "Alcohol-based, 50 pcs",
    newStock: 60,
    oldStock: 7,
    totalStock: 67,
    updatedBy: "John Doe",
    updatedOn: "2025-05-10",
    location: 1,
  },
  {
    id: "C009",
    category: "HDMI Splitter",
    specs: "1x2, 4K Support",
    newStock: 10,
    oldStock: 3,
    totalStock: 13,
    updatedBy: "Jane Smith",
    updatedOn: "2025-05-12",
    location: 2,
  },
  {
    id: "C010",
    category: "USB Hub",
    specs: "4-Port, USB 3.0",
    newStock: 25,
    oldStock: 11,
    totalStock: 36,
    updatedBy: "Bob Taylor",
    updatedOn: "2025-05-11",
    location: 1,
  },
  {
    id: "C011",
    category: "Printer Ink",
    specs: "HP 682 Black",
    newStock: 18,
    oldStock: 2,
    totalStock: 20,
    updatedBy: "John Doe",
    updatedOn: "2025-05-13",
    location: 2,
  },
  {
    id: "C012",
    category: "Label Tape",
    specs: "12mm, Black on White",
    newStock: 22,
    oldStock: 6,
    totalStock: 28,
    updatedBy: "Alice Green",
    updatedOn: "2025-05-10",
    location: 1,
  },
  {
    id: "C013",
    category: "SSD Enclosure",
    specs: "2.5'' SATA to USB 3.0",
    newStock: 12,
    oldStock: 7,
    totalStock: 19,
    updatedBy: "Jane Smith",
    updatedOn: "2025-05-09",
    location: 2,
  },
  {
    id: "C014",
    category: "Thermal Paste",
    specs: "1g Syringe",
    newStock: 40,
    oldStock: 5,
    totalStock: 45,
    updatedBy: "Bob Taylor",
    updatedOn: "2025-05-13",
    location: 1,
  },
  {
    id: "C015",
    category: "Cable Ties",
    specs: "100 pcs, 6 inch",
    newStock: 150,
    oldStock: 15,
    totalStock: 165,
    updatedBy: "Alice Green",
    updatedOn: "2025-05-08",
    location: 2,
  },
  {
    id: "C016",
    category: "DisplayPort Cable",
    specs: "1.8m, v1.4",
    newStock: 25,
    oldStock: 9,
    totalStock: 34,
    updatedBy: "John Doe",
    updatedOn: "2025-05-11",
    location: 1,
  },
  {
    id: "C017",
    category: "Mouse",
    specs: "Wired, Optical, USB",
    newStock: 35,
    oldStock: 14,
    totalStock: 49,
    updatedBy: "Jane Smith",
    updatedOn: "2025-05-12",
    location: 1,
  },
  {
    id: "C018",
    category: "Keyboard",
    specs: "Wired, USB",
    newStock: 30,
    oldStock: 10,
    totalStock: 40,
    updatedBy: "Bob Taylor",
    updatedOn: "2025-05-10",
    location: 2,
  },
  {
    id: "C019",
    category: "Monitor Cleaner",
    specs: "Spray + Microfiber Cloth",
    newStock: 20,
    oldStock: 5,
    totalStock: 25,
    updatedBy: "Alice Green",
    updatedOn: "2025-05-09",
    location: 1,
  },
  {
    id: "C020",
    category: "RJ45 Connector",
    specs: "Pack of 100",
    newStock: 90,
    oldStock: 6,
    totalStock: 96,
    updatedBy: "John Doe",
    updatedOn: "2025-05-13",
    location: 2,
  },
];

const ConsumableList = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [isUsed, setIsUsed] = useState(null);

  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const [filterData, setFilterData] = useState(initialState);

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    let data = consumables.filter((item) =>
      Object.entries(filterData).every(([key, value]) => {
        if (!value) return true;
        if (["updatedOn"].includes(key)) return item[key] === value;
        if (key === "location") return item[key] === Number(value);

        return item[key]?.toLowerCase().includes(value.toLowerCase());
      })
    );

    data.sort((a, b) => {
      const dateA = new Date(a.updatedOn);
      const dateB = new Date(b.updatedOn);
      return isSortAsc ? dateA - dateB : dateB - dateA;
    });

    return data;
  }, [filterData, isSortAsc]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Consumables List</h2>
        <button
          onClick={() => navigate("/consumables/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" /> Add Consumables
        </button>
      </div>

      {/* Consumables Table */}
      <div className="overflow-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[4%] border px-3 py-2">#</th>
              <th className="w-[12%] border px-3 py-2">Category</th>
              <th className="w-[20%] border px-3 py-2">Specifications</th>
              <th className="w-[13%] border px-3 py-2">Last Updated By</th>
              <th
                className="w-[8%] border px-3 py-2 cursor-pointer break-words whitespace-normal"
                onClick={() => setIsSortAsc(!isSortAsc)}
              >
                <span className="flex items-center gap-1 capitalize">
                  Updated On <ArrowUpDown className="w-4 h-4" />
                </span>
              </th>
              <th className="w-[9%] border px-3 py-2">New Stock</th>
              <th className="w-[9%] border px-3 py-2">Used Stock</th>
              <th className="w-[9%] border px-3 py-2">Total Stock</th>
              <th className="w-[8%] border px-3 py-2">Location</th>
              <th className="w-[8%] border px-3 py-2 text-center">Actions</th>
            </tr>
            <tr className="bg-white h-fit">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
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
                  className="w-full border p-1 rounded"
                  value={filterData.specs}
                  onChange={(e) =>
                    setFilterData({ ...filterData, specs: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
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
                  className="w-full border p-1 rounded"
                  value={filterData.updatedOn}
                  onChange={(e) =>
                    setFilterData({ ...filterData, updatedOn: e.target.value })
                  }
                />
              </td>
              <td className="border p-2" />
              <td className="border p-2" />
              <td className="border p-2" />
              <td className="border p-2">
                <div className="relative inline-block w-full">
                  <select
                    className="appearance-none w-full border p-1 rounded"
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
              <td className="border p-2" />
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
                <td className="border px-3 py-2">{consumable.updatedBy}</td>
                <td className="border px-3 py-2">
                  {format(consumable.updatedOn, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">{consumable.newStock}</td>
                <td className="border px-3 py-2">{consumable.oldStock}</td>
                <td className="border px-3 py-2">
                  {consumable.oldStock + consumable.newStock}
                </td>
                <td className="border px-3 py-2">
                  {consumable.location === 1 ? (
                    <span>HRD</span>
                  ) : (
                    <span>CRD</span>
                  )}
                </td>
                <td className="border px-3 py-2 text-center hover:text-black">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => {
                        setModalType("edit");
                        setSelectedItem(consumable);
                        setInputValue(consumable.specs);
                        setShowModal(true);
                      }}
                      className="text-gray-600 hover:text-black"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setModalType("increase");
                        setSelectedItem(consumable);
                        setInputValue("");
                        setShowModal(true);
                      }}
                      className="text-gray-600 hover:text-black"
                    >
                      <PlusSquare size={20} />
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
          setPage={setPage}
          setRows={setRows}
          totalPages={totalPages}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {modalType === "edit" ? "Specifications" : "Quantity"}
            </h3>

            <input
              type={modalType === "edit" ? "text" : "number"}
              className="w-full border rounded p-2"
              placeholder={
                modalType === "edit"
                  ? "Enter new specs..."
                  : "Add quantity in store..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            {modalType === "increase" && (
              <div className="flex flex-row gap-2 justify-between items-center">
                <span className="text-sm text-gray-700">
                  Whether the consumable is/are used
                  <span className="text-red-500">*</span>
                </span>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="isUsed"
                      value="true"
                      checked={isUsed === "true"}
                      onChange={() => setIsUsed("true")}
                      required
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="isUsed"
                      value="false"
                      checked={isUsed === "false"}
                      onChange={() => setIsUsed("false")}
                      required
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  console.log(`${selectedItem.id}, ${inputValue}, ${isUsed}`);
                  setIsUsed(null);
                  setSelectedItem(null);
                  setShowModal(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumableList;

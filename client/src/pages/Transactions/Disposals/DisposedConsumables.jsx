import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../../../store/useUserStore";
import { statusColors } from "../../../lib/constants";
import { Check, Eye, X } from "lucide-react";
import { Modal, PageFooter } from "../../../components";
import { format } from "date-fns";

const disposedConsumables = [
  {
    id: 1,
    qty: 3,
    isUsed: true,
    condition: "damaged",
    raisedOn: "2025-06-01T09:00:00.000Z",
    reason: "Expired toner cartridges",
    decidedOn: "2025-06-02T10:00:00.000Z",
    decisionInfo: "Approved for disposal",
    soldOn: null,
    soldInfo: null,
    status: "disposed",
    deletedAt: null,
    consumable: {
      category: "Printer Cartridge",
      specs: "HP 12A Black",
      storeId: 1,
    },
    requester: {
      name: "Rathore",
    },
    decider: {
      name: "Bhim",
    },
    seller: null,
  },
  {
    id: 2,
    qty: 1,
    isUsed: false,
    condition: "retired",
    raisedOn: "2025-06-03T08:30:00.000Z",
    reason: "Obsolete cable type",
    decidedOn: null,
    decisionInfo: null,
    soldOn: null,
    soldInfo: null,
    status: "pending",
    deletedAt: null,
    consumable: {
      category: "Cable",
      specs: "VGA 1.5m",
      storeId: 2,
    },
    requester: {
      name: "Singh",
    },
    decider: null,
    seller: null,
  },
  {
    id: 3,
    qty: 4,
    isUsed: true,
    condition: "damaged",
    raisedOn: "2025-06-04T07:20:00.000Z",
    reason: "Physically damaged",
    decidedOn: "2025-06-05T09:15:00.000Z",
    decisionInfo: "Send to scrap",
    soldOn: null,
    soldInfo: null,
    status: "disposed",
    deletedAt: null,
    consumable: {
      category: "Mouse",
      specs: "Dell MS116",
      storeId: 1,
    },
    requester: {
      name: "Kumar",
    },
    decider: {
      name: "Bhim",
    },
    seller: null,
  },
  {
    id: 4,
    qty: 2,
    isUsed: false,
    condition: "retired",
    raisedOn: "2025-06-05T10:00:00.000Z",
    reason: "Never used, too old",
    decidedOn: null,
    decisionInfo: null,
    soldOn: null,
    soldInfo: null,
    status: "pending",
    deletedAt: null,
    consumable: {
      category: "Keyboard",
      specs: "TVS Gold",
      storeId: 2,
    },
    requester: {
      name: "Rathore",
    },
    decider: null,
    seller: null,
  },
  {
    id: 5,
    qty: 1,
    isUsed: true,
    condition: "damaged",
    raisedOn: "2025-06-06T09:30:00.000Z",
    reason: "Water damaged",
    decidedOn: "2025-06-06T13:00:00.000Z",
    decisionInfo: "Approved for disposal",
    soldOn: "2025-06-07T11:00:00.000Z",
    soldInfo: "Sold for scrap",
    status: "sold",
    deletedAt: null,
    consumable: {
      category: "Router",
      specs: "TP-Link N300",
      storeId: 1,
    },
    requester: {
      name: "Meena",
    },
    decider: {
      name: "Bhim",
    },
    seller: {
      name: "Bhim",
    },
  },
  {
    id: 6,
    qty: 6,
    isUsed: false,
    condition: "retired",
    raisedOn: "2025-06-06T14:20:00.000Z",
    reason: "Surplus items",
    decidedOn: "2025-06-07T09:00:00.000Z",
    decisionInfo: "Donation approved",
    soldOn: null,
    soldInfo: null,
    status: "disposed",
    deletedAt: null,
    consumable: {
      category: "Pendrive",
      specs: "Sandisk 32GB",
      storeId: 2,
    },
    requester: {
      name: "Rathore",
    },
    decider: {
      name: "Bhim",
    },
    seller: null,
  },
  {
    id: 7,
    qty: 5,
    isUsed: true,
    condition: "damaged",
    raisedOn: "2025-06-07T15:00:00.000Z",
    reason: "Short circuit",
    decidedOn: "2025-06-08T09:30:00.000Z",
    decisionInfo: "Scrap immediately",
    soldOn: null,
    soldInfo: null,
    status: "disposed",
    deletedAt: null,
    consumable: {
      category: "Adapter",
      specs: "HP 65W",
      storeId: 1,
    },
    requester: {
      name: "Kumar",
    },
    decider: {
      name: "Bhim",
    },
    seller: null,
  },
  {
    id: 8,
    qty: 2,
    isUsed: false,
    condition: "retired",
    raisedOn: "2025-06-08T11:15:00.000Z",
    reason: "Unboxed but unused",
    decidedOn: null,
    decisionInfo: null,
    soldOn: null,
    soldInfo: null,
    status: "pending",
    deletedAt: null,
    consumable: {
      category: "Cable",
      specs: "HDMI 2m",
      storeId: 1,
    },
    requester: {
      name: "Rathore",
    },
    decider: null,
    seller: null,
  },
  {
    id: 9,
    qty: 3,
    isUsed: true,
    condition: "damaged",
    raisedOn: "2025-06-09T09:00:15.871Z",
    reason: "End of life",
    decidedOn: "2025-06-09T09:02:19.914Z",
    decisionInfo: "Testing comments",
    soldOn: "2025-06-09T09:05:51.354Z",
    soldInfo: "Testing selling consumable",
    status: "sold",
    deletedAt: null,
    consumable: {
      category: "Keyboard",
      specs: "Logitech K120",
      storeId: 2,
    },
    requester: {
      name: "Rathore",
    },
    decider: {
      name: "Bhim",
    },
    seller: {
      name: "Bhim",
    },
  },
  {
    id: 10,
    qty: 2,
    isUsed: false,
    condition: "retired",
    raisedOn: "2025-06-10T10:00:00.000Z",
    reason: "Cancelled by requestor",
    decidedOn: null,
    decisionInfo: null,
    soldOn: null,
    soldInfo: null,
    status: "cancelled",
    deletedAt: null,
    consumable: {
      category: "Pen Drive",
      specs: "Kingston 16GB",
      storeId: 1,
    },
    requester: {
      name: "Ajay",
    },
    decider: null,
    seller: null,
  },
  {
    id: 11,
    qty: 1,
    isUsed: true,
    condition: "damaged",
    raisedOn: "2025-06-11T11:00:00.000Z",
    reason: "Fake report",
    decidedOn: "2025-06-11T12:00:00.000Z",
    decisionInfo: "Rejected due to no proof",
    soldOn: null,
    soldInfo: null,
    status: "rejected",
    deletedAt: null,
    consumable: {
      category: "Cable",
      specs: "USB-C to USB",
      storeId: 2,
    },
    requester: {
      name: "Rathore",
    },
    decider: {
      name: "Bhim",
    },
    seller: null,
  },
];

const initialState = {
  category: "",
  condition: "",
  requester: "",
  decider: "",
  storeId: "",
  status: "",
  raisedOn: "",
};

function DisposedConsumables() {
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [show, setShow] = useState(false);

  const [selectedDispose, setSelectedDispose] = useState({});
  const [filterData, setFilterData] = useState(initialState);

  const { user } = useUserStore();

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    let data = disposedConsumables
      .filter((item) =>
        Object.entries(filterData).every(([key, value]) => {
          let search = item[key];

          if (!value) return true;
          if (key === "raisedOn") return item.raisedOn === value;
          if (key === "storeId")
            return item.consumable[key] === parseInt(value);
          if (key === "category") search = item.consumable[key];
          if (["requester", "decider", "seller"].includes(key))
            search = item[key]?.name;

          return search?.toLowerCase().includes(value.trim().toLowerCase());
        })
      )
      .sort((a, b) => {
        const dateA = new Date(a.raisedOn);
        const dateB = new Date(b.raisedOn);
        return dateA - dateB;
      });

    return data;
  }, [filterData]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  return (
    <>
      <div className="overflow-auto">
        {/* Consumable Details */}
        <table className="max-w-screen lg:w-full border border-gray-300 rounded-lg text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[5%] border px-3 py-2 text-center">#</th>
              <th className="w-[14%] border px-3 py-2">Category</th>
              <th className="w-[10%] border px-3 py-2">Condition</th>
              <th className="w-[7%] border px-3 py-2 text-center">Quantity</th>
              <th className="w-[13%] border px-3 py-2">Raised By</th>
              <th className="w-[12%] border px-3 py-2">Location</th>
              <th className="w-[10%] border px-3 py-2">Status</th>
              <th className="w-[13%] border px-3 py-2">Decided By</th>
              <th className="w-[10%] border px-3 py-2">Action</th>
              <th className="w-[5%] border px-3 py-2 text-center">Details</th>
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
                <select
                  value={filterData.condition}
                  onChange={(e) =>
                    setFilterData({ ...filterData, condition: e.target.value })
                  }
                  className="w-full border p-1 rounded"
                >
                  <option value="">Select</option>
                  <option value="retired">Retired</option>
                  <option value="damaged">Damaged</option>
                </select>
              </td>
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.requester}
                  onChange={(e) =>
                    setFilterData({ ...filterData, requester: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  className="w-full border p-1 rounded"
                  value={filterData.storeId}
                  onChange={(e) =>
                    setFilterData({ ...filterData, storeId: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value={1}>HRD</option>
                  <option value={2}>CRD</option>
                </select>
              </td>
              <td className="border p-2">
                <select
                  value={filterData.status}
                  onChange={(e) =>
                    setFilterData({ ...filterData, status: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                >
                  <option value="">Select</option>
                  <option value="pending">Pending</option>
                  <option value="disposed">Disposed</option>
                  <option value="rejected">Rejected</option>
                  <option value="sold">Sold</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={filterData.decider}
                  onChange={(e) =>
                    setFilterData({ ...filterData, decider: e.target.value })
                  }
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2" />
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, i) => (
              <tr
                key={i + 1}
                className={`${
                  i % 2 === 0 ? "bg-white h-12" : "bg-gray-50 h-12"
                }`}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">
                  {item.consumable.category.charAt(0).toUpperCase() +
                    item.consumable.category.slice(1)}
                </td>
                <td className="border px-3 py-2">
                  {item.condition.charAt(0).toUpperCase() +
                    item.condition.slice(1)}
                </td>
                <td className="border px-3 py-2 text-center">{item.qty}</td>
                <td className="border px-3 py-2">{item.requester.name}</td>
                <td className="border px-3 py-2">
                  {item.consumable.storeId === 1 ? "HRD" : "CRD"}
                </td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      statusColors[
                        item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)
                      ]
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="border px-3 py-2">{item.decider?.name || ""}</td>
                <td className="border px-3 py-2 text-center">
                  {user.storeManaging === 0 && item.status === "pending" ? (
                    <div className="flex justify-between">
                      <button
                        onClick={(item) => (item.status = "Approved")}
                        className="bg-green-500 px-2 py-1.5 rounded-xl text-white hover:bg-green-600 disabled:bg-gray-400"
                      >
                        <Check strokeWidth={2} size={22} />
                      </button>
                      <button
                        onClick={(item) => (item.status = "Rejected")}
                        className="bg-red-400 px-2 py-1.5 rounded-xl text-white hover:bg-red-500 disabled:bg-gray-400"
                      >
                        <X strokeWidth={2} size={22} />
                      </button>
                    </div>
                  ) : ["disposed", "pending"].includes(item.status) ? (
                    <button
                      disabled={item.status !== "disposed"}
                      className="w-full bg-purple-400 px-1 py-1.5 text-base rounded-xl text-white hover:bg-purple-500 disabled:bg-gray-400"
                    >
                      <span>Sell out</span>
                    </button>
                  ) : item.status === "sold" ? (
                    <div className="inline-block w-full bg-red-100 text-black text-sm font-semibold px-1 py-1.5 rounded-xl border-2 border-red-500 shadow-md relative">
                      <span className="block text-center tracking-wide">
                        Sold
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
                <td className="border px-3 py-2 text-center">
                  <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => {
                      setSelectedDispose(item);
                      setShow(true);
                    }}
                  >
                    <Eye size={20} />
                  </button>
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

      {show && (
        <Modal
          show={show}
          onClose={() => setShow(false)}
          data={{
            "Raised On":
              selectedDispose?.raisedOn &&
              format(selectedDispose.raisedOn, "MMM dd, yyyy"),
            "Raised For": selectedDispose?.reason || "",
            "Decided On": selectedDispose?.decidedOn
              ? format(selectedDispose.decidedOn, "MMM dd, yyyy")
              : "",
            "Decision Comments": selectedDispose.decisionInfo || "",
            "Sold By": selectedDispose?.seller?.name || "",
            "Sold On": selectedDispose?.soldOn
              ? format(selectedDispose.soldOn, "MMM dd, yyyy")
              : "",
            "Selling Info": selectedDispose.soldInfo || "",
          }}
        />
      )}
    </>
  );
}

export default DisposedConsumables;

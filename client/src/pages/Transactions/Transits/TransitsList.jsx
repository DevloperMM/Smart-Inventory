import { useState, useMemo, useEffect } from "react";
import { Check, Eye, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../../../lib/constants";
import { format } from "date-fns";
import { PageFooter, Modal } from "../../../components";
import { useUserStore } from "../../../store/useUserStore";

const transits = [
  {
    transitId: "TR-1001",
    items: [
      { category: "Laptops", qty: 2 },
      { category: "Cables", qty: 30 },
      { category: "Webcams", qty: 4 },
    ],
    description: "Urgent transfer for new joinees",
    purpose: "Preparing workstations for onboarding",
    decisionComments: "Approved. Ensure tagging before dispatch.",
    fromStore: 1,
    toStore: 2,
    requestedBy: "Amit Sharma",
    decidedBy: "Ravi Mehta",
    status: "Approved",
    createdAt: new Date("2025-05-01T10:00:00Z"),
    updatedAt: new Date("2025-05-02T09:00:00Z"),
  },
  {
    transitId: "TR-1002",
    items: [{ category: "Mouse", qty: 10 }],
    description: "Accessories for training room",
    purpose: "Training lab setup at Store 1",
    decisionComments: "Approved and dispatched on priority.",
    fromStore: 2,
    toStore: 1,
    requestedBy: "Nisha Kapoor",
    decidedBy: "Ravi Mehta",
    status: "Approved",
    createdAt: new Date("2025-05-03T11:00:00Z"),
    updatedAt: new Date("2025-05-04T08:30:00Z"),
  },
  {
    transitId: "TR-1003",
    items: [
      { category: "Monitors", qty: 4 },
      { category: "HDMI Cables", qty: 8 },
    ],
    description: "Temporary allocation for event",
    purpose: "Visual aids needed for product launch",
    decisionComments: "",
    fromStore: 1,
    toStore: 2,
    requestedBy: "Kunal Singh",
    decidedBy: null,
    status: "Pending",
    createdAt: new Date("2025-05-05T09:30:00Z"),
    updatedAt: null,
  },
  {
    transitId: "TR-1004",
    items: [
      { category: "Printers", qty: 1 },
      { category: "Ink Cartridges", qty: 5 },
    ],
    description: "Printer shift due to space constraints",
    purpose: "Reorganizing Store 2 layout",
    decisionComments: "",
    fromStore: 2,
    toStore: 1,
    requestedBy: "Amit Sharma",
    decidedBy: null,
    status: "Pending",
    createdAt: new Date("2025-05-06T14:00:00Z"),
    updatedAt: null,
  },
  {
    transitId: "TR-1005",
    items: [
      { category: "Docking Stations", qty: 5 },
      { category: "Ethernet Cables", qty: 10 },
    ],
    description: "Setup for new project team",
    purpose: "Hardware setup for 10-member dev team",
    decisionComments: "Approved. Tag and log serials.",
    fromStore: 1,
    toStore: 2,
    requestedBy: "Ravi Mehta",
    decidedBy: "Amit Sharma",
    status: "Approved",
    createdAt: new Date("2025-05-07T10:00:00Z"),
    updatedAt: new Date("2025-05-08T10:00:00Z"),
  },
  {
    transitId: "TR-1006",
    items: [{ category: "Adapters", qty: 12 }],
    description: "Restocking supply",
    purpose: "Supply running low in main store",
    decisionComments: "Approved. Check quality of adapters.",
    fromStore: 2,
    toStore: 1,
    requestedBy: "Neha Joshi",
    decidedBy: "Nisha Kapoor",
    status: "Approved",
    createdAt: new Date("2025-05-09T11:15:00Z"),
    updatedAt: new Date("2025-05-10T12:00:00Z"),
  },
  {
    transitId: "TR-1007",
    items: [
      { category: "RAM Modules", qty: 6 },
      { category: "SSD Drives", qty: 4 },
    ],
    description: "Upgrading PCs",
    purpose: "Upgrade batch-2 developer machines",
    decisionComments: "Rejected. Supply insufficient.",
    fromStore: 1,
    toStore: 2,
    requestedBy: "Kunal Singh",
    decidedBy: "Ravi Mehta",
    status: "Rejected",
    createdAt: new Date("2025-05-11T08:45:00Z"),
    updatedAt: new Date("2025-05-12T09:00:00Z"),
  },
  {
    transitId: "TR-1008",
    items: [
      { category: "Hard Drives", qty: 8 },
      { category: "Drive Caddies", qty: 8 },
    ],
    description: "Backup equipment",
    purpose: "Data redundancy for archival systems",
    decisionComments: "Approved. Ensure offsite backup logging.",
    fromStore: 2,
    toStore: 1,
    requestedBy: "Amit Sharma",
    decidedBy: "Ravi Mehta",
    status: "Approved",
    createdAt: new Date("2025-05-12T13:20:00Z"),
    updatedAt: new Date("2025-05-13T15:00:00Z"),
  },
  {
    transitId: "TR-1009",
    items: [
      { category: "Webcams", qty: 15 },
      { category: "USB Hubs", qty: 10 },
    ],
    description: "Virtual meetings setup",
    purpose: "Enhancing remote communication",
    decisionComments: "",
    fromStore: 1,
    toStore: 2,
    requestedBy: "Ravi Mehta",
    decidedBy: null,
    status: "Pending",
    createdAt: new Date("2025-05-14T10:00:00Z"),
    updatedAt: null,
  },
  {
    transitId: "TR-1010",
    items: [
      { category: "Speakers", qty: 4 },
      { category: "Microphones", qty: 4 },
    ],
    description: "Conference room setup",
    purpose: "Upgrade AV setup",
    decisionComments: "Rejected due to equipment mismatch.",
    fromStore: 2,
    toStore: 1,
    requestedBy: "Neha Joshi",
    decidedBy: "Nisha Kapoor",
    status: "Rejected",
    createdAt: new Date("2025-05-14T14:00:00Z"),
    updatedAt: new Date("2025-05-15T08:30:00Z"),
  },
];

const initialState = {
  createdAt: "",
  updatedAt: "",
  fromStore: "",
  toStore: "",
  status: "",
};

const TransitsList = ({ setStep }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  const [filterData, setFilterData] = useState(initialState);
  const [selectedTransit, setSelectedTransit] = useState({});

  const { user } = useUserStore();

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    const filterOrder = {
      Pending: 0,
      Approved: 1,
      Rejected: 2,
    };

    let data = transits
      .filter((transit) =>
        Object.entries(filterData).every(([key, value]) => {
          if (!value) return true;
          if (key === "createdAt" || key === "updatedAt")
            return transit.createdAt === value;
          if (key === "fromStore" || key === "toStore")
            return transit[key] === parseInt(value);

          return transit[key]
            ?.toLowerCase()
            .includes(value.trim().toLowerCase());
        })
      )
      .sort((a, b) => {
        return filterOrder[a.status] - filterOrder[b.status];
      });

    return data;
  }, [filterData, transits]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transits List</h2>
        <button
          onClick={() => navigate("/admin/transactions/transits/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" />
          Create Transit
        </button>
      </div>

      {/* Requests Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[4%] border px-3 py-2 text-center">#</th>
              <th className="w-[24%] border px-3 py-2">
                <div className="flex justify-between px-1">
                  <span>Category</span>
                  <span>Qty</span>
                </div>
              </th>
              <th className="w-[8%] border px-3 py-2">Requested On</th>
              <th className="w-[8%] border px-3 py-2">Decided On</th>
              <th className="w-[12%] border px-3 py-2">From Store</th>
              <th className="w-[12%] border px-3 py-2">To Store</th>
              <th className="w-[12%] border px-3 py-2">Info</th>
              <th className="w-[10%] border px-3 py-2">Status</th>
              <th className="w-[10%] border px-3 py-2 text-center">Actions</th>
            </tr>
            <tr className="bg-white h-fit">
              <td className="border p-2" />
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.createdAt}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      createdAt: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.updatedAt}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      updatedAt: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2">
                <select
                  className="w-full border p-1 rounded"
                  value={filterData.fromStore}
                  onChange={(e) =>
                    setFilterData({ ...filterData, fromStore: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value={1}>HRD</option>
                  <option value={2}>CRD</option>
                </select>
              </td>
              <td className="border p-2">
                <select
                  className="w-full border p-1 rounded"
                  value={filterData.toStore}
                  onChange={(e) =>
                    setFilterData({ ...filterData, toStore: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value={1}>HRD</option>
                  <option value={2}>CRD</option>
                </select>
              </td>
              <td className="border p-2" />
              <td className="border p-2">
                <select
                  className="w-full border p-1 rounded"
                  value={filterData.status}
                  onChange={(e) =>
                    setFilterData({ ...filterData, status: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Approved">Approved</option>
                </select>
              </td>
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {pageData.map((transit, i) => (
              <tr
                key={i}
                className={`h-fit ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">
                  <div className="overflow-visible rounded divide-y">
                    {transit.items.map((item, i) => (
                      <div key={i} className="flex">
                        <span className="w-9/10 py-1 pr-2">
                          {item.category}
                        </span>
                        <span className="w-1/10 py-1 text-center">
                          {item.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="border px-3 py-2">
                  {format(transit.createdAt, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  {transit.updatedAt && format(transit.updatedAt, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  {transit.fromStore === 1 ? "HRD" : "CRD"}
                </td>
                <td className="border px-3 py-2">
                  {transit.toStore === 1 ? "HRD" : "CRD"}
                </td>
                <td className="border px-3 py-2">
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => {
                      setSelectedTransit(transit);
                      setShow(true);
                    }}
                  >
                    <Eye size={16} className="inline-block pb-0.5 mr-1.5" />
                    View
                  </span>
                </td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      statusColors[transit.status]
                    }`}
                  >
                    {transit.status}
                  </span>
                </td>
                <td className="border px-3 py-2 text-center">
                  {["admin", "it-head"].includes(user.role) &&
                  transit.status === "Pending" ? (
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleApprove(transit.id)}
                        className="bg-green-500 px-2 py-1.5 rounded-xl text-white hover:bg-green-600 disabled:bg-gray-400"
                      >
                        <Check strokeWidth={2.5} size={22} />
                      </button>
                      <button
                        onClick={() => handleReject(transit.id)}
                        className="bg-red-400 px-2 py-1.5 rounded-xl text-white hover:bg-red-500 disabled:bg-gray-400"
                      >
                        <X strokeWidth={2.5} size={22} />
                      </button>
                    </div>
                  ) : (
                    transit.status === "Rejected" || (
                      <button
                        disabled={
                          transit.status !== "Approved" ||
                          (user.role === "store-manager" &&
                            user.storeManaging !== transit.fromStore)
                        }
                        onClick={() => setStep(2)}
                        className="w-full bg-teal-500 px-1.5 py-1.5 text-base rounded-xl text-white hover:bg-teal-600 disabled:bg-gray-400"
                      >
                        <span>Transfer</span>
                      </button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {msg && <div className="text-center mt-4 text-red-500">{msg}</div>}

      {show && (
        <Modal
          show={show}
          onClose={() => setShow(false)}
          data={{
            "Requested By": selectedTransit.requestedBy,
            "Transit Purpose": selectedTransit.purpose,
            "Decided By": selectedTransit?.decidedBy || "Pending",
            "Decision Reason": selectedTransit?.decisionComments || "Pending",
          }}
        />
      )}
    </div>
  );
};

export default TransitsList;

import { useEffect, useMemo, useState } from "react";
import { statusColors } from "../../../lib/constants";
import { Check, Eye, X } from "lucide-react";
import { Modal, PageFooter } from "../../../components";
import { format } from "date-fns";
import { useUserStore } from "../../../store/useUserStore";

const disposedAssets = [
  {
    id: 2,
    condition: "retired",
    description: "Projector is broken and was not under accidental damage",
    raisedOn: "2025-05-23T04:50:56.692Z",
    decidedOn: "2025-05-23T04:51:41.303Z",
    decisionInfo: "On Vendor's recommendation",
    soldOn: null,
    soldInfo: null,
    status: "rejected",
    asset: {
      category: "projectors",
      serialNo: "EBX49SN2",
      storeId: 1,
    },
    requester: { name: "Vijay" },
    decider: { name: "Bhim" },
    seller: null,
  },
  {
    id: 3,
    condition: "damaged",
    description: "Keyboard keys are unresponsive",
    raisedOn: "2025-05-20T09:15:30.000Z",
    decidedOn: "2025-05-21T10:00:00.000Z",
    decisionInfo: "Confirmed by IT Inspection",
    soldOn: "2025-05-22T14:30:00.000Z",
    soldInfo: "Disposed via local vendor",
    status: "sold",
    asset: {
      category: "Keyboard",
      serialNo: "KBD2239SN",
      storeId: 2,
    },
    requester: { name: "Ravi" },
    decider: { name: "Anjali" },
    seller: { name: "Ravi" },
  },
  {
    id: 4,
    condition: "retired",
    description: "Old mouse model no longer compatible",
    raisedOn: "2025-04-18T11:45:00.000Z",
    decidedOn: "2025-04-19T08:10:00.000Z",
    decisionInfo: "Obsolete hardware",
    soldOn: null,
    soldInfo: null,
    status: "disposed",
    asset: {
      category: "Mouse",
      serialNo: "MSE0048SN",
      storeId: 1,
    },
    requester: { name: "Preeti" },
    decider: { name: "Karan" },
    seller: null,
  },
  {
    id: 5,
    condition: "damaged",
    description: "RAM module physically damaged during transport",
    raisedOn: "2025-06-01T07:22:00.000Z",
    decidedOn: "2025-06-02T09:00:00.000Z",
    decisionInfo: "Photos and proof verified",
    soldOn: "2025-06-03T11:30:00.000Z",
    soldInfo: "Returned to vendor under warranty",
    status: "sold",
    asset: {
      category: "RAM",
      serialNo: "RAM8263XZ",
      storeId: 3,
    },
    requester: { name: "Ajay" },
    decider: { name: "Radhika" },
    seller: { name: "Ajay" },
  },
  {
    id: 6,
    condition: "retired",
    description: "Cartridge expired and dried out",
    raisedOn: "2025-05-10T15:10:00.000Z",
    decidedOn: null,
    decisionInfo: null,
    soldOn: null,
    soldInfo: null,
    status: "pending",
    asset: {
      category: "Cartridge",
      serialNo: "CRT1400HP",
      storeId: 1,
    },
    requester: { name: "Seema" },
    decider: null,
    seller: null,
  },
  {
    id: 7,
    condition: "retired",
    description: "Hard disk no longer booting and out of warranty",
    raisedOn: "2025-06-05T10:00:00.000Z",
    decidedOn: "2025-06-06T09:00:00.000Z",
    decisionInfo: "Engineer report attached",
    soldOn: null,
    soldInfo: null,
    status: "disposed",
    asset: {
      category: "Hard disk",
      serialNo: "HDX7730WD",
      storeId: 2,
    },
    requester: { name: "Nikhil" },
    decider: { name: "Divya" },
    seller: null,
  },
  {
    id: 8,
    condition: "damaged",
    description: "Monitor cracked during shifting",
    raisedOn: "2025-04-21T08:45:00.000Z",
    decidedOn: "2025-04-21T11:30:00.000Z",
    decisionInfo: "Accidentally dropped",
    soldOn: null,
    soldInfo: null,
    status: "rejected",
    asset: {
      category: "projectors",
      serialNo: "MON9981XY",
      storeId: 1,
    },
    requester: { name: "Meena" },
    decider: { name: "Bhim" },
    seller: null,
  },
  {
    id: 9,
    condition: "retired",
    description: "RAM used beyond 5 years, performance dropped",
    raisedOn: "2025-03-12T12:00:00.000Z",
    decidedOn: "2025-03-13T10:00:00.000Z",
    decisionInfo: "Planned obsolescence",
    soldOn: "2025-03-14T16:30:00.000Z",
    soldInfo: "Recycled by vendor",
    status: "sold",
    asset: {
      category: "RAM",
      serialNo: "RAM3021TY",
      storeId: 2,
    },
    requester: { name: "Farhan" },
    decider: { name: "Divya" },
    seller: { name: "Farhan" },
  },
  {
    id: 10,
    condition: "damaged",
    description: "Mouse scroll not functioning",
    raisedOn: "2025-02-05T09:00:00.000Z",
    decidedOn: "2025-02-06T11:15:00.000Z",
    decisionInfo: "Minor electrical fault",
    soldOn: "2025-02-07T13:00:00.000Z",
    soldInfo: "Sold for parts",
    status: "sold",
    asset: {
      category: "Mouse",
      serialNo: "MSX2004KL",
      storeId: 3,
    },
    requester: { name: "Kavya" },
    decider: { name: "Karan" },
    seller: { name: "Kavya" },
  },
  {
    id: 11,
    condition: "retired",
    description: "Cartridge not recognized by printer after firmware update",
    raisedOn: "2025-01-25T11:30:00.000Z",
    decidedOn: "2025-01-26T10:00:00.000Z",
    decisionInfo: "Model discontinued",
    soldOn: null,
    soldInfo: null,
    status: "disposed",
    asset: {
      category: "Cartridge",
      serialNo: "CRT5800HP",
      storeId: 2,
    },
    requester: { name: "Amit" },
    decider: { name: "Ramesh" },
    seller: null,
  },
  {
    id: 12,
    condition: "damaged",
    description: "Keyboard keys came off and cannot be repaired",
    raisedOn: "2025-04-10T14:00:00.000Z",
    decidedOn: null,
    decisionInfo: null,
    soldOn: null,
    soldInfo: null,
    status: "pending",
    asset: {
      category: "Keyboard",
      serialNo: "KBD4901PQ",
      storeId: 3,
    },
    requester: { name: "Sunita" },
    decider: null,
    seller: null,
  },
  {
    id: 13,
    condition: "retired",
    description: "Hard disk removed during upgrade cycle",
    raisedOn: "2025-06-10T10:00:00.000Z",
    decidedOn: "2025-06-11T11:30:00.000Z",
    decisionInfo: "Routine upgrade",
    soldOn: "2025-06-12T13:00:00.000Z",
    soldInfo: "Wiped and recycled",
    status: "sold",
    asset: {
      category: "Hard disk",
      serialNo: "HDJ9120SN",
      storeId: 1,
    },
    requester: { name: "Vikram" },
    decider: { name: "Divya" },
    seller: { name: "Vikram" },
  },
];

const initialState = {
  category: "",
  serialNo: "",
  condition: "",
  requester: "",
  decider: "",
  storeId: "",
  status: "",
  raisedOn: "",
};

function DisposedAssets() {
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
    let data = disposedAssets
      .filter((item) =>
        Object.entries(filterData).every(([key, value]) => {
          let search = item[key];

          if (!value) return true;
          if (key === "raisedOn") return item.raisedOn === value;
          if (key === "storeId") return item.asset[key] === parseInt(value);
          if (["category", "serialNo"].includes(key)) search = item.asset[key];
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
        {/* Asset Details */}
        <table className="max-w-screen lg:w-full border border-gray-300 rounded-lg text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[5%] border px-3 py-2 text-center">#</th>
              <th className="w-[10%] border px-3 py-2">Category</th>
              <th className="w-[11%] border px-3 py-2">Serial No</th>
              <th className="w-[10%] border px-3 py-2">Condition</th>
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
                <input
                  type="text"
                  value={filterData.serialNo}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      serialNo: e.target.value,
                    })
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
                  <option value="Retired">Retired</option>
                  <option value="Obsolete">Obsolete</option>
                </select>
              </td>
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
                  {item.asset.category.charAt(0).toUpperCase() +
                    item.asset.category.slice(1)}
                </td>
                <td className="border px-3 py-2">{item.asset.serialNo}</td>
                <td className="border px-3 py-2">
                  {item.condition.charAt(0).toUpperCase() +
                    item.condition.slice(1)}
                </td>
                <td className="border px-3 py-2">{item.requester.name}</td>
                <td className="border px-3 py-2">
                  {item.asset.storeId === 1 ? "HRD" : "CRD"}
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
            "Raised For": selectedDispose?.description,
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

export default DisposedAssets;

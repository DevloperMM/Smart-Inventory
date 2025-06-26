import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, EllipsisVertical, Undo2 } from "lucide-react";
import { statusColors } from "../../../lib/constants.js";
import { Modal, PageFooter } from "../../../components";
import { format } from "date-fns";
import { useUserStore } from "../../../store";
import { useOutsideClick } from "../../../hooks/useOutsideClick.js";

const initialState = {
  category: "",
  equipNo: "",
  issuedBy: "",
  issuedOn: "",
  issuedTo: "",
  handledBy: "",
  handledOn: "",
  status: "",
};

const issuances = [
  {
    id: 1,
    requestId: 101,
    equipNo: "9080001001",
    info: null,
    status: "issued",
    createdAt: "2025-06-01T09:00:00.000Z",
    updatedAt: "2025-06-01T09:00:00.000Z",
    asset: { category: "laptops" },
    issuer: { name: "Admin Developer" },
    recipient: { name: "Alice Johnson" },
    handler: null,
  },
  {
    id: 2,
    requestId: 102,
    equipNo: "9080001002",
    info: null,
    status: "returned",
    createdAt: "2025-06-02T10:00:00.000Z",
    updatedAt: "2025-06-05T11:00:00.000Z",
    asset: { category: "monitors" },
    issuer: { name: "System Admin" },
    recipient: { name: "Bob Smith" },
    handler: { name: "Rajesh Khanna" },
  },
  {
    id: 3,
    requestId: 103,
    equipNo: "9080001003",
    info: "Temporary allocation",
    status: "issued",
    createdAt: "2025-06-03T08:30:00.000Z",
    updatedAt: "2025-06-03T08:30:00.000Z",
    asset: { category: "printers" },
    issuer: { name: "IT Support" },
    recipient: { name: "Charlie Kumar" },
    handler: null,
  },
  {
    id: 4,
    requestId: 104,
    equipNo: "9080001004",
    info: null,
    status: "exempted",
    createdAt: "2025-06-01T14:00:00.000Z",
    updatedAt: "2025-06-04T09:45:00.000Z",
    asset: { category: "routers" },
    issuer: { name: "Network Lead" },
    recipient: { name: "Diana Patel" },
    handler: { name: "Nisha Bhat" },
  },
  {
    id: 5,
    requestId: 105,
    equipNo: "9080001005",
    info: null,
    status: "issued",
    createdAt: "2025-06-05T12:00:00.000Z",
    updatedAt: "2025-06-05T12:00:00.000Z",
    asset: { category: "servers" },
    issuer: { name: "Infra Manager" },
    recipient: { name: "Edward Singh" },
    handler: null,
  },
  {
    id: 6,
    requestId: 106,
    equipNo: "9080001006",
    info: "Damaged item returned",
    status: "returned",
    createdAt: "2025-06-02T07:15:00.000Z",
    updatedAt: "2025-06-06T16:00:00.000Z",
    asset: { category: "headphones" },
    issuer: { name: "Asset Desk" },
    recipient: { name: "Farah Mehta" },
    handler: { name: "Sanjay Rao" },
  },
  {
    id: 7,
    requestId: 107,
    equipNo: "9080001007",
    info: null,
    status: "issued",
    createdAt: "2025-06-04T10:30:00.000Z",
    updatedAt: "2025-06-04T10:30:00.000Z",
    asset: { category: "keyboards" },
    issuer: { name: "Support Lead" },
    recipient: { name: "Gautam Nayak" },
    handler: null,
  },
  {
    id: 8,
    requestId: 108,
    equipNo: "9080001008",
    info: null,
    status: "exempted",
    createdAt: "2025-05-31T09:00:00.000Z",
    updatedAt: "2025-06-02T12:30:00.000Z",
    asset: { category: "mice" },
    issuer: { name: "Procurement" },
    recipient: { name: "Hema Raj" },
    handler: { name: "Deepak Verma" },
  },
  {
    id: 9,
    requestId: 109,
    equipNo: "9080001009",
    info: null,
    status: "returned",
    createdAt: "2025-06-01T08:00:00.000Z",
    updatedAt: "2025-06-03T10:30:00.000Z",
    asset: { category: "laptops" },
    issuer: { name: "Admin Developer" },
    recipient: { name: "Isha Sharma" },
    handler: { name: "Vikram Patel" },
  },
  {
    id: 10,
    requestId: 110,
    equipNo: "9080001010",
    info: null,
    status: "issued",
    createdAt: "2025-06-06T15:00:00.000Z",
    updatedAt: "2025-06-06T15:00:00.000Z",
    asset: { category: "projectors" },
    issuer: { name: "Logistics" },
    recipient: { name: "Jayant Thakur" },
    handler: null,
  },
  {
    id: 11,
    requestId: 111,
    equipNo: "9080001011",
    info: "IT exemption due to legacy hardware",
    status: "exempted",
    createdAt: "2025-05-28T11:00:00.000Z",
    updatedAt: "2025-06-01T10:00:00.000Z",
    asset: { category: "printers" },
    issuer: { name: "IT Lead" },
    recipient: { name: "Kavya Nair" },
    handler: { name: "Sara Paul" },
  },
  {
    id: 12,
    requestId: 112,
    equipNo: "9080001012",
    info: "Returned for asset return to clear no dues after serving notice period",
    status: "returned",
    createdAt: "2025-06-01T09:00:00.000Z",
    updatedAt: "2025-06-03T14:00:00.000Z",
    asset: { category: "networking" },
    issuer: { name: "Infra Lead" },
    recipient: { name: "Lalit Bansal" },
    handler: { name: "John Mathew" },
  },
];

function IssueHistory() {
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);

  const [show, setShow] = useState(false);
  const [isSortAsc, setIsSortAsc] = useState(false);
  const [filterData, setFilterData] = useState(initialState);

  const [selectedIssuance, setSelectedIssuance] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(1);

  const { user } = useUserStore();
  useOutsideClick(() => setOpenDropdownId(null));

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    let data = issuances
      .map((item) => ({
        ...item,
        category: item.asset.category,
        issuedBy: item.issuer.name,
        issuedTo: item.recipient.name,
        handledBy: item.handler?.name || "",
        issuedOn: format(new Date(item.createdAt), "yyyy-MM-dd"),
        handledOn: item.handler
          ? format(new Date(item.updatedAt), "yyyy-MM-dd")
          : "",
      }))
      .filter((item) =>
        Object.entries(filterData).every(([key, value]) =>
          value
            ? item[key]?.toLowerCase().includes(value.trim().toLowerCase())
            : true
        )
      )
      .sort((a, b) => {
        const dateA = new Date(a.issuedOn);
        const dateB = new Date(b.issuedOn);
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
      <h2 className="text-2xl font-bold mb-6">Issuances List</h2>

      {/* Issuances Table */}
      <div className="overflow-auto">
        <table className="max-w-screen text-sm border-collapse table-fixed">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[2.5%] border px-3 py-2 text-center">#</th>
              <th className="w-[12.5%] border px-3 py-2">Category</th>
              <th className="w-[12.5%] border px-3 py-2">Equipment No</th>
              <th className="w-[12.5%] border px-3 py-2">Issued By</th>
              <th
                className="w-[12.5%] border px-3 py-2 cursor-pointer break-words whitespace-normal"
                onClick={() => setIsSortAsc(!isSortAsc)}
              >
                <span className="flex items-center gap-1 capitalize">
                  Issued On <ArrowUpDown className="w-4 h-4" />
                </span>
              </th>
              <th className="w-[12.5%] border px-3 py-2">Issued to</th>
              <th className="w-[12.5%] border px-3 py-2">Returned To</th>
              <th className="w-[12.5%] border px-3 py-2">Received On</th>
              <th className="w-[8%] border px-3 py-2">Status</th>
              <th className="w-[2%] -2 bg-white"></th>
            </tr>
            <tr className="bg-white h-fit">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full max-w-full border p-1 rounded truncate"
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
                  className="w-full max-w-full border p-1 rounded truncate"
                  value={filterData.equipNo}
                  onChange={(e) =>
                    setFilterData({ ...filterData, equipNo: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full max-w-full border p-1 rounded truncate"
                  value={filterData.issuedBy}
                  onChange={(e) =>
                    setFilterData({ ...filterData, issuedBy: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full max-w-full border p-1 rounded truncate"
                  value={filterData.issuedOn}
                  onChange={(e) =>
                    setFilterData({ ...filterData, issuedOn: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full max-w-full border p-1 rounded truncate"
                  value={filterData.issuedTo}
                  onChange={(e) =>
                    setFilterData({ ...filterData, issuedTo: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full max-w-full border p-1 rounded truncate"
                  value={filterData.handledBy}
                  onChange={(e) =>
                    setFilterData({ ...filterData, handledBy: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full max-w-full border p-1 rounded truncate"
                  value={filterData.handledOn}
                  onChange={(e) =>
                    setFilterData({ ...filterData, handledOn: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <select
                  className="w-full max-w-full border p-1 rounded truncate"
                  value={filterData.status}
                  onChange={(e) =>
                    setFilterData({ ...filterData, status: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="issued">Issued</option>
                  <option value="returned">Returned</option>
                  <option value="exempted">Exempted</option>
                </select>
              </td>
              <td className="p-2" />
            </tr>
          </thead>
          <tbody>
            {pageData.map((item, i) => (
              <tr
                key={i + 1}
                className={`h-12 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">{item.asset.category}</td>
                <td className="border px-3 py-2">{item.equipNo}</td>
                <td className="border px-3 py-2">
                  {item.issuer.name.split(" ")[0]}
                </td>
                <td className="border px-3 py-2 font-bold">
                  {format(item.createdAt, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  {item.recipient.name.split(" ")[0]}
                </td>
                <td className="border px-3 py-2">
                  {item.handler?.name.split(" ")[0]}
                </td>
                <td className="border px-3 py-2 font-bold">
                  {item.handler ? format(item.updatedAt, "dd/MM/yyyy") : ""}
                </td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded font-medium ${
                      statusColors[item.status.toLowerCase()]
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="relative px-3 py-2 text-center">
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="hover:text-black cursor-pointer"
                    data-dropdown-trigger
                  >
                    {item.status === "issued" ? (
                      <Undo2 strokeWidth={2.5} size={20} />
                    ) : (
                      <EllipsisVertical strokeWidth={2.5} size={20} />
                    )}
                  </button>

                  {openDropdownId === item.id && (
                    <div
                      className="absolute bottom-1 right-8 mt-1 w-32 bg-white border rounded shadow-lg z-20"
                      data-dropdown
                    >
                      {item.status !== "issued" && (
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setShow(true);
                            setSelectedIssuance(item);
                            setOpenDropdownId(null);
                          }}
                        >
                          View Info
                        </button>
                      )}
                      {item.status === "issued" && (
                        <button
                          onClick={() => {
                            // Call return API
                            console.log(
                              `Perform return for issue id ${item.id}`
                            );
                            setOpenDropdownId(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-violet-600 hover:bg-violet-100"
                        >
                          Return
                        </button>
                      )}
                      {item.status === "issued" && user.storeManaging === 0 && (
                        <button
                          onClick={() => {
                            // Call exempt API
                            console.log(
                              `Perform exempt for issue id ${item.id}`
                            );
                            setOpenDropdownId(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                        >
                          Exempt
                        </button>
                      )}
                    </div>
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

      {show && (
        <Modal
          show={show}
          onClose={() => setShow(false)}
          data={{
            "Receive Comments": selectedIssuance?.info || "",
          }}
        />
      )}
    </div>
  );
}

export default IssueHistory;

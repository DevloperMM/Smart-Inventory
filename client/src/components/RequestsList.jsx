import { useEffect, useMemo, useState } from "react";
import { Check, Eye, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../lib/constants.js";
import { PageFooter } from "./";
import { format } from "date-fns";
import Modal from "./Modal.jsx";

const initialState = {
  category: "",
  requestedBy: "",
  requestedOn: "",
  status: "",
  decidedBy: "",
  decidedOn: "",
};

const requests = [
  {
    id: 1,
    code: "REQ-20250501",
    category: "Laptop",
    requestedBy: "John Doe",
    requestedOn: "2025-05-01",
    purpose: "New employee onboarding",
    status: "Approved",
    decidedOn: "2025-05-03",
    decidedBy: "IT Head",
    decidedComments: "Approved for onboarding",
  },
  {
    id: 2,
    code: "REQ-20250502",
    category: "Monitor",
    requestedBy: "Jane Smith",
    requestedOn: "2025-05-02",
    purpose: "Dual monitor setup",
    status: "Pending",
  },
  {
    id: 3,
    code: "REQ-20250503",
    category: "Keyboard",
    requestedBy: "Raj Patel",
    requestedOn: "2025-05-03",
    purpose: "Replacement of broken keyboard",
    status: "Approved",
    decidedOn: "2025-05-04",
    decidedBy: "Stock Manager",
    decidedComments: "Request approved",
  },
  {
    id: 4,
    code: "REQ-20250504",
    category: "Mouse",
    requestedBy: "Sara Khan",
    requestedOn: "2025-05-04",
    purpose: "Ergonomic mouse for wrist support",
    status: "Rejected",
    decidedOn: "2025-05-05",
    decidedBy: "IT Head",
    decidedComments: "Not available in stock",
  },
  {
    id: 5,
    code: "REQ-20250505",
    category: "Chair",
    requestedBy: "Daniel Lee",
    requestedOn: "2025-05-05",
    purpose: "Ergonomic seating",
    status: "Pending",
  },
  {
    id: 6,
    code: "REQ-20250506",
    category: "Docking Station",
    requestedBy: "Aditi Mehra",
    requestedOn: "2025-05-06",
    purpose: "For flexible workstation setup",
    status: "Approved",
    decidedOn: "2025-05-08",
    decidedBy: "IT Head",
    decidedComments: "Approved as per request",
  },
  {
    id: 7,
    code: "REQ-20250507",
    category: "Laptop",
    requestedBy: "Ravi Gupta",
    requestedOn: "2025-05-07",
    purpose: "Replacement for outdated system",
    status: "Rejected",
    decidedOn: "2025-05-09",
    decidedBy: "IT Head",
    decidedComments: "Use existing spare inventory",
  },
  {
    id: 8,
    code: "REQ-20250508",
    category: "Headphones",
    requestedBy: "Maya Nair",
    requestedOn: "2025-05-08",
    purpose: "For video conferencing",
    status: "Pending",
  },
  {
    id: 9,
    code: "REQ-20250509",
    category: "Projector",
    requestedBy: "Arjun Verma",
    requestedOn: "2025-05-09",
    purpose: "Meeting room setup",
    status: "Approved",
    decidedOn: "2025-05-11",
    decidedBy: "IT Head",
    decidedComments: "Approved with delivery timeline",
  },
  {
    id: 10,
    code: "REQ-20250510",
    category: "Tablet",
    requestedBy: "Priya Sharma",
    requestedOn: "2025-05-10",
    purpose: "For field visits",
    status: "Pending",
  },
  {
    id: 11,
    code: "REQ-20250511",
    category: "HDMI Cable",
    requestedBy: "Karthik Srinivasan",
    requestedOn: "2025-05-11",
    purpose: "Connect to external displays",
    status: "Approved",
    decidedOn: "2025-05-12",
    decidedBy: "Stock Manager",
    decidedComments: "In stock, approved",
  },
  {
    id: 12,
    code: "REQ-20250512",
    category: "Webcam",
    requestedBy: "Neha Reddy",
    requestedOn: "2025-05-12",
    purpose: "Improve video quality for calls",
    status: "Rejected",
    decidedOn: "2025-05-13",
    decidedBy: "IT Head",
    decidedComments: "Not a priority purchase",
  },
  {
    id: 13,
    code: "REQ-20250513",
    category: "Scanner",
    requestedBy: "Ali Hasan",
    requestedOn: "2025-05-13",
    purpose: "Document digitization",
    status: "Pending",
  },
  {
    id: 14,
    code: "REQ-20250514",
    category: "Printer",
    requestedBy: "Lina Roy",
    requestedOn: "2025-05-14",
    purpose: "Department printing needs",
    status: "Approved",
    decidedOn: "2025-05-16",
    decidedBy: "IT Head",
    decidedComments: "Approved, proceed with order",
  },
  {
    id: 15,
    code: "REQ-20250515",
    category: "USB Drive",
    requestedBy: "Manoj Kumar",
    requestedOn: "2025-05-15",
    purpose: "Data transfer for external audits",
    status: "Pending",
  },
  {
    id: 16,
    code: "REQ-20250516",
    category: "Surge Protector",
    requestedBy: "Divya Iyer",
    requestedOn: "2025-05-16",
    purpose: "Protect equipment during storms",
    status: "Approved",
    decidedOn: "2025-05-17",
    decidedBy: "Stock Manager",
    decidedComments: "Approved and issued",
  },
];

const RequestsList = () => {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [show, setShow] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterData, setFilterData] = useState(initialState);

  const user = {
    role: "IT-Head",
  };

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    let data = requests.filter((request) =>
      Object.entries(filterData).every(([key, value]) => {
        if (!value) return true;
        if (["requestedOn", "decidedOn"].includes(key))
          return request[key] === value;
        return request[key]?.toLowerCase().includes(value.toLowerCase());
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
        <h2 className="text-2xl font-bold">Requests List</h2>
        <button
          onClick={() => navigate("/transactions/requests/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" />
          Create Request
        </button>
      </div>

      {/* Requests Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm border border-gray-300 rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Requested By</th>
              <th className="border px-3 py-2">Requested On</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Decided by</th>
              <th className="border px-3 py-2">Decided On</th>
              <th className="border px-3 py-2">Description</th>
              <th className="border px-3 py-2 text-center">Actions</th>
            </tr>
            <tr className="bg-white text-xs">
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
                  value={filterData.requestedBy}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      requestedBy: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                  value={filterData.requestedOn}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      requestedOn: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2">
                <select
                  className="w-full border px-1 py-1 rounded"
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
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                  value={filterData.decidedBy}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      decidedBy: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border px-1 py-1 rounded"
                  value={filterData.decidedOn}
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      decidedOn: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border p-2" />
              <td className="border p-2" />
            </tr>
          </thead>
          <tbody>
            {pageData.map((request, i) => (
              <tr
                key={request.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-3 py-2">
                  {(page - 1) * rows + i + 1}
                </td>
                <td className="border px-3 py-2">{request.category}</td>
                <td className="border px-3 py-2">{request.requestedBy}</td>
                <td className="border px-3 py-2">
                  {format(request.requestedOn, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      statusColors[request.status]
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="border px-3 py-2">
                  {request?.decidedBy || "-"}
                </td>
                <td className="border px-3 py-2">
                  {request.decidedOn
                    ? format(request.decidedOn, "dd/MM/yyyy")
                    : "-"}
                </td>
                <td className="border px-3 py-2 text-center">
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => {
                      setSelectedRequest(request);
                      setShow(true);
                    }}
                  >
                    <Eye size={16} className="inline-block pb-0.5 mr-1.5" />
                    View
                  </span>
                </td>
                <td className="border px-3 py-2">
                  {user.role.toLowerCase() === "it-head" &&
                  request.status === "Pending" ? (
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={(request) => (request.status = "Approved")}
                        className="w-full bg-green-500 font-semibold py-2 px-3 rounded-xl text-white hover:bg-green-600 disabled:bg-gray-400"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(request) => (request.status = "Rejected")}
                        className="w-full bg-red-400 font-semibold py-2 px-3 rounded-xl text-white hover:bg-red-500 disabled:bg-gray-400"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={request.status !== "Approved"}
                      className="w-20 bg-teal-500 font-semibold py-2 px-3 rounded-xl text-white hover:bg-teal-600 disabled:bg-gray-400"
                      onClick={() =>
                        navigate(`/transactions/requests/${request.id}`)
                      }
                    >
                      {request.status !== "Rejected" ? (
                        <span>Issue</span>
                      ) : (
                        <span>N/A</span>
                      )}
                    </button>
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

      {show && (
        <Modal
          show={show}
          onClose={() => setShow(false)}
          data={{
            "Request Purpose": selectedRequest.purpose,
            Decision: selectedRequest?.decidedComments || "Pending",
          }}
        />
      )}
    </div>
  );
};

export default RequestsList;

import { useEffect, useMemo, useState } from "react";
import { Check, Eye, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { statusColors } from "../../../lib/constants.js";
import { PageFooter, Modal } from "../../../components/index.js";
import { format } from "date-fns";
import { useUserStore } from "../../../store/useUserStore.js";

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
    category: "Laptop",
    requestedBy: "John Doe",
    requestedOn: "2025-05-01",
    purpose: "New employee onboarding",
    status: "Issued",
    decidedOn: "2025-05-03",
    decidedBy: "Arpit Singh",
    decidedComments: "Approved for onboarding",
  },
  {
    id: 2,
    category: "Monitor",
    requestedBy: "Jane Smith",
    requestedOn: "2025-05-02",
    purpose: "Dual monitor setup",
    status: "Pending",
  },
  {
    id: 3,
    category: "Keyboard",
    requestedBy: "Raj Patel",
    requestedOn: "2025-05-03",
    purpose: "Replacement of broken keyboard",
    status: "Issued",
    decidedOn: "2025-05-04",
    decidedBy: "Samarth Bhardwaj",
    decidedComments: "Request approved",
  },
  {
    id: 4,
    category: "Mouse",
    requestedBy: "Sara Khan",
    requestedOn: "2025-05-04",
    purpose: "Ergonomic mouse for wrist support",
    status: "Rejected",
    decidedOn: "2025-05-05",
    decidedBy: "Arpit Singh",
    decidedComments: "Not available in stock",
  },
  {
    id: 5,
    category: "Chair",
    requestedBy: "Daniel Lee",
    requestedOn: "2025-05-05",
    purpose: "Ergonomic seating",
    status: "Pending",
  },
  {
    id: 6,
    category: "Docking Station",
    requestedBy: "Aditi Mehra",
    requestedOn: "2025-05-06",
    purpose: "For flexible workstation setup",
    status: "Approved",
    decidedOn: "2025-05-08",
    decidedBy: "Samarth Bhardwaj",
    decidedComments: "Approved as per request",
  },
  {
    id: 7,
    category: "Laptop",
    requestedBy: "Ravi Gupta",
    requestedOn: "2025-05-07",
    purpose: "Replacement for outdated system",
    status: "Rejected",
    decidedOn: "2025-05-09",
    decidedBy: "Arpit Singh",
    decidedComments: "Use existing spare inventory",
  },
  {
    id: 8,
    category: "Headphones",
    requestedBy: "Maya Nair",
    requestedOn: "2025-05-08",
    purpose: "For video conferencing",
    status: "Pending",
  },
  {
    id: 9,
    category: "Projector",
    requestedBy: "Arjun Verma",
    requestedOn: "2025-05-09",
    purpose: "Meeting room setup",
    status: "Approved",
    decidedOn: "2025-05-11",
    decidedBy: "Arpit Singh",
    decidedComments: "Approved with delivery timeline",
  },
  {
    id: 10,
    category: "Tablet",
    requestedBy: "Priya Sharma",
    requestedOn: "2025-05-10",
    purpose: "For field visits",
    status: "Pending",
  },
  {
    id: 11,
    category: "HDMI Cable",
    requestedBy: "Karthik Srinivasan",
    requestedOn: "2025-05-11",
    purpose: "Connect to external displays",
    status: "Approved",
    decidedOn: "2025-05-12",
    decidedBy: "Arpit Singh",
    decidedComments: "In stock, approved",
  },
  {
    id: 12,
    category: "Webcam",
    requestedBy: "Neha Reddy",
    requestedOn: "2025-05-12",
    purpose: "Improve video quality for calls",
    status: "Rejected",
    decidedOn: "2025-05-13",
    decidedBy: "Samarth Bhardwaj",
    decidedComments: "Not a priority purchase",
  },
  {
    id: 13,
    category: "Scanner",
    requestedBy: "Ali Hasan",
    requestedOn: "2025-05-13",
    purpose: "Document digitization",
    status: "Pending",
  },
  {
    id: 14,
    category: "Printer",
    requestedBy: "Lina Roy",
    requestedOn: "2025-05-14",
    purpose: "Department printing needs",
    status: "Approved",
    decidedOn: "2025-05-16",
    decidedBy: "Samarth Bhardwaj",
    decidedComments: "Approved, proceed with order",
  },
  {
    id: 15,
    category: "USB Drive",
    requestedBy: "Manoj Kumar",
    requestedOn: "2025-05-15",
    purpose: "Data transfer for external audits",
    status: "Pending",
  },
  {
    id: 16,
    category: "Surge Protector",
    requestedBy: "Divya Iyer",
    requestedOn: "2025-05-16",
    purpose: "Protect equipment during storms",
    status: "Approved",
    decidedOn: "2025-05-17",
    decidedBy: "Samarth Bhardwaj",
    decidedComments: "Approved and issued",
  },
];

const RequestsList = ({ setStep }) => {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [show, setShow] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState({});
  const [filterData, setFilterData] = useState(initialState);

  const { user } = useUserStore();

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    // const filterOrder = {
    //   Pending: 0,
    //   Approved: 1,
    //   Issued: 2,
    //   Rejected: 3,
    // };

    let data = requests
      .filter((request) =>
        Object.entries(filterData).every(([key, value]) => {
          if (!value) return true;
          if (["requestedOn", "decidedOn"].includes(key))
            return request[key] === value;
          return request[key]
            ?.toLowerCase()
            .includes(value.trim().toLowerCase());
        })
      )
      .sort((a, b) => {
        const dateA = new Date(a.requestedOn);
        const dateB = new Date(b.requestedOn);
        return dateB - dateA;

        // return filterOrder[a.status] - filterOrder[b.status];
      });

    return data;
  }, [filterData, requests]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      <h2 className="text-2xl font-bold">Requests List</h2>

      {/* Requests Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm border-collapse rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[4%] border px-3 py-2 text-center">#</th>
              <th className="w-[15%] border px-3 py-2">Category</th>
              <th className="w-[15%] border px-3 py-2">Requested By</th>
              <th className="w-[10%] border px-3 py-2">Requested On</th>
              <th className="w-[10%] border px-3 py-2">Status</th>
              <th className="w-[15%] border px-3 py-2">Decided by</th>
              <th className="w-[10%] border px-3 py-2">Decided On</th>
              <th className="w-[10%] border px-3 py-2">Info</th>
              <th className="w-[21%] border px-3 py-2 text-center">Actions</th>
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
                  className="w-full border p-1 rounded"
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
                  <option value="Issued">Issued</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
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
                  className="w-full border p-1 rounded"
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
                className={i % 2 === 0 ? "bg-white h-12" : "bg-gray-50 h-12"}
              >
                <td className="border px-3 py-2 text-center">
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
                    {request.status.toLowerCase()}
                  </span>
                </td>
                <td className="border px-3 py-2">{request?.decidedBy}</td>
                <td className="border px-3 py-2">
                  {request.decidedOn
                    ? format(request.decidedOn, "dd/MM/yyyy")
                    : ""}
                </td>
                <td className="border px-3 py-2">
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
                <td className="border px-4 py-2 text-center">
                  {["admin", "it-head"].includes(user.role) &&
                  request.status === "Pending" ? (
                    <div className="flex justify-between">
                      <button
                        onClick={(request) => (request.status = "Approved")}
                        className="bg-green-500 px-2 py-1.5 rounded-xl text-white hover:bg-green-600 disabled:bg-gray-400"
                      >
                        <Check strokeWidth={2} size={22} />
                      </button>
                      <button
                        onClick={(request) => (request.status = "Rejected")}
                        className="bg-red-400 px-2 py-1.5 rounded-xl text-white hover:bg-red-500 disabled:bg-gray-400"
                      >
                        <X strokeWidth={2} size={22} />
                      </button>
                    </div>
                  ) : ["Approved", "Pending"].includes(request.status) ? (
                    <button
                      disabled={request.status !== "Approved"}
                      onClick={() => setStep(2)}
                      className="w-full bg-teal-500 px-1 py-1.5 text-base rounded-xl text-white hover:bg-teal-600 disabled:bg-gray-400"
                    >
                      <span>Issue</span>
                    </button>
                  ) : request.status === "Issued" ? (
                    <div className="inline-block w-full bg-blue-100 text-black text-sm font-semibold px-1 py-1.5 rounded-xl border-2 border-blue-500 shadow-md relative">
                      <span className="block text-center tracking-wide">
                        Issued
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!msg ? (
        <PageFooter
          rows={rows}
          page={page}
          setPage={setPage}
          setRows={setRows}
          totalPages={totalPages}
        />
      ) : (
        <div className="text-center mt-4 text-red-500">{msg}</div>
      )}

      {show && (
        <Modal
          show={show}
          onClose={() => setShow(false)}
          data={{
            "Request Purpose": selectedRequest.purpose,
            Decision: selectedRequest?.decidedComments || "",
          }}
        />
      )}
    </div>
  );
};

export default RequestsList;

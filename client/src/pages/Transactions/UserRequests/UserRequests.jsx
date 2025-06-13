import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { statusColors } from "../../../lib/constants";
import { format } from "date-fns";

const requests = [
  {
    id: 1,
    category: "Laptop",
    requestedBy: "Arjun Mehta",
    createdAt: "2025-06-01",
    status: "Approved",
    purpose: "Development work",
  },
  {
    id: 2,
    category: "Monitor",
    requestedBy: "Neha Shah",
    createdAt: "2025-06-03",
    status: "Pending",
    purpose: "Design testing",
  },
  {
    id: 3,
    category: "Keyboard",
    requestedBy: "Vikram Desai",
    createdAt: "2025-06-04",
    status: "Rejected",
    purpose: "Hardware upgrade",
  },
  {
    id: 4,
    category: "Mouse",
    requestedBy: "Kiran Patel",
    createdAt: "2025-06-04",
    status: "Approved",
    purpose: "Office setup",
  },
  {
    id: 5,
    category: "Router",
    requestedBy: "Megha Rao",
    createdAt: "2025-06-02",
    status: "Pending",
    purpose: "Connectivity for team",
  },
  {
    id: 6,
    category: "Webcam",
    requestedBy: "Ravi Sharma",
    createdAt: "2025-06-01",
    status: "Approved",
    purpose: "Remote meetings",
  },
  {
    id: 7,
    category: "Chair",
    requestedBy: "Divya Nair",
    createdAt: "2025-05-30",
    status: "Pending",
    purpose: "New joiner setup",
  },
  {
    id: 8,
    category: "Desk",
    requestedBy: "Ankit Sinha",
    createdAt: "2025-06-05",
    status: "Approved",
    purpose: "Office workspace",
  },
  {
    id: 9,
    category: "Laptop Stand",
    requestedBy: "Sweta Rao",
    createdAt: "2025-06-05",
    status: "Pending",
    purpose: "Ergonomics",
  },
  {
    id: 10,
    category: "Pen Drive",
    requestedBy: "Nikhil Verma",
    createdAt: "2025-06-06",
    status: "Rejected",
    purpose: "Data transfer",
  },
  {
    id: 11,
    category: "Monitor",
    requestedBy: "Priya Deshmukh",
    createdAt: "2025-06-01",
    status: "Approved",
    purpose: "Workstation expansion",
  },
  {
    id: 12,
    category: "Laptop",
    requestedBy: "Saurabh Jain",
    createdAt: "2025-06-06",
    status: "Pending",
    purpose: "Replacement request",
  },
  {
    id: 13,
    category: "Tablet",
    requestedBy: "Riya Banerjee",
    createdAt: "2025-06-06",
    status: "Approved",
    purpose: "Client presentation",
  },
  {
    id: 14,
    category: "Keyboard",
    requestedBy: "Alok Singh",
    createdAt: "2025-06-05",
    status: "Pending",
    purpose: "Replace damaged device",
  },
  {
    id: 15,
    category: "Mouse Pad",
    requestedBy: "Simran Kaur",
    createdAt: "2025-06-05",
    status: "Approved",
    purpose: "Ergonomic support",
  },
  {
    id: 16,
    category: "Charger",
    requestedBy: "Harsh Joshi",
    createdAt: "2025-06-07",
    status: "Pending",
    purpose: "Lost original",
  },
];

function UserRequests() {
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState("");
  const rows = 10;

  useEffect(() => {
    setPage(1);
  }, []);

  const pageData = requests.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(requests.length / rows);

  useEffect(() => {
    setMsg(requests.length ? "" : "No records found");
  }, [requests]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-fuchsia-100 to-emerald-100 p-6 pt-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-cyan-800 mb-8 text-center">
          My Requests
        </h2>

        <div className="overflow-x-auto bg-white/30 shadow-md rounded-xl border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-black/75">
              <tr>
                <th className="w-1/12 px-3 py-4 border-r text-center">S.No</th>
                <th className="w-2/12 px-3 py-4 border-r">Category</th>
                <th className="w-2/12 px-3 py-4 border-r">Requested By</th>
                <th className="w-2/12 px-3 py-4 border-r">Requested On</th>
                <th className="w-2/12 px-3 py-4 border-r">Status</th>
                <th className="w-3/12 px-3 py-4">Request Purpose</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {pageData.map((req, idx) => (
                <tr
                  key={req.id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="px-3 py-4 text-gray-700 border-r text-center">
                    {(page - 1) * rows + idx + 1}
                  </td>
                  <td className="px-3 py-4 border-r">{req.category}</td>
                  <td className="px-3 py-4 border-r">{req.requestedBy}</td>
                  <td className="px-3 py-4 border-r">
                    {format(req.createdAt, "dd/MM/yyyy")}
                  </td>
                  <td className="px-3 py-4 border-r">
                    <span
                      className={`px-3 py-1 rounded-lg font-medium ${
                        statusColors[req.status]
                      }`}
                    >
                      {req.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-3 py-4">{req.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!msg && (
        <div className="max-w-6xl mx-auto my-6 text-right">
          <div className="space-x-2 inline-block align-bottom">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-1 rounded border disabled:opacity-30"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="mb-2 font-semibold text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-1 rounded border disabled:opacity-30"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {msg && (
        <div className="text-center mt-6 text-gray-700 italic text-lg">
          {msg}
        </div>
      )}
    </div>
  );
}

export default UserRequests;

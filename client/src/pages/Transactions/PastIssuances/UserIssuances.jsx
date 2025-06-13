import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { statusColors } from "../../../lib/constants";
import { format } from "date-fns";

const issuances = [
  {
    id: 1,
    equipNo: "9080001001",
    status: "issued",
    createdAt: "2025-06-01T09:00:00.000Z",
    asset: { category: "Laptops" },
    issuer: { name: "Admin Developer" },
    returnInfo: "",
  },
  {
    id: 2,
    equipNo: "9080001002",
    status: "returned",
    createdAt: "2025-06-02T10:15:00.000Z",
    asset: { category: "Monitors" },
    issuer: { name: "Store Manager" },
    returnInfo: "Returned due to replacement",
  },
  {
    id: 3,
    equipNo: "9080003644",
    status: "issued",
    createdAt: "2025-06-03T14:30:00.000Z",
    consumable: { category: "Ethernet Cables" },
    issuer: { name: "Admin Developer" },
    returnInfo: "",
  },
  {
    id: 4,
    equipNo: "9080001003",
    status: "exempted",
    createdAt: "2025-06-04T08:20:00.000Z",
    asset: { category: "Keyboards" },
    issuer: { name: "IT Head" },
    returnInfo: "Lost by user, marked exempted",
  },
  {
    id: 5,
    equipNo: "9080001745",
    status: "returned",
    createdAt: "2025-06-05T16:45:00.000Z",
    consumable: { category: "HDMI Cables" },
    issuer: { name: "Store Manager" },
    returnInfo: "Unused, returned to store",
  },
  {
    id: 6,
    equipNo: "9080001004",
    status: "issued",
    createdAt: "2025-06-06T12:00:00.000Z",
    asset: { category: "Desktops" },
    issuer: { name: "IT Head" },
    returnInfo: "",
  },
  {
    id: 7,
    equipNo: "9080005478",
    status: "exempted",
    createdAt: "2025-06-07T11:10:00.000Z",
    consumable: { category: "Batteries" },
    issuer: { name: "Admin Developer" },
    returnInfo: "Fully used, not returnable",
  },
  {
    id: 8,
    equipNo: "9080001005",
    status: "returned",
    createdAt: "2025-06-08T09:35:00.000Z",
    asset: { category: "Printers" },
    issuer: { name: "Store Manager" },
    returnInfo: "Returned after project completion",
  },
];

function UserIssuances() {
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState("");
  const rows = 10;

  useEffect(() => {
    setPage(1);
  }, []);

  const pageData = issuances.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(issuances.length / rows);

  useEffect(() => {
    setMsg(issuances.length ? "" : "No records found");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-fuchsia-100 to-emerald-100 p-6 pt-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-cyan-800 mb-8 text-center">
          My Issuances
        </h2>

        <div className="overflow-x-auto bg-white/30 shadow-md rounded-xl border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-black/75 text-sm">
              <tr>
                <th className="px-3 py-4 border-r w-1/18 text-center">#</th>
                <th className="px-3 py-4 border-r w-5/36">Category</th>
                <th className="px-3 py-4 border-r w-5/36">Equipment No</th>
                <th className="px-3 py-4 border-r w-3/18">Issued By</th>
                <th className="px-3 py-4 border-r w-1/9">Issued On</th>
                <th className="px-3 py-4 border-r w-1/9">Status</th>
                <th className="px-3 py-4 w-5/18">Return Comments</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((issue, idx) => (
                <tr
                  key={issue.id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="px-3 py-4 font-semibold text-gray-700 border-r text-center">
                    {(page - 1) * rows + idx + 1}
                  </td>
                  <td className="px-3 py-4 border-r">
                    {issue?.asset
                      ? issue.asset.category
                      : issue.consumable.category}
                  </td>
                  <td className="px-3 py-4 border-r">{issue.equipNo}</td>
                  <td className="px-3 py-4 border-r">{issue.issuer.name}</td>
                  <td className="px-3 py-4 border-r">
                    {format(issue.createdAt, "dd/MM/yyyy")}
                  </td>
                  <td className="px-3 py-4 border-r">
                    <span
                      className={`px-3 py-1 rounded-lg font-medium ${
                        statusColors[
                          issue.status[0].toUpperCase() + issue.status.slice(1)
                        ]
                      }`}
                    >
                      {issue.status[0].toUpperCase() + issue.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 py-4">{issue.returnInfo}</td>
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

export default UserIssuances;

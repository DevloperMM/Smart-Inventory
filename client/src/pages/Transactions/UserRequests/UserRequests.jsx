import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { statusColors } from "../../../lib/constants";
import { format } from "date-fns";
import { useRequestStore } from "../../../store";
import { LoadRecords } from "../../../components";

// TODO: cancel button

function UserRequests() {
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState("");
  const rows = 10;

  const { getMyRequests, myRequests, fetchingRequests } = useRequestStore();

  useEffect(() => {
    getMyRequests();
  }, [getMyRequests]);

  const pageData = myRequests.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(myRequests.length / rows);

  useEffect(() => {
    setMsg(myRequests.length ? "" : "No requests has been made yet");
  }, [myRequests]);

  if (fetchingRequests) return <LoadRecords />;

  return (
    <>
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
                <th className="w-2/12 px-3 py-4 border-r">Requested On</th>
                <th className="w-2/12 px-3 py-4 border-r">Status</th>
                <th className="w-2/12 px-3 py-4 border-r">Decided By</th>
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
                  <td className="px-3 py-4 border-r">{req.decider?.name}</td>
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
        <div className="text-center mt-10 italic font-bold text-zinc-500">
          {msg}
        </div>
      )}
    </>
  );
}

export default UserRequests;

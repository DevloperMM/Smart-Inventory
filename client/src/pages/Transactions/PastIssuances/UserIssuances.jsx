import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { statusColors } from "../../../lib/constants";
import { format } from "date-fns";
import { useAssetStore } from "../../../store";

function UserIssuances() {
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState("");
  const rows = 10;

  const { issuanceAgainstMe, getIssuancesAgainstMe } = useAssetStore();

  useEffect(() => {
    getIssuancesAgainstMe();
  }, [getIssuancesAgainstMe]);

  const pageData = issuanceAgainstMe.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(issuanceAgainstMe.length / rows);

  useEffect(() => {
    setMsg(issuanceAgainstMe.length ? "" : "No items has been issued yet");
  }, [issuanceAgainstMe]);

  return (
    <>
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
                        statusColors[issue.status]
                      }`}
                    >
                      {issue.status[0].toUpperCase() + issue.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 py-4">{issue.info}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!msg && (
        <div className="max-w-5xl mx-auto my-6 text-right">
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

export default UserIssuances;

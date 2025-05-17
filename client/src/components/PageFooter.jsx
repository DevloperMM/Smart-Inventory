import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

function PageFooter({ page, rows, setRows, setPage, totalPages }) {
  return (
    <div className="text-right space-x-12">
      <div className="space-x-2 inline-block">
        <span>Show</span>
        <div className="relative inline-block w-14 h-fit">
          <select
            className="appearance-none w-full px-2 py-0.5 border border-gray-300 bg-white rounded-md text-sm shadow-sm focus:outline-none focus:ring-1"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 w-4 h-4" />
        </div>
        <span>Records</span>
      </div>

      <div className="space-x-2 inline-block align-bottom">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-1 rounded border disabled:opacity-30"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="mb-2">
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
  );
}

export default PageFooter;

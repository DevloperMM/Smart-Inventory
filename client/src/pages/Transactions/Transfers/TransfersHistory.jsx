import { useMemo, useState, useEffect } from "react";
import { LoadRecords, Modal, PageFooter } from "../../../components";
import { format } from "date-fns";
import { statusColors } from "../../../lib/constants";
import { EllipsisVertical, Eye } from "lucide-react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useTransferStore } from "../../../store";

const initialState = {
  movedOn: "",
  receivedOn: "",
  status: "",
  asset: "",
  consumable: "",
};

function TransfersHistory() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [filterData, setFilterData] = useState(initialState);

  const { transfers, getTransfers, receiveTransfer, fetchingTransfers } =
    useTransferStore();

  useOutsideClick(() => setOpenDropdownId(null));
  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    getTransfers();
  }, [getTransfers]);

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const filteredData = useMemo(() => {
    let data = transfers
      .map((item) => ({
        ...item,
        movedOn: format(new Date(item.createdAt), "yyyy-MM-dd"),
        receivedOn: item.receivedBy
          ? format(new Date(item.updatedAt), "yyyy-MM-dd")
          : "",
      }))
      .filter((item) => {
        return Object.entries(filterData).every(([key, value]) => {
          if (!value.trim()) return true;

          const val = value.trim().toLowerCase();

          switch (key) {
            case "asset":
              return item.assets?.some(
                (a) =>
                  a.category.toLowerCase().includes(val) ||
                  a.serialNo.toLowerCase().includes(val)
              );

            case "consumable":
              return item.consumables?.some((c) =>
                c.category.toLowerCase().includes(val)
              );

            case "movedOn":
            case "receivedOn":
              return item[key]?.includes(val);

            default:
              return item[key]?.toLowerCase().includes(val);
          }
        });
      });

    return data;
  }, [filterData, transfers]);

  useEffect(() => {
    setMsg(filteredData.length ? "" : "No records found");
  }, [filteredData]);

  const pageData = filteredData.slice((page - 1) * rows, page * rows);
  const totalPages = Math.ceil(filteredData.length / rows);

  const handleReceive = async (transfer) => {
    await receiveTransfer(transfer.transitId, transfer.id);
    setSelectedTransfer(transfer);
    setOpenDropdownId(null);
  };

  if (fetchingTransfers) return <LoadRecords />;

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <h2 className="text-2xl font-bold">Transfers List</h2>

      {/* Transfers Table */}
      <div className="overflow-auto">
        <table className="max-w-screen text-sm border-collapse table-fixed">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[4%] border px-3 py-2 text-center">#</th>
              <th className="w-[30.5%] border px-3 py-2">Serial Numbers</th>
              <th className="w-[27.5%] border px-3 py-2">
                <div className="flex justify-between px-1">
                  <span>Consumables</span>
                  <span>Qty</span>
                </div>
              </th>
              <th className="w-[12.5%] border px-3 py-2">Transferred On</th>
              <th className="w-[12.5%] border px-3 py-2">Received On</th>
              <th className="w-[5%] border px-3 py-2">Details</th>
              <th className="w-[6%] border px-3 py-2">Status</th>
              <th className="w-fit bg-white" />
            </tr>
            <tr className="bg-white h-fit">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.asset}
                  onChange={(e) =>
                    setFilterData({ ...filterData, asset: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.consumable}
                  onChange={(e) =>
                    setFilterData({ ...filterData, consumable: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.movedOn}
                  onChange={(e) =>
                    setFilterData({ ...filterData, movedOn: e.target.value })
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                  value={filterData.receivedOn}
                  onChange={(e) =>
                    setFilterData({ ...filterData, receivedOn: e.target.value })
                  }
                />
              </td>
              <td className="border p-2" />
              <td className="border p-2">
                <select
                  className="w-full min-w-fit border p-1 rounded"
                  value={filterData.status}
                  onChange={(e) =>
                    setFilterData({ ...filterData, status: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="in-transit">InTransit</option>
                  <option value="transferred">Transferred</option>
                </select>
              </td>
              <td className="p-2" />
            </tr>
          </thead>
          <tbody>
            {pageData.map((transfer, index) => (
              <tr
                key={transfer.id}
                className={`h-12 ${
                  transfer.id % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="border px-3 py-2 text-center">
                  {(page - 1) * rows + index + 1}
                </td>
                <td className="border px-3 py-2">
                  <div className="overflow-visible rounded divide-y">
                    {transfer.assets?.map((asset, i) => (
                      <div key={i} className="flex divide-x">
                        <span className="w-1/2 py-1 break-words">
                          {asset.category}
                        </span>
                        <span className="w-1/2 py-1 text-center break-words">
                          {asset.serialNo}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="border px-3 py-2">
                  <div className="overflow-visible rounded divide-y">
                    {transfer.consumables.map((consumable, i) => (
                      <div key={i} className="flex divide-x">
                        <span className="w-9/10 py-1 pr-2 break-words">
                          {consumable.category}
                        </span>
                        <span className="w-1/10 py-1 text-center mx-3">
                          {consumable.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="border px-3 py-2">
                  {format(new Date(transfer?.createdAt), "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  {transfer.receivedBy &&
                    format(new Date(transfer?.updatedAt), "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2 text-center">
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => {
                      setSelectedTransfer(transfer);
                      setShow(true);
                    }}
                  >
                    <Eye size={20} className="inline-block pb-0.5 mr-1.5" />
                  </span>
                </td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded-lg whitespace-nowrap ${
                      statusColors[transfer.status]
                    }`}
                  >
                    {transfer.status}
                  </span>
                </td>
                {transfer.status === "in-transit" && (
                  <td className="relative px-3 py-2 text-center bg-white">
                    <button
                      onClick={() => toggleDropdown(transfer.id)}
                      className="hover:text-black cursor-pointer"
                      data-dropdown-trigger
                    >
                      <EllipsisVertical strokeWidth={2.5} size={20} />
                    </button>

                    {openDropdownId === transfer.id && (
                      <div
                        className="absolute bottom-1.5 right-8 mt-1 w-28 bg-white border rounded shadow-lg z-20"
                        data-dropdown
                      >
                        <button
                          className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                          onClick={() => handleReceive(transfer)}
                        >
                          Receive
                        </button>
                      </div>
                    )}
                  </td>
                )}
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
            "Transferred By": selectedTransfer.sender?.name,
            "Received By": selectedTransfer?.receiver?.name || "",
          }}
        />
      )}
    </div>
  );
}

export default TransfersHistory;

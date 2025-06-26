import { useState } from "react";
import { useEffect } from "react";
import { PageFooter } from "../../../components";
import { format } from "date-fns";
import { statusColors } from "../../../lib/constants";

const transfers = [
  {
    assets: [
      { id: "A1", category: "laptop", serialNo: "DL55200123" },
      { id: "A2", category: "monitor", serialNo: "FR34RW75" },
    ],
    consumables: [{ category: "keyboards", qty: 2 }],
    id: 1,
    transitId: 6,
    transferredBy: "Sajan",
    receivedBy: null,
    status: "in-transit",
    createdAt: "2025-06-07",
    updatedAt: "2025-06-07",
    deletedAt: null,
  },
  {
    assets: [
      { id: "A3", category: "cpu", serialNo: "MK221134" },
      { id: "A4", category: "monitor", serialNo: "TY772340" },
    ],
    consumables: [{ category: "mouses", qty: 5 }],
    id: 2,
    transitId: 7,
    transferredBy: "Rajiv",
    receivedBy: "Nidhi",
    status: "transferred",
    createdAt: "2025-06-06",
    updatedAt: "2025-06-08",
    deletedAt: null,
  },
  {
    assets: [
      { id: "A5", category: "laptop", serialNo: "XX123443" },
      { id: "A6", category: "router", serialNo: "YY001122" },
      { id: "A7", category: "switch", serialNo: "ZZ998877" },
    ],
    consumables: [],
    id: 3,
    transitId: 8,
    transferredBy: "meena",
    receivedBy: null,
    status: "in-transit",
    createdAt: "2025-06-10",
    updatedAt: "2025-06-10",
    deletedAt: null,
  },
  {
    assets: [],
    consumables: [
      { category: "hdmi-cables", qty: 12 },
      { category: "usb-c-hubs", qty: 4 },
    ],
    id: 4,
    transitId: 9,
    transferredBy: "ajay",
    receivedBy: "priya",
    status: "transferred",
    createdAt: "2025-06-05",
    updatedAt: "2025-06-06",
    deletedAt: null,
  },
  {
    assets: [
      { id: "A8", category: "desktop", serialNo: "AA111122" },
      { id: "A9", category: "monitor", serialNo: "BB332211" },
    ],
    consumables: [],
    id: 5,
    transitId: 10,
    transferredBy: "varun",
    receivedBy: null,
    status: "in-transit",
    createdAt: "2025-06-11",
    updatedAt: "2025-06-11",
    deletedAt: null,
  },
  {
    assets: [
      { id: "A10", category: "access-point", serialNo: "AB121212" },
      { id: "A11", category: "firewall", serialNo: "BC343434" },
    ],
    consumables: [{ category: "ethernet-cables", qty: 10 }],
    id: 6,
    transitId: 11,
    transferredBy: "neha",
    receivedBy: "amit",
    status: "transferred",
    createdAt: "2025-06-09",
    updatedAt: "2025-06-10",
    deletedAt: null,
  },
  {
    assets: [
      { id: "A12", category: "desktop", serialNo: "KL908877" },
      { id: "A13", category: "laptop", serialNo: "MN675849" },
    ],
    consumables: [{ category: "ssd-drives", qty: 3 }],
    id: 7,
    transitId: 12,
    transferredBy: "sahil",
    receivedBy: null,
    status: "in-transit",
    createdAt: "2025-06-12",
    updatedAt: "2025-06-12",
    deletedAt: null,
  },
  {
    assets: [],
    consumables: [{ category: "adapters", qty: 7 }],
    id: 8,
    transitId: 13,
    transferredBy: "komal",
    receivedBy: "deepak",
    status: "transferred",
    createdAt: "2025-06-04",
    updatedAt: "2025-06-06",
    deletedAt: null,
  },
  {
    assets: [{ id: "A14", category: "printer", serialNo: "UX001234" }],
    consumables: [],
    id: 9,
    transitId: 14,
    transferredBy: "Anita",
    receivedBy: "Kiran",
    status: "transferred",
    createdAt: "2025-06-01",
    updatedAt: "2025-06-02",
    deletedAt: null,
  },
];

const initialState = {
  movedBy: "",
  movedOn: "",
  receivedBy: "",
  receivedOn: "",
  status: "",
  asset: "",
  consumable: "",
};

function TransfersHistory() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [msg, setMsg] = useState("");
  const [filterData, setFilterData] = useState(initialState);

  useEffect(() => {
    setPage(1);
  }, [filterData, rows]);

  const pageData = transfers;
  const totalPages = Math.ceil(transfers.length / rows);

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Header */}
      <h2 className="text-2xl font-bold">Transfers List</h2>

      {/* Transfers Table */}
      <div className="overflow-auto">
        <table className="max-w-screen lg:w-full border border-gray-300 rounded-lg text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="w-[4%] border px-3 py-2 text-center">#</th>
              <th className="w-[20%] border px-3 py-2">Serial Numbers</th>
              <th className="w-[20%] border px-3 py-2">
                <div className="flex justify-between px-1">
                  <span>Consumables</span>
                  <span>Qty</span>
                </div>
              </th>
              <th className="w-[12.5%] border px-3 py-2">Moved By</th>
              <th className="w-[12.5%] border px-3 py-2">Moved On</th>
              <th className="w-[12.5%] border px-3 py-2">Received By</th>
              <th className="w-[12.5%] border px-3 py-2">Received On</th>
              <th className="w-[6%] border px-3 py-2">Status</th>
            </tr>
            <tr className="bg-white h-fit">
              <td className="border p-2" />
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="input"
                  placeholder="Filter..."
                  className="w-full border p-1 rounded"
                />
              </td>
            </tr>
          </thead>
          <tbody>
            {pageData.map((transfer, index) => (
              <tr key={transfer.id} className="h-12 border-t hover:bg-gray-50">
                <td className="border px-3 py-2">
                  {(page - 1) * rows + index + 1}
                </td>
                <td className="border px-3 py-2">
                  <div className="overflow-visible rounded divide-y">
                    {transfer.assets?.map((asset, i) => (
                      <div key={i} className="flex divide-x">
                        <span className="w-1/2 py-1">{asset.category}</span>
                        <span className="w-1/2 py-1 text-right">
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
                        <span className="w-9/10 py-1 pr-2">
                          {consumable.category}
                        </span>
                        <span className="w-1/10 py-1 text-center mx-3">
                          {consumable.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="border px-3 py-2">{transfer.transferredBy}</td>
                <td className="border px-3 py-2">
                  {format(transfer?.createdAt, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">{transfer.receivedBy}</td>
                <td className="border px-3 py-2">
                  {transfer.receivedBy &&
                    format(transfer?.updatedAt, "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      statusColors[transfer.status]
                    }`}
                  >
                    {transfer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {msg && <div className="text-center mt-4 text-red-500">{msg}</div>}

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
    </div>
  );
}

export default TransfersHistory;

import { Eye, Pencil } from "lucide-react";
import { statusColors } from "../../../lib/constants.js";
import { format } from "date-fns";

const assetIssuances = [
  {
    id: 2,
    requestId: 9,
    assetId: 5,
    equipNo: "9080007458",
    issuedBy: 1,
    issuedTo: 1,
    handledBy: null,
    info: null,
    status: "issued",
    createdAt: "2025-05-22T06:47:43.218Z",
    updatedAt: "2025-05-22T06:47:43.218Z",
    deletedAt: null,
    issuer: {
      name: "System Admin",
      role: "admin",
      storeManaging: 0,
    },
    recipient: {
      name: "System Admin",
      role: "admin",
      storeManaging: 0,
    },
    asset: {
      serialNo: "HVWVDV2",
    },
    request: {
      category: "Laptop",
    },
    handler: null,
  },
];

function IssuedAssets() {
  return (
    <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">#</th>
          <th className="p-3">Category</th>
          <th className="p-3">Serial No</th>
          <th className="p-3">Equipment No</th>
          <th className="p-3">Issued To</th>
          <th className="p-3">Issued By</th>
          <th className="p-3">Issued On</th>
          <th className="p-3">Status</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {assetIssuances.map((item, index) => (
          <tr key={item.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{item.request.category}</td>
            <td className="p-3">{item.asset.serialNo}</td>
            <td className="p-3">{item.equipNo}</td>
            <td className="p-3">{item.recipient.name}</td>
            <td className="p-3">{item.issuer.name}</td>
            <td className="p-3">{format(item.createdAt, "dd/MM/yyyy")}</td>
            <td className="p-3">
              <span
                className={`px-2 py-1 rounded-lg ${statusColors[item.status]}`}
              >
                {item.status}
              </span>
            </td>
            <td className="px-3 py-2 text-center">
              <div className="space-x-3">
                <button
                  onClick={() => navigate(`/assets/${item.id}`)}
                  className="text-gray-600 hover:text-black"
                >
                  <Eye size={20} />
                </button>
                <button className="text-gray-600 hover:text-black">
                  <Pencil size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default IssuedAssets;

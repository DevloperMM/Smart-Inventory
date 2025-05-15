import React from "react";
import { statusColors } from "../lib/constants";
import { Eye, Pencil } from "lucide-react";

const disposedAssets = [
  {
    id: 1,
    category: "Laptop",
    equipNo: "DL123456",
    raisedBy: "John Doe",
    raisedOn: "2025-04-10",
    // approvedBy: "Bob Smith",
    // approvedOn: "2025-04-29",
    status: "Pending",
    reason: "The asset has completed its life as per the company's norms",
  },
  {
    id: 1,
    category: "Monitor",
    equipNo: "MN454R23",
    raisedBy: "Kesh Pandey",
    raisedOn: "2025-03-07",
    approvedBy: "Bob Smith",
    approvedOn: "2025-04-29",
    status: "Sold",
    reason: "The asset has completed its life as per the company's norms",
  },
];

function DisposedAssets() {
  return (
    <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="border p-3">#</th>
          <th className="p-3">Category</th>
          <th className="p-3">Equipment No</th>
          <th className="p-3">Raised By</th>
          <th className="p-3">Raised On</th>
          <th className="p-3">Approved By</th>
          <th className="p-3">Approved On</th>
          <th className="p-3 text-center">View</th>
          <th className="p-3">Status</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {disposedAssets.map((item, index) => (
          <tr key={item.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{item.category}</td>
            <td className="p-3">{item.equipNo}</td>
            <td className="p-3">{item.raisedBy}</td>
            <td className="p-3">{item.raisedOn}</td>
            <td className="p-3">{item.approvedBy || "-"}</td>
            <td className="p-3">{item.approvedOn || "-"}</td>
            <td className="p-3">
              <button
                onClick={() => navigate(`/assets/${item.id}`)}
                className="text-gray-600 hover:text-black text-center"
              >
                <Eye size={20} />
              </button>
            </td>
            <td className="p-3">
              <span
                className={`px-2 py-1 rounded-lg ${statusColors[item.status]}`}
              >
                {item.status}
              </span>
            </td>
            <td className="p-3">
              <button className="text-gray-600 hover:text-black">
                Sell Out
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DisposedAssets;

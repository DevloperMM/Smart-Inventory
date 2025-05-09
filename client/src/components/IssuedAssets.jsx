import React from "react";
import { Eye } from "lucide-react";

const assets = [
  {
    id: 1,
    requestId: "REQ-47896",
    equipNo: "EQ-001",
    issuedTo: "John Doe",
    issuedBy: "Admin A",
    issuedOn: "2024-12-01",
    returnedOn: "2025-01-15",
    status: "Returned",
  },
  {
    id: 2,
    requestId: "REQ-78123",
    equipNo: "EQ-002",
    issuedTo: "Jane Smith",
    issuedBy: "Admin B",
    issuedOn: "2025-03-20",
    status: "Issued",
  },
];

function IssuedAssets() {
  return (
    <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">#</th>
          <th className="p-3">Request ID</th>
          <th className="p-3">Equipment No</th>
          <th className="p-3">Issued To</th>
          <th className="p-3">Issued By</th>
          <th className="p-3">Issued On</th>
          <th className="p-3">Returned On</th>
          <th className="p-3">Status</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((item, index) => (
          <tr key={item.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{item.requestId}</td>
            <td className="p-3">{item.equipNo}</td>
            <td className="p-3">{item.issuedTo}</td>
            <td className="p-3">{item.issuedBy}</td>
            <td className="p-3">{item.issuedOn}</td>
            <td className="p-3">{item.returnedOn || "-"}</td>
            <td className="p-3">{item.status}</td>
            <td className="p-3">
              <button className="text-blue-600 hover:underline flex items-center gap-1">
                <Eye size={16} />
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default IssuedAssets;

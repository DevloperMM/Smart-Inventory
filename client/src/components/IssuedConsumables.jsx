import { Eye } from "lucide-react";
import React from "react";

const consumables = [
  {
    id: 1,
    consumableName: "HDMI Cable",
    issuedTo: "Mark Lee",
    issuedBy: "Admin A",
    issuedOn: "2025-02-10",
    status: "Consumed",
  },
  {
    id: 2,
    consumableName: "Ethernet Cable",
    issuedTo: "Anna Roy",
    issuedBy: "Admin C",
    issuedOn: "2025-03-18",
    status: "Integrated",
  },
];

function IssuedConsumables() {
  return (
    <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Item</th>
          <th className="p-3">Issued To</th>
          <th className="p-3">Issued By</th>
          <th className="p-3">Issued On</th>
          <th className="p-3">Status</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {consumables.map((item) => (
          <tr key={item.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{item.consumableName}</td>
            <td className="p-3">{item.issuedTo}</td>
            <td className="p-3">{item.issuedBy}</td>
            <td className="p-3">{item.issuedOn}</td>
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

export default IssuedConsumables;

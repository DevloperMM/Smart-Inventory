import React from "react";

const mockDisposedConsumables = [
  {
    id: 1,
    name: "Printer Cartridge",
    quantity: 5,
    disposalDate: "2025-04-01",
    reason: "Expired",
    disposedBy: "Michael Scott",
  },
  {
    id: 2,
    name: "Ethernet Cables",
    quantity: 20,
    disposalDate: "2025-03-15",
    reason: "Damaged",
    disposedBy: "Pam Beesly",
  },
];

function DisposedConsumables() {
  return (
    <div className="mt-4">
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border-b">Item Name</th>
            <th className="p-2 border-b">Quantity</th>
            <th className="p-2 border-b">Disposal Date</th>
            <th className="p-2 border-b">Reason</th>
            <th className="p-2 border-b">Disposed By</th>
          </tr>
        </thead>
        <tbody>
          {mockDisposedConsumables.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-2 border-b">{item.name}</td>
              <td className="p-2 border-b">{item.quantity}</td>
              <td className="p-2 border-b">{item.disposalDate}</td>
              <td className="p-2 border-b">{item.reason}</td>
              <td className="p-2 border-b">{item.disposedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisposedConsumables;

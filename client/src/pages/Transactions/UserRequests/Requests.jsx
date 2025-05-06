import React from "react";

function Requests() {
  const requestData = [
    {
      id: 1,
      itemName: "Dell Laptop",
      quantity: 2,
      requestedBy: "John Doe",
      status: "Pending",
      requestedAt: "2025-05-01T10:00:00Z",
    },
    {
      id: 2,
      itemName: "Monitor",
      quantity: 1,
      requestedBy: "Jane Smith",
      status: "Approved",
      requestedAt: "2025-05-02T14:30:00Z",
    },
    {
      id: 3,
      itemName: "Mouse",
      quantity: 10,
      requestedBy: "Larry Page",
      status: "Cancelled",
      requestedAt: "2025-05-01T10:10:00Z",
    },
    {
      id: 4,
      itemName: "Hard disk",
      quantity: 8,
      requestedBy: "Sundar Pichai",
      status: "Rejected",
      requestedAt: "2025-05-01T10:55:00Z",
    },
  ];

  return (
    <div className="p-4 h-full w-full">
      <h1 className="text-2xl font-semibold mb-4 text-center">Request List</h1>

      {/* This wrapper forces horizontal scroll */}
      <div className="w-full overflow-x-auto">
        <table className="table-auto min-w-[1200px] w-max bg-white shadow-md rounded-lg border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-3 whitespace-nowrap">#</th>
              <th className="p-3 whitespace-nowrap">Item Name</th>
              <th className="p-3 whitespace-nowrap">Quantity</th>
              <th className="p-3 whitespace-nowrap">Requested By</th>
              <th className="p-3 whitespace-nowrap">Status</th>
              <th className="p-3 whitespace-nowrap">Requested At</th>
              <th className="p-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestData.map((request, index) => (
              <tr key={request.id} className="border-t hover:bg-gray-50">
                <td className="p-3 whitespace-nowrap">{index + 1}</td>
                <td className="p-3 whitespace-nowrap">{request.itemName}</td>
                <td className="p-3 whitespace-nowrap">{request.quantity}</td>
                <td className="p-3 whitespace-nowrap">{request.requestedBy}</td>
                <td className="p-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      request.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : request.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : request.status === "Cancelled"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="p-3 whitespace-nowrap">
                  {new Date(request.requestedAt).toLocaleDateString()}
                </td>
                <td className="p-3 whitespace-nowrap space-x-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Requests;

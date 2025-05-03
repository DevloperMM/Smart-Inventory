import { useState } from "react";

function IssueRecords() {
  const [activeTab, setActiveTab] = useState("assets");

  const assetData = [
    { id: 1, name: "Laptop", serial: "A123", status: "Assigned" },
    { id: 2, name: "Monitor", serial: "B456", status: "Available" },
  ];

  const consumableData = [
    { id: 1, name: "HDMI Cable", quantity: 15 },
    { id: 2, name: "Mouse Pad", quantity: 50 },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("assets")}
          className={`px-4 py-2 rounded-xl font-medium transition ${
            activeTab === "assets" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Assets
        </button>
        <button
          onClick={() => setActiveTab("consumables")}
          className={`px-4 py-2 rounded-xl font-medium transition ${
            activeTab === "consumables"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Consumables
        </button>
      </div>

      <hr className="border-t border-gray-400 mb-4" />

      {activeTab === "assets" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Serial</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {assetData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.id}</td>
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">{item.serial}</td>
                  <td className="p-3 border">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "consumables" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {consumableData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.id}</td>
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default IssueRecords;

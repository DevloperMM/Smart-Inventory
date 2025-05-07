import React from "react";

function AssetInfo() {
  const fields = {
    description: "Description",
    category: "Category",
    mfgBy: "Manufactured By",
    modelNo: "Model Number",
    serialNo: "Serial Number",
    materialCode: "Material Code",
    pr: "Purchase Request",
    po: "Purchase Order",
    grn: "Gate Reference Number",
    srr: "Store Reference Receipt",
    stockedOn: "Stocked On",
    stockedBy: "Stocked By",
    startDate: "Warranty Start Date",
    endDate: "Warranty End Date",
    amcVendor: "AMC Vendor",
    storeId: "Store",
    addInfo: "Additional Info",
    status: "Status",
  };

  const asset = {
    id: 1,
    category: "Laptop",
    mfgBy: "Dell",
    modelNo: "Latitude 5520",
    description: "Business laptop with Intel Core i7, 16GB RAM, 512GB SSD",
    serialNo: "DL5520-SN00123",
    materialCode: "MAT-9981",
    pr: "PR-2025-0098",
    po: "PO-2025-3345",
    grn: "GRN-2025-1122",
    srr: "SRR-2025-7788",
    stockedOn: new Date("2025-03-15T10:00:00Z"),
    stockedBy: "Aman Kukreja",
    startDate: new Date("2025-03-15T00:00:00Z"),
    endDate: new Date("2028-03-15T00:00:00Z"),
    amcVendor: "TechCare Services Pvt Ltd",
    storeId: "HRD",
    addInfo: "Includes docking station and USB-C hub",
    status: "Available",
  };

  const formatValue = (field, value) => {
    if (value instanceof Date) {
      return new Date(value).toLocaleDateString();
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    let color;
    if (field === "status") {
      if (value === "Available") color = "text-green-600 ";
      else if (value === "Disposed") color = "text-yellow-600";
      else if (value === "Sold") color = "text-red-600";
      else color = "text-blue-600";

      return (
        <span className={`rounded-xl font-semibold ${color}`}>{value}</span>
      );
    }

    return value || "—";
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold italic">Asset Details</h2>
        <div className="space-x-4">
          <button
            disabled={asset.status !== "Available"}
            className="p-2 rounded-lg text-sm text-gray-700 bg-amber-300 disabled:bg-gray-200"
          >
            {asset.status !== "AMC" ? (
              <span>Flag Maintenance</span>
            ) : (
              <span>Unflag Maintenance</span>
            )}
          </button>
          <button
            disabled={asset.status !== "Available"}
            className="p-2 rounded-lg bg-green-600 text-sm text-gray-50 disabled:bg-gray-200 disabled:text-gray-700"
          >
            {asset.status !== "Disposed" ? (
              <span>Create Dispose</span>
            ) : (
              <span>Sell Out</span>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Asset Details */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm p-5 border self-start">
          <table className="w-full text-sm text-left text-gray-700 table-fixed">
            <tbody>
              {Object.keys(fields).map((field) => (
                <tr key={field} className="align-top">
                  <th className="w-1/3 pr-4 font-semibold text-gray-600 py-2 border-r border-gray-300">
                    {fields[field]}
                  </th>
                  <td className="w-2/3 py-2 pl-4 whitespace-normal break-words">
                    {formatValue(field, asset[field])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side: Timeline */}
        <div className="w-full lg:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Timeline</h3>
          <div className="relative border-l-2 border-gray-300 pl-6 space-y-8">
            {/* Issued */}
            <div className="relative ml-2">
              <span className="absolute -left-5 top-1.5 size-2 bg-gray-500 rounded-full"></span>
              <p className="text-sm text-gray-800">Issued</p>
              <p className="text-sm text-gray-600">Issued By: John Doe</p>
              <p className="text-sm text-gray-600">Issued To: Jane Smith</p>
              <p className="text-xs text-gray-500">Apr 1, 2025</p>
            </div>

            {/* Returned */}
            <div className="relative ml-2">
              <span className="absolute -left-5 top-1.5 size-2 bg-gray-500 rounded-full"></span>
              <p className="text-sm font-medium text-gray-800">Returned</p>
              <p className="text-sm text-gray-600">Returned By: Jane Smith</p>
              <p className="text-xs text-gray-500">Apr 28, 2025</p>
            </div>

            {/* Transferred */}
            <div className="relative ml-2">
              <span className="absolute -left-5 top-1.5 size-2 bg-gray-500 rounded-full"></span>
              <p className="text-sm font-medium text-gray-800">Transferred</p>
              <p className="text-sm text-gray-600">Transferred By: Bob World</p>
              <p className="text-xs text-gray-500">Apr 28, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetInfo;

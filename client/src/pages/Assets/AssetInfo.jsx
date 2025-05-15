import React from "react";
import { statusColors } from "../../lib/constants.js";
import { format } from "date-fns";

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

const issuances = [
  {
    issuedBy: "Sunil Kumar",
    issuedTo: "Neha Sharma",
    issuedOn: "2025-05-10",
    status: "Exempted",
    exemptedOn: "2025-05-13",
    exemptedBy: "Sunil Kumar",
  },
  {
    issuedBy: "Rahul Mehra",
    issuedTo: "Sita Verma",
    issuedOn: "2025-03-18",
    status: "Returned",
    returnedTo: "Rahul Mehra",
    returnedOn: "2025-04-01",
  },
  {
    issuedBy: "Priya Patel",
    issuedTo: "Rohan Joshi",
    issuedOn: "2025-02-14",
    status: "Returned",
    returnedTo: "Priya Patel",
    returnedOn: "2025-03-10",
  },
];

function AssetInfo() {
  issuances.sort((a, b) => new Date(a.issuedOn) - new Date(b.issuedOn));

  const formatValue = (field, value) => {
    if (value instanceof Date) {
      return format(value, "dd-MM-yyyy");
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    return (
      <>
        {field === "status" ? (
          <span
            className={`px-2 py-1 rounded-lg font-semibold ${statusColors[value]}`}
          >
            {value}
          </span>
        ) : (
          value || "—"
        )}
      </>
    );
  };

  const handleClick = (e) => {
    console.log(e.target.innerText);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold italic">Asset Details</h2>
        <div className="space-x-4">
          {asset.status !== "Sold" && (
            <>
              <button
                disabled={["Issued", "InTransit", "Disposed"].includes(
                  asset.status
                )}
                onClick={handleClick}
                className="p-2 rounded-lg text-sm text-black bg-amber-300 disabled:bg-gray-200 cursor-pointer hover:bg-yellow-400"
              >
                {asset.status !== "AMC" ? (
                  <span>Flag Maintenance</span>
                ) : (
                  <span>Unflag Maintenance</span>
                )}
              </button>
              <button
                onClick={handleClick}
                disabled={["Issued", "AMC", "InTransit"].includes(asset.status)}
                className="p-2 rounded-lg bg-emerald-500 text-sm text-white disabled:bg-gray-200 disabled:text-gray-700 cursor-pointer hover:bg-green-500"
              >
                {asset.status !== "Disposed" ? (
                  <span>Create Dispose</span>
                ) : (
                  <span>Sold Out</span>
                )}
              </button>
            </>
          )}
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
        <div className="w-full lg:w-1/3 lg:mt-6">
          <div className="relative border-l-2 border-gray-300 pl-6 space-y-6">
            {issuances.map((issue, index) => (
              <React.Fragment key={index}>
                {/* Show Issuance details */}
                <div className="relative ml-2">
                  <span className="absolute -left-5 top-2.5 size-2 bg-gray-500 rounded-full"></span>
                  <div className="flex justify-between">
                    <p
                      className={`text-sm font-medium p-1 rounded-lg ${statusColors["Issued"]}`}
                    >
                      Issued
                    </p>
                    <span className="text-sm text-black">
                      {format(issue.issuedOn, "dd-MM-yyyy")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Issued By: {issue.issuedBy}
                  </p>
                  <p className="text-sm text-gray-600">
                    Issued To: {issue.issuedTo}
                  </p>
                </div>

                {/* Show Return or Exempt details */}
                {issue.status !== "Issued" && (
                  <div className="relative ml-2">
                    <span className="absolute -left-5 top-2.5 size-2 bg-gray-500 rounded-full"></span>
                    <div className="flex justify-between">
                      <p
                        className={`text-sm font-medium p-1 rounded-lg ${
                          statusColors[issue.status]
                        }`}
                      >
                        {issue.status}
                      </p>
                      <span className="text-sm text-black">
                        {format(
                          issue?.returnedOn || issue.exemptedOn,
                          "dd-MM-yyyy"
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {issue.status === "Returned" ? (
                        <span>Returned To: {issue.returnedTo}</span>
                      ) : (
                        <span>Exempted By: {issue.exemptedBy}</span>
                      )}
                    </p>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetInfo;

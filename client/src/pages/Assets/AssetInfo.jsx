import React, { useEffect } from "react";
import { statusColors } from "../../lib/constants.js";
import { format, isValid, parseISO } from "date-fns";
import { useParams } from "react-router-dom";
import { useAssetStore } from "../../store/useAssetStore.js";
import { LoadRecords } from "../../components";

const fields = {
  status: "Status",
  description: "Description",
  category: "Category",
  mfgBy: "Manufactured By",
  modelNo: "Model Number",
  serialNo: "Serial Number",
  equipNo: "Equipment Number",
  pr: "Purchase Request",
  po: "Purchase Order",
  grn: "Gate Reference Number",
  srr: "Store Reference Receipt",
  createdAt: "Stocked On",
  storeKeeper: "Stocked By",
  startDate: "Warranty Start Date",
  endDate: "Warranty End Date",
  inWarranty: "In Warranty",
  amcVendor: "AMC Vendor",
  storeId: "Store",
  addInfo: "Additional Info",
};

function AssetInfo() {
  const { id } = useParams();
  const {
    asset,
    getAssetById,
    isFetchingAsset,
    toggleAMC,
    assetIssuances,
    fetchingIssuances,
    getIssuancesById,
  } = useAssetStore();

  useEffect(() => {
    getAssetById(id);
  }, [id, getAssetById]);

  useEffect(() => {
    getIssuancesById(id);
  }, [id, getIssuancesById]);

  assetIssuances.sort((a, b) => new Date(a.issuedOn) - new Date(b.issuedOn));

  const formatValue = (field, value) => {
    let formattedValue = value;

    const parsedDate = typeof value === "string" ? parseISO(value) : value;

    if (isValid(parsedDate))
      formattedValue = format(parsedDate, "MMMM d, yyyy");

    if (typeof value === "boolean") formattedValue = value ? "Yes" : "No";
    if (field === "storeKeeper") formattedValue = value?.name;
    if (field === "storeId") formattedValue = value === 1 ? "HRD" : "CRD";
    if (field === "equipNo")
      formattedValue =
        assetIssuances.length > 0 ? assetIssuances[0][field] : "";

    return (
      <>
        {field === "status" ? (
          <span
            className={`px-2 py-1 rounded-lg font-semibold ${statusColors[value]}`}
          >
            {value ? value.toUpperCase() : value}
          </span>
        ) : (
          formattedValue || "—"
        )}
      </>
    );
  };

  const handleClick = (e) => {
    console.log(e.target.innerText);
  };

  if (isFetchingAsset || fetchingIssuances) return <LoadRecords />;

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Asset Details</h2>
        <div className="space-x-4">
          {asset.status !== "sold" && (
            <>
              <button
                disabled={["issued", "in-transit", "disposed"].includes(
                  asset.status
                )}
                onClick={() => toggleAMC(asset.id)}
                className="p-2 rounded-lg text-sm text-black bg-amber-300 disabled:bg-gray-200 disabled:text-gray-700 hover:bg-yellow-400"
              >
                {asset.status !== "amc" ? (
                  <span>Flag AMC</span>
                ) : (
                  <span>Unflag AMC</span>
                )}
              </button>

              <button
                onClick={handleClick}
                disabled={["issued", "amc", "in-transit"].includes(
                  asset.status
                )}
                className="p-2 rounded-lg bg-emerald-500 text-sm text-white disabled:bg-gray-200 disabled:text-gray-700 hover:bg-green-500"
              >
                {asset.status !== "disposed" ? (
                  <span>Create Dispose</span>
                ) : (
                  <span>Sold Out</span>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-between">
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
        {assetIssuances.length > 0 ? (
          <div className="w-full lg:w-1/3 lg:mt-6">
            <div className="relative border-l-2 border-gray-300 pl-6 space-y-6">
              {assetIssuances.map((issue, index) => (
                <React.Fragment key={index}>
                  {/* Show Issuance details */}
                  <div className="relative ml-2">
                    <span className="absolute -left-5 top-2.5 size-2 bg-gray-500 rounded-full"></span>
                    <div className="flex justify-between">
                      <p
                        className={`text-sm font-medium p-1 rounded-lg ${statusColors["issued"]}`}
                      >
                        Issued
                      </p>
                      <span className="text-sm text-black">
                        {issue.createdAt
                          ? format(parseISO(issue.createdAt), "dd-MM-yyyy")
                          : "—"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 ml-1">
                      Issued By: {issue.issuer?.name || "—"}
                    </p>
                    <p className="text-sm text-gray-600 ml-1">
                      Issued To: {issue.recipient?.name || "—"}
                    </p>
                  </div>

                  {/* Show Return or Exempt details */}
                  {issue.status !== "issued" && (
                    <div className="relative ml-2">
                      <span className="absolute -left-5 top-2.5 size-2 bg-gray-500 rounded-full"></span>
                      <div className="flex justify-between">
                        <p
                          className={`text-sm font-medium p-1 rounded-lg ${
                            statusColors[issue.status]
                          }`}
                        >
                          {issue.status.charAt(0).toUpperCase() +
                            issue.status.slice(1)}
                        </p>
                        <span className="text-sm text-black">
                          {issue?.updatedAt
                            ? format(issue.updatedAt, "dd-MM-yyyy")
                            : "—"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 ml-1">
                        {issue.status === "returned" ? (
                          <span>Returned To:</span>
                        ) : (
                          <span>Exempted By:</span>
                        )}{" "}
                        {issue.handler?.name}
                      </p>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-xl shadow-lg max-h-fit shadow-neutral-400 mt-8">
            <div className="text-center rounded-2xl p-8 text-zinc-600 bg-white">
              This asset is not issued yet
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssetInfo;

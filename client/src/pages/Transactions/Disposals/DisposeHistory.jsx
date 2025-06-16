import { useState } from "react";
import DisposedAssets from "./DisposedAssets";
import DisposedConsumables from "./DisposedConsumables";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DisposeHistory() {
  const navigate = useNavigate();
  const [isAssetTab, setIsAssetTab] = useState(true);
  const [navigateTo, setNavigateTo] = useState(
    "/admin/transactions/disposals/asset/new"
  );

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Heading */}
      <h2 className="text-2xl font-bold">Disposals List</h2>

      {/* Tab Switcher */}
      <div className="flex justify-between">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              isAssetTab
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setIsAssetTab(true);
              setNavigateTo("/admin/transactions/disposals/asset/new");
            }}
          >
            Assets
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              !isAssetTab
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setIsAssetTab(false);
              setNavigateTo("/admin/transactions/disposals/consumable/new");
            }}
          >
            Consumables
          </button>
        </div>

        {/* <div className="flex items-center gap-2 mx-auto">
          <label className="text-sm font-medium">From:</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
          <label className="text-sm font-medium">To:</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div> */}

        <button
          onClick={() => navigate(navigateTo)}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" />
          Create Dispose
        </button>
      </div>

      {/* Details */}
      {isAssetTab ? <DisposedAssets /> : <DisposedConsumables />}
    </div>
  );
}

export default DisposeHistory;

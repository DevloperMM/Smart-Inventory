import { useState } from "react";
import { Plus } from "lucide-react";
import { DisposedAssets, DisposedConsumables } from "../../../components";

function DisposeHistory() {
  const [isAssetTab, setIsAssetTab] = useState(true);

  return (
    <div className="p-6 bg-white text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-semibold mb-6 italic">Disposals List</h2>
        <button
          onClick={() => navigate("/requests/new")}
          className="bg-emerald-500 hover:bg-green-500 text-white p-2 rounded-lg cursor-pointer"
        >
          <Plus className="inline-block size-5 mb-1 mr-1" />
          Create Dispose
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-4 mb-2">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            isAssetTab ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setIsAssetTab(true)}
        >
          Assets
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            !isAssetTab ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setIsAssetTab(false)}
        >
          Consumables
        </button>
      </div>

      {isAssetTab ? <DisposedAssets /> : <DisposedConsumables />}
    </div>
  );
}

export default DisposeHistory;

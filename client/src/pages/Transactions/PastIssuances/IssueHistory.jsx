import { useState } from "react";
import { IssuedAssets, IssuedConsumables } from "../../../components";

function IssueHistory() {
  const [isAssetTab, setIsAssetTab] = useState(true);

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      <h2 className="text-2xl font-bold">Issuances List</h2>

      {/* Tab Switcher */}
      <div className="flex gap-4">
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

      {isAssetTab ? <IssuedAssets /> : <IssuedConsumables />}
    </div>
  );
}

export default IssueHistory;

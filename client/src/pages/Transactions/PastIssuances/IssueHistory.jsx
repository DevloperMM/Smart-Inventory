import React, { useState } from "react";
import { IssuedAssets, IssuedConsumables } from "../../../components";

function IssueHistory() {
  const [isAssetTab, setIsAssetTab] = useState(true);

  return (
    <div className="p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-semibold mb-6 italic">Issuances List</h1>

      {/* Tab Switcher */}
      <div className="flex gap-4 mb-6">
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

import { useState } from "react";
import { DisposedAssets, DisposedConsumables } from "../../../components";
import { useNavigate } from "react-router-dom";

function DisposeHistory() {
  const navigate = useNavigate();
  const [isAssetTab, setIsAssetTab] = useState(true);

  return (
    <div className="p-6 bg-white text-gray-800 space-y-5">
      {/* Tab Switcher */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            isAssetTab ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setIsAssetTab(true)}
        >
          Assets
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            !isAssetTab ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setIsAssetTab(false)}
        >
          Consumables
        </button>
      </div>

      {/* Details */}
      {isAssetTab ? <DisposedAssets /> : <DisposedConsumables />}
    </div>
  );
}

export default DisposeHistory;

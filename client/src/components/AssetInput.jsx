import React from "react";

function AssetInput({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-1"
      />
    </div>
  );
}

export default AssetInput;

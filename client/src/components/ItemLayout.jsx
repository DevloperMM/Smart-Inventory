import React from "react";

function ItemLayout() {
  return (
    <div className="w-full mt-10 px-6">
      <h2 className="text-2xl font-semibold mb-6">Asset Details & Timeline</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Asset Details */}
        <div className="w-full md:w-1/2 border rounded-lg p-4 shadow-sm bg-white">
          <h3 className="text-lg font-semibold mb-2">Asset Info</h3>
          <p className="text-sm text-gray-700">Asset Name: Dell Laptop</p>
          <p className="text-sm text-gray-700">Asset ID: ASSET-1234</p>
          <p className="text-sm text-gray-700">Category: Electronics</p>
          <p className="text-sm text-gray-700">Status: Returned</p>
        </div>

        {/* Right Side: Timeline */}
        <div className="w-full md:w-1/2 border-l-2 border-gray-300 pl-10 relative">
          {/* Issued */}
          <div className="relative mb-6">
            <div className="w-3 h-3 bg-blue-600 rounded-full absolute -left-[20px] top-1.5"></div>
            <p className="text-md font-medium">Issued</p>
            <p className="text-sm text-gray-500">Issued By: John Doe</p>
            <p className="text-sm text-gray-500">Issued To: Jane Smith</p>
            <p className="text-sm text-gray-500">Apr 1, 2025</p>
          </div>

          {/* Returned */}
          <div className="relative">
            <div className="w-3 h-3 bg-green-600 rounded-full absolute -left-[20px] top-1.5"></div>
            <p className="text-md font-medium">Returned</p>
            <p className="text-sm text-gray-500">Returned By: Jane Smith</p>
            <p className="text-sm text-gray-500">Apr 28, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemLayout;

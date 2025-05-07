import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sampleAssets = [
  {
    id: 1,
    description: "HP Laptop EliteBook",
    category: "Laptop",
    model: "840 G6",
    serial: "SN12345678",
    inWarranty: true,
    storeId: "Store-01",
    status: "In Use",
  },
  {
    id: 2,
    description: "Cisco Switch",
    category: "Networking",
    model: "CBS350-24",
    serial: "CSW987654",
    inWarranty: false,
    storeId: "Store-03",
    status: "Available",
  },
];

function AssetList() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [filteredAssets, setFilteredAssets] = useState(sampleAssets);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    setAssets(sampleAssets);
  }, []);

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  const paginatedAssets = filteredAssets.slice(startIndex, endIndex);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalRecords / perPage)) {
      setPage(newPage);
    }
  };

  const viewAssetDetails = (assetId) => {
    navigate(`/assets/${assetId}`);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Filters and Search */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search Asset"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setFilteredAssets(
              assets.filter(
                (asset) =>
                  asset.description.toLowerCase().includes(searchTerm) ||
                  asset.serial.toLowerCase().includes(searchTerm) ||
                  asset.model.toLowerCase().includes(searchTerm)
              )
            );
            setPage(1); // Reset to first page after search
          }}
        />
        {/* Add Filter Dropdowns (Category, Status, etc.) */}
        <select className="p-2 border border-gray-300 rounded">
          <option value="">Filter by Category</option>
          <option value="Laptop">Laptop</option>
          <option value="Networking">Networking</option>
          {/* Add more options as needed */}
        </select>
        <select className="p-2 border border-gray-300 rounded">
          <option value="">Filter by Status</option>
          <option value="In Use">In Use</option>
          <option value="Available">Available</option>
          {/* Add more options as needed */}
        </select>
        <button
          onClick={() => navigate("/assets/new")}
          className="bg-amber-300 text-black px-2"
        >
          Add Asset
        </button>
      </div>

      {/* Asset Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b">Description</th>
            <th className="p-2 border-b">Category</th>
            <th className="p-2 border-b">Model #</th>
            <th className="p-2 border-b">Serial #</th>
            <th className="p-2 border-b">In Warranty</th>
            <th className="p-2 border-b">Store ID</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAssets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-50">
              <td className="p-2 border-b">{asset.description}</td>
              <td className="p-2 border-b">{asset.category}</td>
              <td className="p-2 border-b">{asset.model}</td>
              <td className="p-2 border-b">{asset.serial}</td>
              <td className="p-2 border-b text-center">
                {asset.inWarranty ? "✅ Yes" : "❌ No"}
              </td>
              <td className="p-2 border-b">{asset.storeId}</td>
              <td className="p-2 border-b">
                <span
                  className={`px-2 py-1 rounded ${
                    asset.status === "In Use"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {asset.status}
                </span>
              </td>
              <td className="p-2 border-b text-center">
                <button
                  onClick={() => viewAssetDetails(asset.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => changePage(page - 1)}
          className={`p-2 px-4 bg-blue-500 text-white rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => changePage(page + 1)}
          className={`p-2 px-4 bg-blue-500 text-white rounded ${
            page * perPage >= filteredAssets.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={page * perPage >= filteredAssets.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AssetList;

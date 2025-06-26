import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const assetList = [
  {
    id: 1,
    category: "Laptop",
    brand: "Dell",
    serialNumber: "SN123456",
    warranty: true,
    description: "Dell Latitude 5420, 16GB RAM, 512GB SSD",
  },
  {
    id: 2,
    category: "Monitor",
    brand: "LG",
    serialNumber: "SN987654",
    warranty: true,
    description: "LG 24-inch Full HD LED Monitor",
  },
  {
    id: 3,
    category: "Printer",
    brand: "HP",
    serialNumber: "SN543210",
    warranty: false,
    description: "HP LaserJet Pro M404dn",
  },
  {
    id: 4,
    category: "Router",
    brand: "Cisco",
    serialNumber: "SN777888",
    warranty: true,
    description: "Cisco Dual Band Gigabit Router",
  },
  {
    id: 5,
    category: "Desktop",
    brand: "Lenovo",
    serialNumber: "SN112233",
    warranty: false,
    description: "Lenovo ThinkCentre, Core i5 6th Gen, 8GB RAM",
  },
];

const consumableList = [
  {
    id: 101,
    category: "HDMI Cable",
    specs: "2 meters, gold-plated",
    newStock: 50,
    oldStock: 10,
    location: "IT Store",
    isUsed: false,
  },
  {
    id: 102,
    category: "LAN Cable",
    specs: "Cat6, 5 meters",
    newStock: 30,
    oldStock: 5,
    location: "Server Room",
    isUsed: true,
  },
  {
    id: 103,
    category: "USB Drive",
    specs: "32GB, USB 3.0",
    newStock: 20,
    oldStock: 3,
    location: "Admin Store",
    isUsed: false,
  },
  {
    id: 104,
    category: "Mouse Pad",
    specs: "Standard size",
    newStock: 60,
    oldStock: 12,
    location: "Support Desk",
    isUsed: false,
  },
  {
    id: 105,
    category: "AA Batteries",
    specs: "1.5V alkaline, pack of 4",
    newStock: 100,
    oldStock: 25,
    location: "Utility Store",
    isUsed: true,
  },
];

const IssueOptions = () => {
  const isAssetRequest = true;

  const [equipNo, setEquipNo] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState([]);
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    setOptions(isAssetRequest ? assetList : consumableList);
    showOptions && options.length <= 0 ? setMsg(true) : setMsg(false);
  }, [isAssetRequest, isVerified]);

  const handleVerify = () => {
    setMsg(false);
    setSelectedId(null);
    setShowOptions(true);
    setOptions(isAssetRequest ? assetList : consumableList);

    setIsVerified(true);
  };

  const handleUsedChange = (id, isUsed) => {
    setOptions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isUsed } : item))
    );
  };

  const handleProceed = () => {
    if (!selectedId) return toast.error("Select any option to proceed");
    const type = isAssetRequest ? "Asset" : "Consumable";
    console.log(`Submitting ${type}: ${selectedId}`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white text-gray-800 space-y-5 rounded-2xl">
      <h2 className="text-2xl font-semibold">Verify Issuance</h2>

      <div className="bg-white rounded-2xl space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={equipNo}
            onChange={(e) => {
              setMsg(false);
              setIsVerified(false);
              setShowOptions(false);
              setEquipNo(e.target.value);
            }}
            placeholder="Enter equipment number..."
            className="border rounded-xl px-4 py-2 w-1/3"
          />
          <button
            disabled={isVerified}
            onClick={handleVerify}
            className={`text-white px-4 rounded-xl flex items-center gap-2 ${
              isVerified ? "bg-teal-500" : "bg-emerald-500"
            }`}
          >
            {isVerified ? (
              <>
                <CheckCircle size={18} /> <span>Verified</span>{" "}
              </>
            ) : (
              <span>Verify</span>
            )}
          </button>
        </div>
      </div>

      {/* Table Section */}
      {showOptions && options.length > 0 && (
        <div className="overflow-x-auto">
          <>
            {isAssetRequest ? (
              <table className="w-full table-auto text-sm border-collapse">
                <thead className="bg-gray-100 text-gray-700 text-left">
                  <tr>
                    <th className="px-4 py-3 border-t text-center">#</th>
                    <th className="px-4 py-3 border">Category</th>
                    <th className="px-4 py-3 border">Brand</th>
                    <th className="px-4 py-3 border">Serial number</th>
                    <th className="px-4 py-3 border">In warranty</th>
                    <th className="px-4 py-3 border-t">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {options.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-t ${
                        selectedId === item.id ? "bg-blue-50 rounded-2xl" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-center">
                        <input
                          type="radio"
                          name="selected"
                          checked={selectedId === item.id}
                          onChange={() => setSelectedId(item.id)}
                          className="accent-cyan-600"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium border-l border-gray-500">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 border-l border-gray-500">
                        {item.brand}
                      </td>
                      <td className="px-4 py-3 border-l border-gray-500">
                        {item.serialNumber}
                      </td>
                      <td className="px-4 py-3 border-l border-gray-500">
                        {item.warranty ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-3 border-l border-gray-500">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full table-auto text-sm border-collapse">
                <thead className="bg-gray-100 text-gray-700 text-left">
                  <tr>
                    <th className="px-4 py-3 border text-center">#</th>
                    <th className="px-4 py-3 border">Category</th>
                    <th className="px-4 py-3 border">Specifications</th>
                    <th className="px-4 py-3 border">New Stock</th>
                    <th className="px-4 py-3 border">Old Stock</th>
                    <th className="px-4 py-3 border">Used Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {options.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-t ${
                        selectedId === item.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-center">
                        <input
                          type="radio"
                          name="selected"
                          checked={selectedId === item.id}
                          onChange={() => setSelectedId(item.id)}
                          className="accent-cyan-600"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{item.category}</td>
                      <td className="px-4 py-3">{item.specs}</td>
                      <td className="px-4 py-3">{item.newStock}</td>
                      <td className="px-4 py-3">{item.oldStock}</td>
                      <td className="px-4 py-3">
                        <select
                          value={item.isUsed ? "Yes" : "No"}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          onChange={(e) =>
                            handleUsedChange(item.id, e.target.value === "Yes")
                          }
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <hr />
            <div className="block text-right mt-4">
              <button
                onClick={handleProceed}
                className="bg-emerald-500 text-white px-3 py-2.5 rounded-xl hover:bg-emerald-600"
              >
                Proceed
              </button>
            </div>
          </>
        </div>
      )}

      {msg && (
        <p className="text-center py-5 text-red-500">
          No records available for this equipment
        </p>
      )}
    </div>
  );
};

export default IssueOptions;
